import { ArtistSnapshot } from '@/features/artists/types';

export type GemCategory = 'music';
export type PlatformType = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'tidal' | 'appleMusic' | 'other';
export const PLATFORM_NAMES: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal', 'bandcamp', 'appleMusic', 'other'];

export type EngagementType = 'likes' | 'saves' | 'views';

export interface LikesStats {
  total: number;
  breakdown: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
    allTime: number;
  };
}

export type MediaStatus = 'active' | 'deleted' | 'hidden';

export interface Platform {
  name: PlatformType | 'other';
  url: string;
}

export interface MediaBase {
  id: string;
  indexedAt: Date;
  searchVector?: string;
  title: string;
  createdAt: string;
  artist: ArtistSnapshot;
  metadata: {
    releaseDate: string;
    submittedByUserId: string;
    status: MediaStatus;
  };
  likes: LikesStats;
  tags?: string[];
}

export type ReleaseType = 'single' | 'albumTrack';

export interface MusicGemProperties {
  media: {
    coverImage?: string;
  };
  platforms: Platform[];
  releaseType: ReleaseType;
  releaseDate: string;
  duration: string;
  genres: string[];
  languages?: string[];
  lyricsTopics?: string[];
  bpm?: number;
  lyrics?: string;
  moods?: string[];
  features?: {
    musicVideo?: {
      url: string;
      provider: 'youtube' | 'vimeo';
    };
    lyrics?: {
      text: string;
      language: string;
    };
  };
  featuredArtistsIds?: string[];
  featuredArtists: {
    artistId: string;
    role?: string;
  }[];
}

export interface MusicGem extends MediaBase {
  category: GemCategory;
  properties: MusicGemProperties;
}
