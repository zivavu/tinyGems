import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { searchSoundcloudArtist } from './getArtistData/soundcloudArtistData';
import { searchSpotifyArtist } from './getArtistData/spotifyArtistData';
import { searchTidalArtist } from './getArtistData/tidalArtistData';
import { searchYoutubeArtist } from './getArtistData/youtubeArtistData';
import { CrossPlatformSearchResponse } from './types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY!);

const matchingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    matches: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ['name', 'platformMatches'],
        properties: {
          name: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          platformMatches: {
            type: SchemaType.ARRAY,
            minItems: 4,
            items: {
              type: SchemaType.OBJECT,
              required: ['platform', 'matches'],
              properties: {
                platform: {
                  type: SchemaType.STRING,
                  enum: ['spotify', 'soundcloud', 'youtube', 'tidal'],
                },
                matches: {
                  type: SchemaType.ARRAY,
                  minItems: 1,
                  maxItems: 6,
                  items: {
                    type: SchemaType.OBJECT,
                    required: ['platformId', 'confidence', 'name'],
                    properties: {
                      platformId: { type: SchemaType.STRING },
                      name: { type: SchemaType.STRING },
                      thumbnailImageUrl: { type: SchemaType.STRING },
                      confidence: {
                        type: SchemaType.NUMBER,
                        minimum: 0,
                        maximum: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export async function findArtistAcrossPlatforms(artistName: string) {
  const [spotify, soundcloud, youtube, tidal] = await Promise.all([
    searchSpotifyArtist(artistName).catch(() => []),
    searchSoundcloudArtist(artistName).catch(() => []),
    searchYoutubeArtist(artistName).catch(() => []),
    searchTidalArtist(artistName).catch(() => []),
  ]);

  const searchResults = {
    spotify,
    soundcloud,
    youtube,
    tidal,
  };

  if (Object.values(searchResults).every((results) => Array.isArray(results) && !results?.length)) {
    throw new Error('No artists found on any platform');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: matchingSchema,
    },
  });

  const prompt = `
    Analyze these search results for an artist named "${artistName}" from different music platforms
    and find best matching artists across all platforms.


    ///////////////////
    SPOTIFY RESULTS:
    ${JSON.stringify(searchResults.spotify)}

    ///////////////////
    SOUNDCLOUD RESULTS:
    ${JSON.stringify(searchResults.soundcloud)}

    ///////////////////
    YOUTUBE RESULTS:
    ${JSON.stringify(searchResults.youtube)}

    ///////////////////
    TIDAL RESULTS:
    ${JSON.stringify(searchResults.tidal)}

    IMPORTANT:
    - Return 3-5 best possible matches, ordered by overall confidence
    - For each match:
      - Find 3-5 best matching profiles from EACH platform (spotify, soundcloud, youtube, tidal)
      - For each platform match:
        - Assign a confidence score (0-1) based on similarity. Don't be too generous.
    
    Consider:
    - Exact or similar artist names
    - Similar genres and styles
    - Matching locations if available
    - Similar audience sizes
    - Similar release dates and activity periods
    
    Return multiple unified artist profiles, each with multiple matches from each platform.
    Order results by overall confidence, with highest confidence first.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const artistProfiles = JSON.parse(response.text()) as CrossPlatformSearchResponse;

  console.log('artistProfiles', JSON.stringify(artistProfiles, null, 2));

  return artistProfiles.matches;
}
