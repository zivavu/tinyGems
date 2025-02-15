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
import { OriginalArtistProfile } from './OriginalArtistProfile';
import { PlatformMatcher } from './PlatformMatcher';

interface ConnectedPlatform {
  platformId: string;
  name: string;
  thumbnailImageUrl?: string;
  url: string;
  platformData: ExternalPlatformArtistData;
}

interface ConnectedPlatforms {
  [platform: string]: ConnectedPlatform | null;
}

export function AddArtistForm() {
  const [step, setStep] = useState<'link' | 'review' | 'details'>('link');
  const [initialArtistUrl, setInitialArtistUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [firstPlatformArtist, setFirstPlatformArtist] = useState<{
    platform: PlatformType;
    data: ExternalPlatformArtistData;
  } | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatforms>({});

  const firstPlatformMutation = trpcReact.artistRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      setFirstPlatformArtist({
        platform: data.platform,
        data: data.artistData,
      });
      setConnectedPlatforms({
        [data.platform]: {
          platformId: data.artistData.platformId,
          name: data.artistData.name,
          thumbnailImageUrl: data.artistData.avatar,
          url: data.artistData.url,
          platformData: data.artistData,
        },
      });
      setStep('review');
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const otherPlatformsMutation = trpcReact.artistRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      setConnectedPlatforms((prev) => ({
        ...prev,
        [data.platform]: {
          platformId: data.artistData.platformId,
          name: data.artistData.name,
          thumbnailImageUrl: data.artistData.avatar,
          url: data.artistData.url,
          platformData: data.artistData,
        },
      }));
    },
  });

  async function handleUrlSubmit() {
    if (!initialArtistUrl) {
      toast.error('Please enter a valid URL');
      return;
    }
    setIsLoading(true);
    firstPlatformMutation.mutate({ url: initialArtistUrl });
  }

  const platforms: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal'];

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition show={step === 'link'}>
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
            <Button onClick={handleUrlSubmit} disabled={firstPlatformMutation.isPending} className="w-full">
              {firstPlatformMutation.isPending ? <Icons.Loader className="w-4 h-4 animate-spin" /> : 'Continue'}
            </Button>
          </div>
        </div>
      </Transition>

      <Transition show={step === 'review' && firstPlatformArtist !== null}>
        <div className="space-y-6">
          {firstPlatformArtist?.platform && firstPlatformArtist?.data && <OriginalArtistProfile artistData={firstPlatformArtist.data} />}

          {isLoading && (
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 animate-pulse" />
            </div>
          )}

          <div className="space-y-4">
            <Typography variant="h4">Connect platforms</Typography>
            {platforms
              .filter((platform) => platform !== firstPlatformArtist?.platform)
              .map((platform) => (
                <PlatformMatcher
                  key={platform}
                  platform={platform}
                  connectedPlatform={connectedPlatforms[platform]?.platformData}
                  onCustomUrlSubmit={(url) => otherPlatformsMutation.mutate({ url })}
                  isLoading={isLoading}
                />
              ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setStep('link')} variant="outline" className="flex items-center gap-2">
              <Icons.ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button
              onClick={() => setStep('details')}
              disabled={Object.keys(connectedPlatforms).length === 0}
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
