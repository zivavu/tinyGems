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

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm">
      <Transition as={'div'} show={formStep === 'initialLink'}>
        <InitialUrlStep onContinue={() => setFormStep('review')} />
      </Transition>

      <Transition show={formStep === 'review'}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="h4">Connect other platforms</Typography>
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setFormStep('initialLink')} variant="outline" className="flex items-center gap-2">
              <Icons.ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button className="flex items-center gap-2">
              <Icons.ArrowRight className="w-5 h-5" />
              Continue
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
