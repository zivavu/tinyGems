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

type FormStep = 'link' | 'review';

interface ConnectedPlatform {
  platformId: PlatformType;
  name: string;
  thumbnailImageUrl?: string;
  url: string;
  platformData: ExternalPlatformArtistData;
}

const PLATFORM_NAMES: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal', 'bandcamp', 'appleMusic', 'other'];

export function AddArtistForm() {
  const [formStep, setFormStep] = useState<FormStep>('link');
  const [initialUrl, setInitialUrl] = useState('');
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<PlatformType, ConnectedPlatform | null>>(
    Object.fromEntries(PLATFORM_NAMES.map((platform) => [platform, null])) as Record<PlatformType, ConnectedPlatform | null>,
  );

  const initialPlatform = Object.entries(connectedPlatforms).find(([, data]) => data !== null)?.[0] as PlatformType | undefined;
  const initialPlatformData = initialPlatform ? connectedPlatforms[initialPlatform] : null;

  const { mutate: fetchInitialArtist, isPending: isInitialFetching } = trpcReact.externalArtistDataRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      if (!data.platform || !data.artistData) return;
      updateConnectedPlatform(data.platform, data.artistData);
      setFormStep('review');
      if (data.artistData.name) crossPlatformSearch.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const crossPlatformSearch = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: initialPlatformData?.name ?? '' },
    { enabled: Boolean(initialPlatformData?.name), refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const { mutate: connectPlatform, isPending: isConnecting } = trpcReact.externalArtistDataRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      if (!data.platform || !data.artistData) return;
      const previousState = { ...connectedPlatforms };
      updateConnectedPlatform(data.platform, data.artistData);
      toast.success(`Connected ${data.platform} profile`, {
        action: { label: 'Undo', onClick: () => setConnectedPlatforms(previousState) },
      });
    },
    onError: (error) => toast.error(error.message),
  });

  function updateConnectedPlatform(platform: PlatformType, artistData: ExternalPlatformArtistData) {
    setConnectedPlatforms((prev) => ({
      ...prev,
      [platform]: {
        platformId: artistData.platformId,
        name: artistData.name,
        thumbnailImageUrl: artistData.avatar,
        url: artistData.links?.[platform as keyof typeof artistData.links] ?? '',
        platformData: artistData,
      },
    }));
  }

  function handlePlatformDisconnect(platform: PlatformType) {
    const previousState = { ...connectedPlatforms };
    setConnectedPlatforms((prev) => ({ ...prev, [platform]: null }));
    toast.success(`Disconnected ${platform} profile`, {
      action: { label: 'Undo', onClick: () => setConnectedPlatforms(previousState) },
    });
  }

  const isLoading = isInitialFetching || isConnecting;
  const isCrossPlatformSearching = crossPlatformSearch.isFetching;

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition show={formStep === 'link'}>
        <div className="space-y-4">
          <Typography variant="h3">Add an artist</Typography>
          <Typography>Share an underground artist with the community. Start by pasting a link from any major platform.</Typography>

          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Paste artist profile URL..."
              value={initialUrl}
              onChange={(e) => setInitialUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
            />
            <Button
              onClick={() => initialUrl && fetchInitialArtist({ url: initialUrl })}
              disabled={!initialUrl || isLoading}
              className="w-full"
            >
              {isLoading ? <Icons.Loader className="w-4 h-4 animate-spin" /> : 'Continue'}
            </Button>
          </div>
        </div>
      </Transition>

      <Transition show={formStep === 'review'}>
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

            {PLATFORM_NAMES.filter((platform) => platform !== initialPlatform).map((platform) => (
              <PlatformMatcher
                key={platform}
                platform={platform}
                connectedPlatform={connectedPlatforms[platform]?.platformData ?? null}
                suggestedMatches={crossPlatformSearch.data?.[0]?.platformMatches.find((p) => p.platform === platform) ?? null}
                onConnect={(url) => connectPlatform({ url })}
                onDisconnect={() => handlePlatformDisconnect(platform)}
                isLoading={isConnecting}
                isSearching={isCrossPlatformSearching}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setFormStep('link')} variant="outline" className="flex items-center gap-2">
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
