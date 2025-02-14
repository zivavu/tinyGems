import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import Image from 'next/image';
import { useState } from 'react';
import { PlatformStatus, SelectedMatches } from './types';

interface PlatformMatch {
  platformId: string;
  name: string;
  thumbnailImageUrl?: string;
  confidence: number;
}

interface PlatformMatcherProps {
  platform: string;
  status: PlatformStatus;
  selectedMatch: SelectedMatches[string];
  onMatchSelect: (platform: string, match: PlatformMatch | null) => void;
  onCustomUrlSubmit: (url: string) => void;
}

export function PlatformMatcher({ platform, status, selectedMatch, onMatchSelect, onCustomUrlSubmit }: PlatformMatcherProps) {
  const [customUrl, setCustomUrl] = useState('');

  function getStatusIcon(status: PlatformStatus['status']) {
    switch (status) {
      case 'searching':
        return <Icons.Loader className="w-5 h-5 animate-spin text-amber-500" />;
      case 'found':
        return <Icons.Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <Icons.X className="w-5 h-5 text-red-500" />;
      default:
        return <Icons.Search className="w-5 h-5 text-gray-400" />;
    }
  }

  function getProfileUrl(platform: string, platformId: string) {
    switch (platform) {
      case 'spotify':
        return `https://open.spotify.com/artist/${platformId}`;
      case 'soundcloud':
        return `https://soundcloud.com/${platformId}`;
      case 'youtube':
        return `https://youtube.com/channel/${platformId}`;
      case 'tidal':
        return `https://tidal.com/artist/${platformId}`;
      default:
        return '';
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          {getStatusIcon(status.status)}
          <div>
            <Typography variant="h5" className="capitalize">
              {platform}
            </Typography>
            <Typography variant="small" className="text-gray-500">
              {status.status === 'searching'
                ? 'Searching for matches...'
                : status.status === 'found'
                  ? `${status.matches?.length || 0} potential matches`
                  : status.status === 'error'
                    ? 'Failed to find matches'
                    : ''}
            </Typography>
          </div>
        </div>
      </div>

      {status.status === 'found' && (
        <div className="pl-4 space-y-2">
          {status.matches?.map((match) => (
            <button
              key={match.platformId}
              onClick={() => onMatchSelect(platform, match)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                selectedMatch?.platformId === match.platformId
                  ? 'bg-amber-100 dark:bg-amber-900'
                  : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {match.thumbnailImageUrl ? (
                <Image src={match.thumbnailImageUrl} alt={match.name} width={40} height={40} className="rounded-md object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Icons.Music className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1 text-left">
                <Typography variant="h6">{match.name}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Match confidence: {(match.confidence * 100).toFixed(0)}%
                </Typography>
              </div>
              <a
                href={getProfileUrl(platform, match.platformId)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400"
                onClick={(e) => e.stopPropagation()}
              >
                <Icons.ExternalLink className="w-4 h-4" />
              </a>
            </button>
          ))}

          <div className="mt-4">
            <button
              onClick={() => onMatchSelect(platform, null)}
              className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                selectedMatch === null
                  ? 'bg-amber-100 dark:bg-amber-900'
                  : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icons.Link className="w-5 h-5" />
              <Typography>Add custom URL</Typography>
            </button>

            {selectedMatch === null && (
              <div className="mt-2 space-y-2">
                <input
                  type="url"
                  placeholder={`Enter ${platform} profile URL...`}
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
                />
                <Button
                  onClick={() => {
                    onCustomUrlSubmit(customUrl);
                    setCustomUrl('');
                  }}
                  disabled={!customUrl}
                  className="w-full"
                >
                  Verify URL
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
