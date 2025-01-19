import { Category } from '../categories';

export type GemSource = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';

export type GemType = 'music' | 'art' | 'craft' | 'content' | 'words' | 'video' | 'photography';

// Base Gem interface with common properties
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
interface MusicGemProperties {
  source: 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube';
  sourceUrl: string;
  albumArt?: string;
  duration: string;
  releaseDate: string;
  genres: string[];
}

interface ArtGemProperties {
  medium: string[];
  images: string[];
  dimensions?: string;
  materials?: string[];
}

interface CraftGemProperties {
  materials: string[];
  images: string[];
  dimensions?: string;
  timeToMake?: string;
}

interface ContentGemProperties {
  platform: 'blog' | 'substack' | 'medium' | 'other';
  url: string;
  readTime?: string;
  coverImage?: string;
}

// Union type for all gem properties
type GemTypeProperties =
  | { type: 'music'; properties: MusicGemProperties }
  | { type: 'art'; properties: ArtGemProperties }
  | { type: 'craft'; properties: CraftGemProperties }
  | { type: 'content'; properties: ContentGemProperties };

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

// ... other type guards as needed

export type { ArtGemProperties, BaseGem, ContentGemProperties, CraftGemProperties, Gem, MusicGemProperties };
