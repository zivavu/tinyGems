export type GemCategory = 'music';

export type GemType = 'music';
export type GemPlatformName = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';

export interface GemPlatform {
  name: GemPlatformName;
  url: string;
}

export interface GemProperties {
  media: {
    images?: string[];
    coverImage?: string;
    aspectRatio?: string;
  };
}

export interface BaseGem {
  id: string;
  type: GemCategory;
  title: string;
  description?: string;
  category: GemCategory;
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
  platforms: GemPlatform[];
  duration: string;
  releaseDate: string;
  genre: string[];
  language?: string[];
  mood?: string[];
  hasMusicVideo?: boolean;
  lyrics?: string;
  lyricsTopic?: string[];
}

export interface MusicGem extends BaseGem {
  type: 'music';
  properties: MusicGemProperties;
}
