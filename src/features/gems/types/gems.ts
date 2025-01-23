export type GemType = 'music';

export interface GemBase {
  media: {
    images?: string[];
    coverImage?: string;
    aspectRatio?: string;
  };
}

export interface BaseGem {
  id: string;
  type: GemType;
  title: string;
  description?: string;
  category: string;
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
  properties: GemBase;
}

// Specific properties for each type
export interface MusicGem extends GemBase {
  source: 'GemProperties' | 'spotify' | 'soundcloud' | 'youtube';
  sourceUrl: string;
  duration: string;
  releaseDate: string;
  genres: string[];
}
