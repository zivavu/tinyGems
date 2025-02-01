export type ArtistGender = 'male' | 'female' | 'non-binary' | 'other' | 'group';
export type AudienceSize = 'microscopic' | 'tiny' | 'little' | 'small' | 'substantial' | 'giant';
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
  audienceSize?: AudienceSize;

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
    status: 'active' | 'inactive';
  };

  tags: string[];
  genres: string[];

  revisionHistory: ArtistRevision[];
}

export type ArtistSnapshot = Pick<Artist, 'id' | 'name' | 'location' | 'avatar' | 'gender' | 'audienceSize'>;
