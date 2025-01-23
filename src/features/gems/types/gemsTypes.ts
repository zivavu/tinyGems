import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type GemCategory = 'music';

export interface GemPlatform {
  name: string;
  platformIcon: IconProp;
  url: string;
}

export interface GemProperties {
  media: {
    images?: string[];
    coverImage?: string;
    aspectRatio?: string;
  };
}

export interface GemBase {
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
  genres: string[];
  languages?: string[];
  moods?: string[];
  lyrics?: string[];
}

export interface MusicGem extends GemBase {
  properties: MusicGemProperties;
}
