import { Icons } from '@/features/shared/components/Icons';
import { Button } from '@/features/shared/components/buttons/Button';
import { Typography } from '@/features/shared/components/Typography';
import { PlatformType } from '@/features/gems/types';
import { useState } from 'react';
import { AddUrlForm } from './AddUrlForm';
import { ConnectedPlatform } from './ConnectedPlatform';
import { LoadingState } from './LoadingState';
import { SuggestedMatches, SuggestedMatchesProps } from './SuggestedMatches';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';

interface PlatformMatcherProps {
  platform: PlatformType;
  suggestedMatches: SuggestedMatchesProps;
  connectedPlatform: ExternalPlatformArtistData | null;
  onConnect: (url: string) => void;
  onDisconnect: () => void;
  isLoading: boolean;
  isSearching: boolean;
}

export function PlatformMatcher({
  platform,
  suggestedMatches,
  connectedPlatform,
  onConnect,
  onDisconnect,
  isLoading,
  isSearching,
}: PlatformMatcherProps) {
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const renderContent = () => {
    if (connectedPlatform) {
      return <ConnectedPlatform connectedPlatform={connectedPlatform} platform={platform} onDisconnect={onDisconnect} />;
    }

    if (isSearching) {
      return <LoadingState />;
    }

    if (suggestedMatches?.possibleArtists?.length) {
      return <SuggestedMatches matches={suggestedMatches.possibleArtists} onConnect={onConnect} isLoading={isLoading} />;
    }

    return isAddingUrl ? (
      <AddUrlForm platform={platform} onSubmit={onConnect} onCancel={() => setIsAddingUrl(false)} isLoading={isLoading} />
    ) : (
      <Button
        onClick={() => setIsAddingUrl(true)}
        className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors group"
      >
        <Icons.Plus className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
        <Typography className="text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
          Add {platform} profile manually
        </Typography>
      </Button>
    );
  };

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
      {renderContent()}
    </div>
  );
}
