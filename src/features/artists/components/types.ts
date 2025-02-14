import { MatchingSchema } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { PlatformArtistData } from '@/server/features/platforms/externalArtistData/types';

export interface PlatformStatus {
  status: 'idle' | 'searching' | 'found' | 'not-found' | 'error';
  data?: PlatformArtistData;
  matches?: MatchingSchema['matches'][0]['platformMatches'][0]['matches'];
}

export interface PlatformStatuses {
  spotify: PlatformStatus;
  soundcloud: PlatformStatus;
  youtube: PlatformStatus;
  tidal: PlatformStatus;
}

export interface SelectedMatches {
  [platform: string]: {
    platformId: string;
    name: string;
    thumbnailImageUrl?: string;
    customUrl?: string;
  } | null;
}
