import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { searchSoundcloudArtist } from './getArtistData/soundcloudArtistData';
import { searchSpotifyArtist } from './getArtistData/spotifyArtistData';
import { searchTidalArtist } from './getArtistData/tidalArtistData';
import { searchYoutubeArtist } from './getArtistData/youtubeArtistData';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY!);

type Platform = 'spotify' | 'soundcloud' | 'youtube' | 'tidal';

interface PlatformMatch {
  platformId: string;
  name: string;
  thumbnailImageUrl?: string | null;
  confidence: number;
}

interface PlatformMatches {
  platform: Platform;
  matches: PlatformMatch[];
}

interface ArtistMatch {
  name: string;
  platformMatches: PlatformMatches[];
}

export interface MatchingSchema {
  matches: ArtistMatch[];
}

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
                  nullable: true,
                  minItems: 0,
                  maxItems: 5,
                  items: {
                    type: SchemaType.OBJECT,
                    required: ['platformId', 'confidence', 'name'],
                    properties: {
                      platformId: { type: SchemaType.STRING },
                      name: { type: SchemaType.STRING },
                      thumbnailImageUrl: { type: SchemaType.STRING, nullable: true },
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

export async function findArtistAcrossPlatforms(artistName: string, skipPlatform?: Platform) {
  // Create a map of platform search functions
  const platformSearches = {
    spotify: () => searchSpotifyArtist(artistName),
    soundcloud: () => searchSoundcloudArtist(artistName),
    youtube: () => searchYoutubeArtist(artistName),
    tidal: () => searchTidalArtist(artistName),
  };

  // Remove the platform to skip
  if (skipPlatform) {
    delete platformSearches[skipPlatform];
  }

  // Execute remaining searches
  const results = await Promise.all(
    Object.entries(platformSearches).map(async ([platform, searchFn]) => {
      try {
        const data = await searchFn();
        return { [platform]: data };
      } catch {
        return { [platform]: [] };
      }
    }),
  );

  // Combine results
  const searchResults = results.reduce((acc, result) => ({ ...acc, ...result }), {});

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

  // Update prompt to only include searched platforms
  const prompt = `
    Analyze these search results for an artist named "${artistName}" from different music platforms
    and find best matching artists across all platforms.

    ${Object.entries(searchResults)
      .map(
        ([platform, results]) => `
        ///////////////////
        ${platform.toUpperCase()} RESULTS:
        ${JSON.stringify(results)}
      `,
      )
      .join('\n')}

    IMPORTANT:
    - Return 3-5 best possible matches, ordered by overall confidence
    - For each match:
      - Find 3-5 best matching profiles from EACH platform
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
  const artistProfiles = JSON.parse(response.text()) as MatchingSchema;

  return artistProfiles.matches;
}
