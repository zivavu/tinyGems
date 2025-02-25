import { PlatformType } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { Button as HeadlessUiButton } from '@headlessui/react';
import { useState } from 'react';
import { usePlatformConnection } from '../../utils/usePlatformConnection';
import { AddUrlForm } from './AddUrlForm';
import { ConnectedPlatform } from './ConnectedPlatform';
import { LoadingState } from './LoadingState';
import { SuggestedMatches } from './SuggestedMatches';

interface PlatformMatcherProps {
  platform: PlatformType;
  connectedPlatform: ExternalPlatformArtistData | null;
  suggestedMatches: {
    platform: PlatformType;
    possibleArtists: Array<{
      artistId: string;
      artistName: string;
      artistUrl: string;
      thumbnailImageUrl?: string | null;
      confidence: number;
    }>;
  } | null;
  onConnect: (url: string) => void;
  onDisconnect: () => void;
  isLoading: boolean;
  isSearching: boolean;
}

export function PlatformMatcher({
  platform,
  connectedPlatform,
  suggestedMatches,
  onConnect,
  onDisconnect,
  isSearching,
}: PlatformMatcherProps) {
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const { isConnecting } = usePlatformConnection({
    initialArtistName: suggestedMatches?.possibleArtists[0]?.artistName,
  });

  const platformMatches = suggestedMatches?.possibleArtists?.find((p) => !!p.artistUrl);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Typography variant="h6" className="capitalize">
            {platform}
          </Typography>
          {isSearching && <Icons.Search className="w-4 h-4 text-amber-500 animate-pulse" />}
        </div>
      </div>

      {connectedPlatform ? (
        <ConnectedPlatform connectedPlatform={connectedPlatform} platform={platform} onDisconnect={onDisconnect} />
      ) : isSearching ? (
        <LoadingState />
      ) : platformMatches ? (
        <SuggestedMatches />
      ) : isAddingUrl ? (
        <AddUrlForm platform={platform} onSubmit={onConnect} onCancel={() => setIsAddingUrl(false)} isLoading={isConnecting} />
      ) : (
        <HeadlessUiButton
          onClick={() => setIsAddingUrl(true)}
          className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors group"
        >
          <Icons.Plus className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
          <Typography className="text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
            Add {platform} profile manually
          </Typography>
        </HeadlessUiButton>
      )}
    </div>
  );
}
