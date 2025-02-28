'use client';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConnectPlatformsStep } from './steps/ConnectPlatformsStep';
import { FindArtistStep } from './steps/FindArtistStep';
import { SummarizeStep } from './steps/SummarizeStep/SummarizeStep';

enum FormStep {
  FIND_ARTIST = 'find_artist',
  CONNECT_PLATFORMS = 'connect_platforms',
  SUMMARIZE = 'summarize',
}

type ConnectedPlatform = {
  name: string;
  platformId: string;
  avatar?: string;
};

type ConnectedPlatformsRecord = Record<string, ConnectedPlatform>;

export function AddArtistForm() {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.FIND_ARTIST);
  const [artistData, setArtistData] = useState<ExternalPlatformArtistData | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatformsRecord>({});

  function handleInitialStepComplete(data: { platform: string; artistData: unknown }) {
    setArtistData(data.artistData as ExternalPlatformArtistData);
    setFormStep(FormStep.CONNECT_PLATFORMS);
  }

  function handleConnectComplete(mergedArtistData: ExternalPlatformArtistData, platforms: ConnectedPlatformsRecord) {
    setArtistData(mergedArtistData);
    setConnectedPlatforms(platforms);
    setFormStep(FormStep.SUMMARIZE);
  }

  function handleSummarizeComplete(finalArtistData: ExternalPlatformArtistData) {
    toast.success('Artist added successfully!', {
      description: `${finalArtistData.name} has been added to the platform.`,
    });

    // Reset form state
    setFormStep(FormStep.FIND_ARTIST);
    setArtistData(null);
    setConnectedPlatforms({});
  }

  function handleGoBackToFind() {
    setFormStep(FormStep.FIND_ARTIST);
  }

  function handleGoBackToConnect() {
    setFormStep(FormStep.CONNECT_PLATFORMS);
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Step 1 */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                formStep === FormStep.FIND_ARTIST
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400'
              }`}
            >
              {formStep === FormStep.FIND_ARTIST ? <span className="text-sm font-semibold">1</span> : <Icons.Check className="w-4 h-4" />}
            </div>
            <Typography className="font-medium">Find Artist</Typography>

            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />

            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                formStep === FormStep.CONNECT_PLATFORMS
                  ? 'bg-blue-600 text-white'
                  : formStep === FormStep.SUMMARIZE
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              {formStep === FormStep.SUMMARIZE ? <Icons.Check className="w-4 h-4" /> : <span className="text-sm font-semibold">2</span>}
            </div>
            <Typography
              className={`font-medium ${
                formStep === FormStep.CONNECT_PLATFORMS || formStep === FormStep.SUMMARIZE
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Connect Platforms
            </Typography>

            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />

            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                formStep === FormStep.SUMMARIZE ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              <span className="text-sm font-semibold">3</span>
            </div>
            <Typography
              className={`font-medium ${
                formStep === FormStep.SUMMARIZE ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Finalize
            </Typography>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          <div
            className={`transition-opacity duration-300 ${
              formStep === FormStep.FIND_ARTIST ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            <FindArtistStep onContinue={handleInitialStepComplete} />
          </div>

          <div
            className={`transition-opacity duration-300 ${
              formStep === FormStep.CONNECT_PLATFORMS ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            {artistData && (
              <ConnectPlatformsStep artistData={artistData} onPrevious={handleGoBackToFind} onComplete={handleConnectComplete} />
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${
              formStep === FormStep.SUMMARIZE ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
            }`}
          >
            {artistData && (
              <SummarizeStep
                artistData={artistData}
                connectedPlatforms={connectedPlatforms}
                onPrevious={handleGoBackToConnect}
                onComplete={handleSummarizeComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
