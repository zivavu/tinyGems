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
  platformId: string;
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

  const initialArtistQuery = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery({ url: initialArtistUrl }, { enabled: false });

  const initialPlatform = Object.entries(connectedPlatforms).find(([, data]) => data !== null)?.[0] as PlatformType;
  const crossPlatformSearchQuery = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: connectedPlatforms[initialPlatform]?.name || '' },
    { enabled: Boolean(connectedPlatforms[initialPlatform]?.name) },
  );

  // Handle URL submission
  async function handleUrlSubmit() {
    if (!initialArtistUrl) {
      toast.error('Please enter a valid URL');
      return;
    }

    const result = await initialArtistQuery.refetch();

    if (result.data) {
      setConnectedPlatforms((prev) => ({
        ...prev,
        [result.data.platform]: {
          platformId: result.data.artistData.platformId,
          name: result.data.artistData.name,
          thumbnailImageUrl: result.data.artistData.avatar,
          url: result.data.artistData.links?.[result.data.platform] || '',
          platformData: result.data.artistData,
        },
      }));
      setCurrentFormStep('review');
    }
  }

  // Handle connecting additional platforms
  const connectPlatformQuery = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery({ url: '' }, { enabled: false });

  async function handlePlatformConnect(url: string) {
    const result = await connectPlatformQuery.refetch({});

    if (result.data) {
      setConnectedPlatforms((prev) => ({
        ...prev,
        [result.data.platform]: {
          platformId: result.data.artistData.platformId,
          name: result.data.artistData.name,
          thumbnailImageUrl: result.data.artistData.avatar,
          url: result.data.artistData.links?.[result.data.platform] || '',
          platformData: result.data.artistData,
        },
      }));
      toast.success(`Connected ${result.data.platform} profile`);
    }
  }

  // Derive loading states - only consider isFetching since we're using enabled: false
  const isLoading = initialArtistQuery.isFetching || connectPlatformQuery.isFetching;

  const platforms: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal'];

  // Separate loading states for initial cross-platform search and connecting platforms
  const isCrossPlatformSearching = crossPlatformSearchQuery.isFetching;
  const isConnectingPlatform = connectPlatformQuery.isFetching;

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
          {initialPlatform && connectedPlatforms[initialPlatform]?.platformData && (
            <UserProvidedURLArtistProfile artistData={connectedPlatforms[initialPlatform].platformData} />
          )}

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
                  suggestedMatches={crossPlatformSearchQuery.data?.[0]?.platformMatches.find((p) => p.platform === platform)}
                  onConnect={handlePlatformConnect}
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
