import { ArtistSnapshot } from '@/features/artists/types';

export type GemCategory = 'music';
export type PlatformType = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';
export interface EngagementStats {
  likes: number;
  saves: number;
  views: number;
}

export type MediaStatus = 'active' | 'deleted' | 'hidden';

export interface Platform {
  name: PlatformType | 'other';
  url: string;
}

export interface MediaBase {
  id: string;
  title: string;
  createdAt: string;
  artist: ArtistSnapshot;
  metadata: {
    submittedByUserId: string;
    status: MediaStatus;
  };
  stats: EngagementStats;
  tags?: string[];
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

export interface Gem extends MediaBase {
  properties: GemProperties;
}
