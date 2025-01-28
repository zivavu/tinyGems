export type ArtistGender = 'male' | 'female' | 'non-binary' | 'other' | 'group';
export type AudienceSize = 'microscopic' | 'tiny' | 'little' | 'small' | 'substantial' | 'giant';

export interface ArtistRevision {
  timestamp: string;
  editorId: string;
  changes: Record<string, unknown>;
}

export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  banner?: string;
  location?: string;
  bio?: string;

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

  joinedAt: string;
  stats: {
    followers: number;
    following: number;
    gems: number;
  };

  tags: string[];
  primaryCategory: string;

  // Metadata for wiki-style editing
  lastUpdated: string;
  revisionHistory: ArtistRevision[];
}
