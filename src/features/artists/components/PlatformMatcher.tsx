import { PlatformType } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';

interface PlatformMatcherProps {
  platform: PlatformType;
  connectedPlatform?: ExternalPlatformArtistData;
  suggestedMatches?: {
    platform: PlatformType;
    possibleArtists: Array<{
      artistId: string;
      artistName: string;
      artistUrl: string;
      thumbnailImageUrl?: string | null;
      confidence: number;
    }> | null;
  };
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
  const [customUrl, setCustomUrl] = useState('');

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
        <Transition show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-2" enterTo="opacity-100 translate-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {connectedPlatform.avatar ? (
                <Image
                  src={connectedPlatform.avatar}
                  alt={connectedPlatform.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Icons.Music className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <Typography variant="h6">{connectedPlatform.name}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Connected to {platform}
                </Typography>
              </div>
              <Icons.Check className="w-5 h-5 text-green-500" />
            </div>
            <Button onClick={onDisconnect} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Icons.Unlink className="w-4 h-4" />
            </Button>
          </div>
        </Transition>
      ) : (
        <div className="space-y-3">
          {isSearching ? (
            <div className="flex flex-col gap-2">
              <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse opacity-60" />
              <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse opacity-30" />
            </div>
          ) : suggestedMatches?.possibleArtists?.length ? (
            <div className="space-y-2">
              <Typography variant="small" className="text-gray-500">
                Suggested matches
              </Typography>
              {suggestedMatches.possibleArtists.map((artist) => (
                <div
                  key={artist.artistId}
                  className="group flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                >
                  {artist.thumbnailImageUrl ? (
                    <Image
                      src={artist.thumbnailImageUrl}
                      alt={artist.artistName}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Icons.Music className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <a href={artist.artistUrl} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                      <Typography variant="h6" className="truncate">
                        {artist.artistName}
                      </Typography>
                    </a>
                    <Typography variant="small" className="text-amber-600 dark:text-amber-400">
                      {Math.round(artist.confidence * 100)}% match
                    </Typography>
                  </div>

                  <Button
                    onClick={() => onConnect(artist.artistUrl)}
                    disabled={isLoading}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    {isLoading ? (
                      <Icons.Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Icons.Link className="w-4 h-4" />
                        Connect
                      </div>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setIsAddingUrl(true)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
            >
              <Icons.Plus className="w-5 h-5" />
              <Typography>Add {platform} profile</Typography>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
