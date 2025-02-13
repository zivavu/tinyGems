import { ArtistSnapshot } from '@/features/artists/types';

export interface PlatformArtistData {
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

export interface ParsedArtistData extends ArtistSnapshot {
  platformData: Record<string, PlatformArtistData>;
}

export type PlatformLinkParseResult = {
  platformId: string;
  isValid: boolean;
  error?: string;
};

export interface CrossPlatformMatch {
  name: string;
  platformMatches: {
    platform: 'spotify' | 'soundcloud' | 'youtube' | 'tidal';
    matches: {
      platformId: string;
      name: string;
      thumbnailImageUrl?: string;
      confidence: number;
    }[];
  }[];
}

export interface CrossPlatformSearchResponse {
  matches: CrossPlatformMatch[];
}
