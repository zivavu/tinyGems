import { MediaBase, Platform } from '../gems/types';

export type AlbumType = 'album' | 'ep' | 'mixtape' | 'compilation';

export interface AlbumProperties {
  media: {
    coverImage?: string;
  };

  platforms: Platform[];
  duration: string;
  genres: string[];
  language?: string[];
  totalTracks: number;
}

export interface Album extends MediaBase {
  type: AlbumType;

  tracks: {
    gemId: string;
    order?: number;
  }[];

  properties: AlbumProperties;
}
