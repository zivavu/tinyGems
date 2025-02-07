'use client';

import { Typography } from '@/features/shared/components/Typography';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

export function UIPreferences() {
  const [landingAnimation, setLandingAnimation] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch
          checked={landingAnimation}
          onChange={setLandingAnimation}
          className={`${
            landingAnimation ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              landingAnimation ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <div>
          <Typography className="font-medium">Landing Page Particles</Typography>
          <Typography variant="small" className="text-gray-500">
            Show the background particles on the landing page
          </Typography>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Switch
          checked={reduceMotion}
          onChange={setReduceMotion}
          className={`${
            reduceMotion ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              reduceMotion ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <div>
          <Typography className="font-medium">Reduce Motion</Typography>
          <Typography variant="small" className="text-gray-500">
            Minimize animations throughout the app
          </Typography>
        </div>
      </div>
    </div>
  );
}
