'use client';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { InitialUrlStep } from './steps/InitialUrlStep';

type FormStep = 'initialLink' | 'review';

export function AddArtistForm() {
  const [formStep, setFormStep] = useState<FormStep>('initialLink');
  const [artistData, setArtistData] = useState<{ platform: string; artistData: unknown } | null>(null);

  function handleInitialStepComplete(data: { platform: string; artistData: unknown }) {
    setArtistData(data);
    setFormStep('review');
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
      {/* Header with step indicator */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="mb-1">
            Add an artist
          </Typography>
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                formStep === 'initialLink'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              }`}
            >
              1
            </div>
            <div className={`w-8 h-[2px] ${formStep === 'review' ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                formStep === 'review' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              2
            </div>
          </div>
        </div>
        <Typography className="text-gray-600 dark:text-gray-400 text-sm">
          {formStep === 'initialLink'
            ? 'Share an underground artist with the community. Start by pasting a link.'
            : 'Review the artist details and connect to other platforms if needed.'}
        </Typography>
      </div>

      <Transition
        as="div"
        show={formStep === 'initialLink'}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <InitialUrlStep onContinue={handleInitialStepComplete} />
      </Transition>

      <Transition
        as="div"
        show={formStep === 'review'}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <Typography variant="small" className="flex items-center gap-2">
              <Icons.Info className="w-4 h-4 text-gray-500" />
              <span>
                Artist found on <span className="font-semibold">{artistData?.platform}</span>. Connect to other platforms to improve
                discovery.
              </span>
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['spotify', 'soundcloud', 'youtube', 'tidal'].map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className="py-2.5 h-auto justify-start gap-2"
                disabled={platform === artistData?.platform.toLowerCase()}
              >
                {platform === artistData?.platform.toLowerCase() ? (
                  <>
                    <Icons.Check className="w-4 h-4 text-green-500" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <Icons.Search className="w-4 h-4" />
                    <span>Find on {platform}</span>
                  </>
                )}
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button onClick={() => setFormStep('initialLink')} variant="outline" className="flex items-center gap-1 py-2">
              <Icons.ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button className="flex items-center gap-1 py-2">
              <Icons.Check className="w-4 h-4" />
              Submit
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
