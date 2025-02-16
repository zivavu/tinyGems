import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PlatformMatch {
  platformId: string;
  name: string;
  thumbnailImageUrl?: string;
  url: string;
  confidence: number;
}

interface PlatformMatcherProps {
  platform: string;
  suggestedMatch?: PlatformMatch;
  connectedPlatform?: ExternalPlatformArtistData;
  onCustomUrlSubmit: (url: string) => void;
  isLoading: boolean;
}

export function PlatformMatcher({ platform, suggestedMatch, connectedPlatform, onCustomUrlSubmit, isLoading }: PlatformMatcherProps) {
  const [isAddingUrl, setIsAddingUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    if (suggestedMatch && !connectedPlatform) {
      onCustomUrlSubmit(suggestedMatch.url);
    }
  }, [suggestedMatch, connectedPlatform, onCustomUrlSubmit]);

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

  if (isLoading && suggestedMatch) {
    return (
      <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <div className="flex items-center gap-3">
          {suggestedMatch.thumbnailImageUrl ? (
            <Image
              src={suggestedMatch.thumbnailImageUrl}
              alt={suggestedMatch.name}
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
            <Typography variant="h6">{suggestedMatch.name}</Typography>
            <Typography variant="small" className="text-amber-600 dark:text-amber-400">
              Connecting... ({Math.round(suggestedMatch.confidence * 100)}% confidence)
            </Typography>
          </div>
          <Icons.Loader className="w-5 h-5 animate-spin" />
        </div>
      </div>
    );
  }

  if (suggestedMatch) {
    return (
      <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
        <div className="flex items-center gap-3">
          {suggestedMatch.thumbnailImageUrl ? (
            <Image
              src={suggestedMatch.thumbnailImageUrl}
              alt={suggestedMatch.name}
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
            <Typography variant="h6">{suggestedMatch.name}</Typography>
            <Typography variant="small" className="text-amber-600 dark:text-amber-400">
              Suggested match ({Math.round(suggestedMatch.confidence * 100)}% confidence)
            </Typography>
          </div>
          <Button onClick={() => onCustomUrlSubmit(suggestedMatch.url)} disabled={isLoading}>
            Connect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
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
            <Button variant="outline" onClick={() => setIsAddingUrl(false)} disabled={isLoading}>
              <Icons.X className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={() => onCustomUrlSubmit(customUrl)} disabled={!customUrl || isLoading} className="w-full">
            Connect
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingUrl(true)}
          className="w-full flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          disabled={isLoading}
        >
          <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Icons.Plus className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1 text-left">
            <Typography variant="h6" className="capitalize">
              Connect {platform}
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Add artist profile URL
            </Typography>
          </div>
        </button>
      )}
    </div>
  );
}
