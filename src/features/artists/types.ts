import { MediaStatus } from '../gems/types';

export type ArtistGender = 'male' | 'female' | 'non-binary' | 'other' | 'group';
export type AudiencePerPlatform = {
  spotify?: {
    monthlyListeners?: number;
    followers?: number;
    popularity?: number;
  };
  bandcamp?: {
    followers?: number;
    supporterCount?: number;
    albumsSold?: number;
    tracksSold?: number;
  };
  soundcloud?: {
    followers?: number;
    trackPlays?: number;
    reposts?: number;
    likes?: number;
    commentsCount?: number;
  };
  youtube?: {
    subscribers?: number;
    totalViews?: number;
    averageViewsPerVideo?: number;
  };
  appleMusic?: {
    followers?: number;
    popularity?: number;
  };
};
export type VerificationType = 'platform_verified' | 'claimed';

export interface ArtistRevision {
  timestamp: string;
  editorId: string;
  type: 'create' | 'update' | 'verify' | 'claim';
  changes: Record<string, unknown>;
}

export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  banner?: string;

  location?: {
    country?: string;
    city?: string;
  };
  language?: string[];
  gender?: ArtistGender;
  platformAudience?: AudiencePerPlatform;
  combinedPopularity?: number;

  links: {
    website?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };

  stats: {
    followers: number;
    monthlyListeners?: number;
    lastSongDate?: string;
  };

  metadata: {
    verificationType: VerificationType;
    status: MediaStatus;
  };

  tags: string[];
  genres: string[];

  revisionHistory: ArtistRevision[];
}

export type ArtistSnapshot = Pick<Artist, 'id' | 'name' | 'location' | 'avatar' | 'gender' | 'combinedPopularity'>;

export interface ArtistTrack {
  id: string;
  name: string;
  duration?: number;
  album?: {
    id: string;
    name: string;
    releaseDate?: string;
    image?: string;
  } | null;
  previewUrl?: string | null;
  externalUrl: string;
  popularity?: number;
  isExplicit?: boolean;
  image?: string;
  genre?: string | null;
  publishedAt?: string;
  likes?: number;
  views?: number;
}
