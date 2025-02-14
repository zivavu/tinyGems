'use client';

import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { MatchingSchema } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { PlatformArtistData } from '@/server/features/platforms/externalArtistData/types';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface PlatformStatus {
  status: 'idle' | 'searching' | 'found' | 'not-found' | 'error';
  data?: PlatformArtistData;
  matches?: MatchingSchema['matches'][0]['platformMatches'][0]['matches'];
}

interface PlatformStatuses {
  spotify: PlatformStatus;
  soundcloud: PlatformStatus;
  youtube: PlatformStatus;
  tidal: PlatformStatus;
}

export function AddArtistForm() {
  const [step, setStep] = useState<'link' | 'review' | 'details'>('link');
  const [url, setUrl] = useState('');
  const [artistData, setArtistData] = useState<PlatformArtistData | null>(null);
  const [platformStatuses, setPlatformStatuses] = useState<PlatformStatuses>({
    spotify: { status: 'idle' },
    soundcloud: { status: 'idle' },
    youtube: { status: 'idle' },
    tidal: { status: 'idle' },
  });

  const fetchArtistMutation = trpcReact.artistRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      setArtistData(data.artistData);

      const newStatuses = {
        spotify: { status: 'searching' },
        soundcloud: { status: 'searching' },
        youtube: { status: 'searching' },
        tidal: { status: 'searching' },
        [data.platform]: {
          status: 'found',
          matches: [
            {
              platformId: data.artistData.platformId,
              name: data.artistData.name,
              thumbnailImageUrl: data.artistData.avatar,
              confidence: 1,
            },
          ],
        },
      } as PlatformStatuses;

      setPlatformStatuses(newStatuses);

      // Search other platforms, skipping the original one
      findAcrossPlatformsMutation.mutate({
        artistName: data.artistData.name,
        skipPlatform: data.platform,
      });

      setStep('review');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const findAcrossPlatformsMutation = trpcReact.artistRouter.findAcrossPlatforms.useMutation({
    onSuccess: (platformResults) => {
      setPlatformStatuses((current) => {
        const newStatuses = { ...current };

        // Update only the platforms that were searched
        // (preserving the original platform's status)
        Object.entries(platformResults).forEach(([platform, result]) => {
          newStatuses[platform as keyof PlatformStatuses] = {
            status: result.status,
            matches: result.matches,
          };
        });

        return newStatuses;
      });
    },
    onError: (error) => {
      toast.error(error.message);
      setPlatformStatuses((current) => {
        const newStatuses = { ...current };

        // Set error status for all platforms except the original one
        Object.keys(newStatuses).forEach((platform) => {
          if (newStatuses[platform].status === 'searching') {
            newStatuses[platform] = { status: 'error' };
          }
        });

        return newStatuses;
      });
    },
  });

  async function handleUrlSubmit() {
    if (!url) {
      toast.error('Please enter a valid URL');
      return;
    }

    // Reset platform statuses
    setPlatformStatuses({
      spotify: { status: 'searching' },
      soundcloud: { status: 'searching' },
      youtube: { status: 'searching' },
      tidal: { status: 'searching' },
    });

    fetchArtistMutation.mutate({ url });
  }

  function getStatusIcon(status: PlatformStatus['status']) {
    switch (status) {
      case 'searching':
        return <Icons.Loader className="h-5 w-5 animate-spin text-amber-500" />;
      case 'found':
        return <Icons.CheckCircle className="h-5 w-5 text-green-500" />;
      case 'not-found':
        return <Icons.AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <Icons.AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition
        show={step === 'link'}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Typography variant="h4">Let&apos;s see what you got</Typography>
            <Typography variant="muted">
              We&apos;ll automatically fetch information from other platforms to make the process easier.
            </Typography>
          </div>

          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Spotify/Apple Music/SoundCloud/Bandcamp/YouTube link..."
              className="w-full px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={fetchArtistMutation.isPending}
            />
            <Transition
              show={fetchArtistMutation.isPending}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="animate-spin">
                <Icons.Loader className="w-5 h-5 text-amber-500" />
              </div>
            </Transition>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleUrlSubmit}
              disabled={fetchArtistMutation.isPending || !url}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {fetchArtistMutation.isPending ? (
                <>
                  <Icons.Loader className="w-5 h-5 animate-spin" />
                  Fetching artist data...
                </>
              ) : (
                <>
                  <Icons.ArrowRight className="w-5 h-5" />
                  Continue
                </>
              )}
            </Button>
          </div>
        </div>
      </Transition>

      <Transition
        show={step === 'review' && artistData !== null}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {artistData?.avatar && (
              <Image width={96} height={96} src={artistData.avatar} alt={artistData.name} className="w-24 h-24 rounded-lg object-cover" />
            )}
            <div className="flex-1">
              <Typography variant="h3">{artistData?.name}</Typography>
              {artistData?.metadata?.genres && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {artistData.metadata.genres.map((genre) => (
                    <span key={genre} className="px-2 py-1 text-sm bg-amber-100 dark:bg-amber-900 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Found on other platforms</Typography>
            {Object.entries(platformStatuses)
              .filter(([platform]) => platform !== artistData?.platform) // Skip the original platform
              .map(([platform, status]) => (
                <div key={platform} className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status.status)}
                      <div>
                        <Typography variant="h5" className="capitalize">
                          {platform}
                        </Typography>
                        {status.status === 'found' && status.matches && (
                          <Typography variant="small" className="text-gray-500">
                            {status.matches.length} potential matches found
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>

                  {status.status === 'found' && status.matches && (
                    <div className="pl-4 space-y-2">
                      {status.matches.map((match) => (
                        <div
                          key={match.platformId}
                          className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {match?.thumbnailImageUrl && (
                            <Image
                              src={match.thumbnailImageUrl}
                              alt={match.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <Typography variant="h6">{match.name}</Typography>
                            <Typography variant="small" className="text-gray-500">
                              Match confidence: {(match.confidence * 100).toFixed(0)}%
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setStep('link')} variant="outline" className="flex items-center gap-2">
              <Icons.ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button onClick={() => setStep('details')} className="flex items-center gap-2">
              <Icons.ArrowRight className="w-5 h-5" />
              Continue
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
