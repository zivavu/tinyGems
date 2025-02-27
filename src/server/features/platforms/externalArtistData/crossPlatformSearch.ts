import { PlatformType } from '@/features/gems/types';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { searchSoundcloudArtist } from './getArtistData/soundcloudArtistData';
import { searchSpotifyArtist } from './getArtistData/spotifyArtistData';
import { searchTidalArtist } from './getArtistData/tidalArtistData';
import { searchYoutubeArtist } from './getArtistData/youtubeArtistData';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY!);

export interface ExternalPlatformArtistData {
  name: string;
  platformId: string;
  avatar?: string;
  links?: {
    [key: string]: string;
  };
  audience?: {
    spotify?: {
      followers?: number;
      popularity?: number;
    };
    youtube?: {
      subscribers?: number;
      totalViews?: number;
      videosCount?: number;
    };
    soundcloud?: {
      followers?: number;
      trackPlays?: number;
    };
    tidal?: {
      popularity?: number;
      topTracks?: number;
      albums?: number;
    };
  };
  metadata?: {
    genres?: string[];
    description?: string;
    location?: string;
    topTracks?: Array<{
      id: string;
      name: string;
      previewUrl?: string;
    }>;
    relatedArtists?: Array<{
      id: string;
      name: string;
      popularity: number;
    }>;
  };
}

const matchingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    matches: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ['platformName', 'platformMatches'],
        properties: {
          platformName: { type: SchemaType.STRING },
          platformMatches: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              required: ['platform', 'possibleArtists'],
              properties: {
                platform: {
                  type: SchemaType.STRING,
                  enum: ['spotify', 'soundcloud', 'youtube', 'tidal'],
                },
                possibleArtists: {
                  type: SchemaType.ARRAY,
                  nullable: true,
                  items: {
                    type: SchemaType.OBJECT,
                    required: ['artistId', 'artistName', 'confidence'],
                    properties: {
                      artistId: {
                        type: SchemaType.STRING,
                        description: 'The ID of the artist on the platform',
                      },
                      artistName: { type: SchemaType.STRING },
                      artistUrl: {
                        type: SchemaType.STRING,
                        description: 'The URL of the artist that points to the his page on the platform',
                      },
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

type MathedArtist = {
  artistId: string;
  artistUrl: string;
  artistName: string;
  thumbnailImageUrl?: string | null;
  confidence: number;
};

type MatchedPlatformArtists = {
  platform: PlatformType;
  possibleArtists: MathedArtist[] | null;
};

type Match = {
  platformName: string;
  platformMatches: MatchedPlatformArtists[];
};

type MatchingSchema = {
  matches: Match[];
};

export async function findArtistAcrossPlatforms(artistName: string, skipPlatform?: PlatformType) {
  const platformSearches = {
    spotify: () => searchSpotifyArtist(artistName),
    soundcloud: () => searchSoundcloudArtist(artistName),
    youtube: () => searchYoutubeArtist(artistName),
    tidal: () => searchTidalArtist(artistName),
  } as const;

  if (skipPlatform) {
    if (!Object.keys(platformSearches).includes(skipPlatform)) {
      throw new Error(`Invalid platform to skip: ${skipPlatform}`);
    }
    delete platformSearches[skipPlatform as keyof typeof platformSearches];
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
        - Assign a confidence score (0-1) based on similarity. Don't be too generous(don't give a 80+ confidence to multiple artists).
    - Make sure that you don't include duplicates in the results.
    
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
  const response = result.response;
  const artistProfiles = JSON.parse(response.text()) as MatchingSchema;

  // Deduplicate artists with the same ID within each platform
  const dedupedMatches = deduplicateArtists(artistProfiles.matches);

  return dedupedMatches;
}

// Helper function to deduplicate artists with the same ID from the same platform,
// keeping only the highest confidence version of each
function deduplicateArtists(matches: Match[]): Match[] {
  return matches.map((match) => {
    const dedupedPlatformMatches = match.platformMatches.map((platformMatch) => {
      if (!platformMatch.possibleArtists?.length) return platformMatch;

      // Deduplicate by artist ID
      const artistIdMap = new Map<string, MathedArtist>();

      platformMatch.possibleArtists.forEach((artist) => {
        const existingArtist = artistIdMap.get(artist.artistId);

        // Either add the artist to the map or replace existing one if this one has higher confidence
        if (!existingArtist || artist.confidence > existingArtist.confidence) {
          artistIdMap.set(artist.artistId, artist);
        }
      });

      // Convert the map back to an array, sorted by confidence (highest first)
      const dedupedArtists = Array.from(artistIdMap.values()).sort((a, b) => b.confidence - a.confidence);

      return {
        ...platformMatch,
        possibleArtists: dedupedArtists,
      };
    });

    return {
      ...match,
      platformMatches: dedupedPlatformMatches,
    };
  });
}
