import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { searchSoundcloudArtist } from './getArtistData/soundcloudArtistData';
import { searchSpotifyArtist } from './getArtistData/spotifyArtistData';
import { searchTidalArtist } from './getArtistData/tidalArtistData';
import { searchYoutubeArtist } from './getArtistData/youtubeArtistData';
import { PlatformArtistData } from './types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY!);

const matchingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    matches: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          platform: {
            type: SchemaType.STRING,
            description: 'Platform name (spotify, soundcloud, youtube, or tidal)',
            enum: ['spotify', 'soundcloud', 'youtube', 'tidal'],
          },
          artistId: {
            type: SchemaType.STRING,
            description: 'Platform-specific artist ID',
          },
          confidence: {
            type: SchemaType.NUMBER,
            description: 'Confidence score between 0 and 1',
            minimum: 0,
            maximum: 1,
          },
          reasoning: {
            type: SchemaType.STRING,
            description: 'Explanation of why this is likely the same artist',
          },
          matchingFactors: {
            type: SchemaType.OBJECT,
            properties: {
              nameSimilarity: {
                type: SchemaType.NUMBER,
                description: 'How similar the artist names are (0-1)',
              },
              audienceMatch: {
                type: SchemaType.NUMBER,
                description: 'How well the audience sizes correlate (0-1)',
              },
              genreOverlap: {
                type: SchemaType.NUMBER,
                description: 'How much the genres overlap (0-1)',
              },
              locationMatch: {
                type: SchemaType.BOOLEAN,
                description: 'Whether the locations match',
              },
            },
            required: ['nameSimilarity'],
          },
        },
        required: ['platform', 'artistId', 'confidence', 'reasoning', 'matchingFactors'],
      },
    },
  },
  required: ['matches'],
};

interface PlatformSearchResults {
  spotify: PlatformArtistData[];
  soundcloud: PlatformArtistData[];
  youtube: PlatformArtistData[];
  tidal: PlatformArtistData[];
}

interface ArtistMatch {
  platform: keyof PlatformSearchResults;
  artistData: PlatformArtistData;
  confidence: number;
  reasoning: string;
  matchingFactors: any;
}

export async function findArtistAcrossPlatforms(artistName: string): Promise<ArtistMatch[]> {
  const [spotify, soundcloud, youtube, tidal] = await Promise.all([
    searchSpotifyArtist(artistName).catch(() => []),
    searchSoundcloudArtist(artistName).catch(() => []),
    searchYoutubeArtist(artistName).catch(() => []),
    searchTidalArtist(artistName).catch(() => []),
  ]);

  const searchResults: PlatformSearchResults = {
    spotify,
    soundcloud,
    youtube,
    tidal,
  };

  // Only proceed with Gemini if we have results
  if (Object.values(searchResults).every((results) => results.length === 0)) {
    throw new Error('No artists found on any platform');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: matchingSchema,
    },
  });

  const prompt = `
    Analyze these search results for an artist named "${artistName}" from different music platforms
    and identify which entries likely represent the same artist.
    
    Search results:
    ${JSON.stringify(searchResults, null, 2)}

    Consider:
    - Name similarity (including variations/aliases)
    - Audience size correlation across platforms
    - Genre overlap
    - Location matches if available
    - Profile description similarities
    
    Only include matches with confidence > 0.7
    Provide detailed reasoning for each match.
    Calculate matching factors based on available data.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const matches = JSON.parse(response.text());

  // Convert Gemini response to our internal format
  return matches.matches.map((match: any) => ({
    platform: match.platform,
    artistData: searchResults[match.platform].find((artist) => artist.platformId === match.artistId)!,
    confidence: match.confidence,
    reasoning: match.reasoning,
    matchingFactors: match.matchingFactors,
  }));
}
