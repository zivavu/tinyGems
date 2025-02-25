'use client';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConnectPlatformsStep } from './steps/ConnectPlatformsStep';
import { InitialUrlStep } from './steps/InitialUrlStep';

enum FormStep {
  INITIAL_URL = 'initial_url',
  CONNECT_PLATFORMS = 'connect_platforms',
}

export function AddArtistForm() {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.INITIAL_URL);
  const [artistData, setArtistData] = useState<ExternalPlatformArtistData | null>(null);

  function handleInitialStepComplete(data: { platform: string; artistData: unknown }) {
    setArtistData(data.artistData as ExternalPlatformArtistData);
    setFormStep(FormStep.CONNECT_PLATFORMS);
  }

  function handleGoBack() {
    setFormStep(FormStep.INITIAL_URL);
  }

  function handleComplete(mergedArtistData: ExternalPlatformArtistData) {
    toast.success('Artist added successfully!', {
      description: `${mergedArtistData.name} has been added to the platform.`,
    });

    setFormStep(FormStep.INITIAL_URL);
    setArtistData(null);
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                formStep === FormStep.INITIAL_URL
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400'
              }`}
            >
              {formStep === FormStep.INITIAL_URL ? <span className="text-sm font-semibold">1</span> : <Icons.Check className="w-4 h-4" />}
            </div>
            <Typography className="font-medium">Find Artist</Typography>

            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />

            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                formStep === FormStep.CONNECT_PLATFORMS ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              <span className="text-sm font-semibold">2</span>
            </div>
            <Typography
              className={`font-medium ${
                formStep === FormStep.CONNECT_PLATFORMS ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Connect Platforms
            </Typography>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          <div
            className={`transition-opacity duration-300 ${
              formStep === FormStep.INITIAL_URL ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            <InitialUrlStep onContinue={handleInitialStepComplete} />
          </div>

          <div
            className={`transition-opacity duration-300 ${
              formStep === FormStep.CONNECT_PLATFORMS ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            {artistData && <ConnectPlatformsStep artistData={artistData} onPrevious={handleGoBack} onComplete={handleComplete} />}
          </div>
        </div>
      </div>
    </div>
  );
}
