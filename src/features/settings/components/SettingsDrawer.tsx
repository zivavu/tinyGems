'use client';

import { PlatformType } from '@/features/gems/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlatformPreferences } from './PlatformPreferences';
import { UIPreferences } from './UIPreferences';

const platforms: {
  id: PlatformType;
  name: string;
}[] = [
  { id: 'spotify', name: 'Spotify' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'soundcloud', name: 'SoundCloud' },
  { id: 'bandcamp', name: 'Bandcamp' },
] as const;

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <DialogPanel className="w-full max-w-md transform bg-white shadow-xl transition-all dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-rose-100 dark:border-rose-900 p-6">
            <DialogTitle as={Typography} variant="h3">
              Settings
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close settings">
              <Icons.X className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            <div className="p-6 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Icons.Music className="h-5 w-5 text-rose-500" />
                  <Typography variant="h4">Platform Settings</Typography>
                </div>
                <PlatformPreferences platforms={platforms} />
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Icons.Monitor className="h-5 w-5 text-rose-500" />
                  <Typography variant="h4">Interface Settings</Typography>
                </div>
                <UIPreferences />
              </section>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
