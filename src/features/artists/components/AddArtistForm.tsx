'use client';

import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { PlatformArtistData } from '@/server/features/platforms/externalArtistData/types';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export function AddArtistForm() {
  const [step, setStep] = useState<'link' | 'review' | 'details'>('link');
  const [url, setUrl] = useState('');
  const [artistData, setArtistData] = useState<PlatformArtistData | null>(null);

  const fetchArtistMutation = trpcReact.artistRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      setArtistData(data.artistData);
      setStep('review');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleUrlSubmit() {
    if (!url) {
      toast.error('Please enter a valid URL');
      return;
    }

    fetchArtistMutation.mutate({ url });
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
            <div>
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
