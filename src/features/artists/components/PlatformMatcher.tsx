import { PlatformType } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
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
      thumbnailImageUrl?: string;
      confidence: number;
    }>;
  };
  onConnect: (url: string) => void;
  isLoading: boolean;
  isSearching: boolean;
}

export function PlatformMatcher({
  platform,
  suggestedMatches,
  connectedPlatform,
  onConnect,
  isLoading,
  isSearching,
}: PlatformMatcherProps) {
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  if (connectedPlatform) {
    return (
      <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
        <div className="flex items-center gap-3">
          {connectedPlatform.avatar ? (
            <Image src={connectedPlatform.avatar} alt={connectedPlatform.name} width={40} height={40} className="rounded-md object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Icons.Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <Typography variant="h6">{connectedPlatform.name}</Typography>
            <Typography variant="small" className="text-green-600 dark:text-green-400">
              Connected to {platform}
            </Typography>
          </div>
          <Icons.Check className="w-5 h-5 text-green-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Typography variant="h6" className="capitalize">
          {platform}
        </Typography>
        {isLoading && <Icons.Loader className="w-4 h-4 animate-spin text-amber-500" />}
      </div>

      {isSearching ? (
        <div className="h-20 flex items-center justify-center">
          <Typography variant="small" className="text-gray-500">
            Searching for matches...
          </Typography>
        </div>
      ) : suggestedMatches?.possibleArtists?.length ? (
        <div className="space-y-2">
          <Typography variant="small" className="text-gray-500">
            Suggested matches
          </Typography>
          {suggestedMatches.possibleArtists.map((artist) => (
            <div
              key={artist.artistId}
              className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
            >
              {artist.thumbnailImageUrl ? (
                <Image src={artist.thumbnailImageUrl} alt={artist.artistName} width={40} height={40} className="rounded-md object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Icons.Music className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <Typography variant="h6">{artist.artistName}</Typography>
                <Typography variant="small" className="text-amber-600 dark:text-amber-400">
                  {Math.round(artist.confidence * 100)}% match
                </Typography>
              </div>
              <Button onClick={() => onConnect(artist.artistUrl)} disabled={isLoading} variant="outline" size="sm">
                {isLoading ? <Icons.Loader className="w-4 h-4 animate-spin" /> : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="small" className="text-gray-500">
          No matches found
        </Typography>
      )}

      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        {isAddingUrl ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder={`Enter ${platform} profile URL...`}
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
                disabled={isLoading}
              />
              <Button variant="outline" onClick={() => setIsAddingUrl(false)} disabled={isLoading} size="sm">
                <Icons.X className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={() => onConnect(customUrl)} disabled={!customUrl || isLoading} className="w-full" size="sm">
              Connect
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingUrl(true)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            disabled={isLoading}
          >
            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Icons.Plus className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1 text-left">
              <Typography variant="small" className="text-gray-500">
                Or add custom URL
              </Typography>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
