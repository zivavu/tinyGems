import { ArtistSnapshot } from '@/features/artists/types';

export type GemCategory = 'music';
export type PlatformType = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube';
export interface EngagementStats {
  likes: number;
  saves: number;
  views: number;
}

export interface Platform {
  name: PlatformType | 'other';
  url: string;
}

export interface GemProperties {
  media: {
    coverImage?: string;
  };
  platforms: Platform[];
  releaseDate: string;
  duration: string;
  genres: string[];
  language?: string[];
  mood?: string[];
  features?: {
    hasMusicVideo: boolean;
    hasLyrics: boolean;
    isInstrumental: boolean;
  };
}

export interface Gem {
  id: string;
  category: GemCategory;
  title: string;

  artistId: string;
  artist: ArtistSnapshot;

  metadata: {
    createdBy: string;
  };

  stats: EngagementStats;

  tags: string[];
  properties: GemProperties;
}
