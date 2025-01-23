import { Category } from '../../shared/utils/dummy/categories';

export type GemSource = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';

export type GemType = 'music';

export interface GemProperties {
  media: {
    images?: string[];
    coverImage?: string;
    aspectRatio?: string;
  };
}

export interface GemBase {
  id: string;
  type: GemType;
  title: string;
  description?: string;
  category: Category;
  artist: {
    id: string;
    name: string;
    location?: string;
    avatar?: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  saves: number;
  curator?: {
    name: string;
    avatar?: string;
  };
  properties: GemProperties;
}

export interface MusicGemProperties extends GemProperties {
  source: 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube';
  sourceUrl: string;
  duration: string;
  releaseDate: string;
  genres: string[];
}

export interface MusicGem extends GemBase {
  properties: MusicGemProperties;
}
