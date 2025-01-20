import { Category } from '../categories';

export type GemSource = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';

export type GemType =
  | 'music'
  | 'art'
  | 'craft'
  | 'content-creation'
  | 'words'
  | 'video'
  | 'photography'
  | 'mixed-media'
  | 'other'
  | 'fiber-arts'
  | 'digital-art';

export interface BaseGemProperties {
  media: {
    images?: string[];
    coverImage?: string;
    aspectRatio?: string;
  };
}

interface BaseGem {
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
}

// Specific properties for each type
interface MusicGemProperties extends BaseGemProperties {
  source: 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube';
  sourceUrl: string;
  duration: string;
  releaseDate: string;
  genres: string[];
}

interface ArtGemProperties extends BaseGemProperties {
  medium: string[];
  dimensions?: string;
  materials?: string[];
}

interface CraftGemProperties extends BaseGemProperties {
  materials: string[];
  dimensions?: string;
  timeToMake?: string;
}

interface ContentGemProperties extends BaseGemProperties {
  platform: 'blog' | 'substack' | 'medium' | 'other';
  url: string;
  readTime?: string;
}

// Union type for all gem properties
type GemTypeProperties =
  | { type: 'music'; properties: MusicGemProperties }
  | { type: 'art'; properties: ArtGemProperties }
  | { type: 'craft'; properties: CraftGemProperties }
  | { type: 'content-creation'; properties: ContentGemProperties };

// Final Gem type that combines base and specific properties
type Gem = BaseGem & {
  properties: GemTypeProperties['properties'];
};

// Type guard functions
export function isMusicGem(gem: Gem): gem is BaseGem & { properties: MusicGemProperties } {
  return gem.type === 'music';
}

export function isArtGem(gem: Gem): gem is BaseGem & { properties: ArtGemProperties } {
  return gem.type === 'art';
}

export function isCraftGem(gem: Gem): gem is BaseGem & { properties: CraftGemProperties } {
  return gem.type === 'craft';
}

export function isContentGem(gem: Gem): gem is BaseGem & { properties: ContentGemProperties } {
  return gem.type === 'content-creation';
}

export function isWordsGem(gem: Gem): gem is BaseGem & { properties: ContentGemProperties } {
  return gem.type === 'words';
}

export function isVideoGem(gem: Gem): gem is BaseGem & { properties: ContentGemProperties } {
  return gem.type === 'video';
}

export function isPhotographyGem(gem: Gem): gem is BaseGem & { properties: ArtGemProperties } {
  return gem.type === 'photography';
}

export type { ArtGemProperties, BaseGem, ContentGemProperties, CraftGemProperties, Gem, MusicGemProperties };
