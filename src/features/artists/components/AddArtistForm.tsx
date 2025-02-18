'use client';

import { PlatformType } from '@/features/gems/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { Input, Transition } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PlatformMatcher } from './PlatformMatcher';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface ConnectedPlatform {
  platformId: PlatformType;
  name: string;
  thumbnailImageUrl?: string;
  url: string;
  platformData: ExternalPlatformArtistData;
}

export function AddArtistForm() {
  const [currentFormStep, setCurrentFormStep] = useState<'link' | 'review'>('link');
  const [initialArtistUrl, setInitialArtistUrl] = useState('');
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<PlatformType, ConnectedPlatform | null>>({
    spotify: null,
    soundcloud: null,
    youtube: null,
    tidal: null,
    bandcamp: null,
    appleMusic: null,
    other: null,
  });

  // Get the initial platform safely
  const initialPlatform = Object.entries(connectedPlatforms).find(([, data]) => data !== null)?.[0] as PlatformType | undefined;
  const initialPlatformData = initialPlatform ? connectedPlatforms[initialPlatform] : null;

  const initialArtistMutation = trpcReact.externalArtistDataRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      if (!data.platform || !data.artistData) return;

      setConnectedPlatforms((prev) => ({
        ...prev,
        [data.platform]: {
          platformId: data.artistData.platformId,
          name: data.artistData.name,
          thumbnailImageUrl: data.artistData.avatar,
          url: data.artistData.links?.[data.platform as keyof typeof data.artistData.links] ?? '',
          platformData: data.artistData,
        },
      }));
      setCurrentFormStep('review');

      if (data.artistData.name) {
        crossPlatformSearchQuery.refetch();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const crossPlatformSearchQuery = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: initialPlatformData?.name ?? '' },
    { enabled: Boolean(initialPlatformData?.name) },
  );

  const connectPlatformMutation = trpcReact.externalArtistDataRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      if (!data.platform || !data.artistData) return;

      setConnectedPlatforms((prev) => ({
        ...prev,
        [data.platform]: {
          platformId: data.artistData.platformId,
          name: data.artistData.name,
          thumbnailImageUrl: data.artistData.avatar,
          url: data.artistData.links?.[data.platform as keyof typeof data.artistData.links] ?? '',
          platformData: data.artistData,
        },
      }));
      toast.success(`Connected ${data.platform} profile`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const platforms: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal', 'bandcamp', 'appleMusic', 'other'];

  // Loading states
  const isLoading = initialArtistMutation.isPending || connectPlatformMutation.isPending;
  const isCrossPlatformSearching = crossPlatformSearchQuery.isFetching;
  const isConnectingPlatform = connectPlatformMutation.isPending;

  async function handleUrlSubmit() {
    if (!initialArtistUrl) {
      toast.error('Please enter a valid URL');
      return;
    }
    await initialArtistMutation.mutate({ url: initialArtistUrl });
  }

  async function handlePlatformConnect(url: string) {
    connectPlatformMutation.mutate(
      { url },
      {
        onSuccess: (data) => {
          if (!data.platform || !data.artistData) return;

          const previousState = { ...connectedPlatforms };
          setConnectedPlatforms((prev) => ({
            ...prev,
            [data.platform]: {
              platformId: data.artistData.platformId,
              name: data.artistData.name,
              thumbnailImageUrl: data.artistData.avatar,
              url: data.artistData.links?.[data.platform] ?? '',
              platformData: data.artistData,
            },
          }));

          toast.success(`Connected ${data.platform} profile`, {
            action: {
              label: 'Undo',
              onClick: () => setConnectedPlatforms(previousState),
            },
          });
        },
      },
    );
  }

  function handlePlatformDisconnect(platform: PlatformType) {
    const previousState = { ...connectedPlatforms };
    setConnectedPlatforms((prev) => ({
      ...prev,
      [platform]: null,
    }));

    toast.success(`Disconnected ${platform} profile`, {
      action: {
        label: 'Undo',
        onClick: () => setConnectedPlatforms(previousState),
      },
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition show={currentFormStep === 'link'}>
        <div className="space-y-4">
          <Typography variant="h3">Add an artist</Typography>
          <Typography>Share an underground artist with the community. Start by pasting a link from any major platform.</Typography>

          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Paste artist profile URL..."
              value={initialArtistUrl}
              onChange={(e) => setInitialArtistUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
            />
            <Button onClick={handleUrlSubmit} disabled={isLoading} className="w-full">
              {isLoading ? <Icons.Loader className="w-4 h-4 animate-spin" /> : 'Continue'}
            </Button>
          </div>
        </div>
      </Transition>

      <Transition show={currentFormStep === 'review'}>
        <div className="space-y-6">
          {initialPlatformData?.platformData && <UserProvidedURLArtistProfile artistData={initialPlatformData.platformData} />}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="h4">Connect other platforms</Typography>
              {isCrossPlatformSearching && (
                <div className="flex items-center gap-2 text-amber-600">
                  <Icons.Loader className="w-4 h-4 animate-spin" />
                  <Typography variant="small">Finding matches...</Typography>
                </div>
              )}
            </div>

            {platforms
              .filter((platform) => platform !== initialPlatform)
              .map((platform) => (
                <PlatformMatcher
                  key={platform}
                  platform={platform}
                  connectedPlatform={connectedPlatforms[platform]?.platformData}
                  suggestedMatches={crossPlatformSearchQuery.data?.[0]?.platformMatches.find(
                    (p) => p.platform === platform && p.possibleArtists?.length > 0,
                  )}
                  onConnect={handlePlatformConnect}
                  onDisconnect={() => handlePlatformDisconnect(platform)}
                  isLoading={isConnectingPlatform}
                  isSearching={isCrossPlatformSearching}
                />
              ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setCurrentFormStep('link')} variant="outline" className="flex items-center gap-2">
              <Icons.ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button
              onClick={() => {
                /* Handle submission */
              }}
              disabled={Object.values(connectedPlatforms).every((p) => p === null)}
              className="flex items-center gap-2"
            >
              <Icons.ArrowRight className="w-5 h-5" />
              Continue
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
