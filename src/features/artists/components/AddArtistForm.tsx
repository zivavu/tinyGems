'use client';

import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { MatchingSchema } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { PlatformArtistData } from '@/server/features/platforms/externalArtistData/types';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { OriginalArtistProfile } from './OriginalArtistProfile';
import { PlatformMatcher } from './PlatformMatcher';
import { ProgressIndicator } from './ProgressIndicator';

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

interface SelectedMatches {
  [platform: string]: {
    platformId: string;
    name: string;
    thumbnailImageUrl?: string;
    customUrl?: string;
  } | null;
}

const keyframes = {
  indeterminate: `
    @keyframes indeterminate {
      0% { left: -35%; right: 100% }
      60% { left: 100%; right: -90% }
      100% { left: 100%; right: -90% }
    }
  `,
  indeterminateShort: `
    @keyframes indeterminate-short {
      0% { left: -200%; right: 100% }
      60% { left: 107%; right: -8% }
      100% { left: 107%; right: -8% }
    }
  `,
};

// Add the keyframes to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = keyframes.indeterminate + keyframes.indeterminateShort;
  document.head.appendChild(style);
}

export function AddArtistForm() {
  const [step, setStep] = useState<'link' | 'review' | 'details'>('link');
  const [url, setUrl] = useState('');
  const [artistData, setArtistData] = useState<PlatformArtistData | null>(null);
  const [selectedMatches, setSelectedMatches] = useState<SelectedMatches>({});
  const [platformStatuses, setPlatformStatuses] = useState<PlatformStatuses>({
    spotify: { status: 'idle' },
    soundcloud: { status: 'idle' },
    youtube: { status: 'idle' },
    tidal: { status: 'idle' },
  });

  const fetchArtistMutation = trpcReact.artistRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      setArtistData(data.artistData);
      handleInitialPlatformMatch(data);
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
      setPlatformStatuses((current) => ({
        ...current,
        ...platformResults,
      }));
    },
    onError: (error) => {
      toast.error(error.message);
      handleSearchError();
    },
  });

  function handleInitialPlatformMatch(data: { platform: Platform; artistData: PlatformArtistData }) {
    const newStatuses = Object.keys(platformStatuses).reduce((acc, platform) => {
      acc[platform] =
        platform === data.platform
          ? {
              status: 'found',
              matches: [
                {
                  platformId: data.artistData.platformId,
                  name: data.artistData.name,
                  thumbnailImageUrl: data.artistData.avatar,
                  confidence: 1,
                },
              ],
            }
          : { status: 'searching' };
      return acc;
    }, {} as PlatformStatuses);

    setPlatformStatuses(newStatuses);
    setSelectedMatches({
      [data.platform]: {
        platformId: data.artistData.platformId,
        name: data.artistData.name,
        thumbnailImageUrl: data.artistData.avatar,
      },
    });
  }

  function handleSearchError() {
    setPlatformStatuses((current) => {
      const newStatuses = { ...current };
      Object.keys(newStatuses).forEach((platform) => {
        if (newStatuses[platform].status === 'searching') {
          newStatuses[platform] = { status: 'error' };
        }
      });
      return newStatuses;
    });
  }

  function handleMatchSelect(platform: string, match: MatchingSchema['matches'][0]['platformMatches'][0]['matches'][0] | null) {
    setSelectedMatches((prev) => ({
      ...prev,
      [platform]: match,
    }));
  }

  async function handleUrlSubmit() {
    if (!url) {
      toast.error('Please enter a valid URL');
      return;
    }
    console.log('url', url);
    fetchArtistMutation.mutate({ url });
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition show={step === 'link'}>
        <div className="space-y-4">
          <Typography variant="h3">Add an artist</Typography>
          <Typography>Share an underground artist with the community. Start by pasting a link from any major platform.</Typography>

          <div className="space-y-2">
            <input
              type="url"
              placeholder="Paste artist profile URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
            />
            <Button onClick={handleUrlSubmit} disabled={fetchArtistMutation.isPending} className="w-full">
              {fetchArtistMutation.isPending ? <Icons.Loader className="w-4 h-4 animate-spin" /> : 'Continue'}
            </Button>
          </div>
        </div>
      </Transition>

      <Transition show={step === 'review' && artistData !== null}>
        <div className="space-y-6">
          {artistData && <OriginalArtistProfile artistData={artistData} />}
          <ProgressIndicator platformStatuses={platformStatuses} />

          <div className="space-y-4">
            <Typography variant="h4">Connect platforms</Typography>
            {Object.entries(platformStatuses)
              .filter(([platform]) => platform !== artistData?.platform)
              .map(([platform, status]) => (
                <PlatformMatcher
                  key={platform}
                  platform={platform}
                  status={status}
                  selectedMatch={selectedMatches[platform]}
                  onMatchSelect={handleMatchSelect}
                  onCustomUrlSubmit={(url) => fetchArtistMutation.mutate({ url })}
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
              disabled={Object.keys(selectedMatches).length === 0}
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
