import { Category } from '../categories';

export type GemSource = 'bandcamp' | 'spotify' | 'soundcloud' | 'youtube' | 'other';

interface GemBase {
  id: string;
  title: string;
  description?: string;
  category: Category['slug'];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  creator?: {
    name: string;
    avatar?: string;
  };
  curator?: {
    name: string;
    avatar?: string;
  };
  likes: number;
  saves: number;
}

export interface MusicGem extends GemBase {
  type: 'music';
  artist: {
    name: string;
    avatar?: string;
    location?: string;
  };
  source: GemSource;
  sourceUrl: string;
  albumArt?: string;
  duration?: string;
  releaseDate?: string;
  genres: string[];
}

// We can add more gem types later
export type Gem = MusicGem; // | ArtGem | CraftGem | etc.
