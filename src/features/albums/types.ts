import { ArtistSnapshot } from '../artists/types';
import { EngagementStats, Platform } from '../gems/types';

export type AlbumType = 'album' | 'ep' | 'mixtape' | 'compilation';

export interface AlbumProperties {
  media: {
    coverImage?: string;
  };

  platforms: Platform[];
  releaseDate: string;
  duration: string;
  genres: string[];
  language?: string[];
  totalTracks: number;
}

export interface Album {
  id: string;
  type: AlbumType;
  title: string;
  artistId: string;
  artist: ArtistSnapshot;

  metadata: {
    addedByUserId: string;
    status: 'active' | 'deleted' | 'hidden';
  };

  stats: EngagementStats;

  tracks: {
    gemId: string;
  }[];

  tags: string[];
  properties: AlbumProperties;
}
