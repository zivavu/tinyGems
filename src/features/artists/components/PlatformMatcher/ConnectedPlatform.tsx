import { PlatformType } from '@/features/gems/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

interface ConnectedPlatformProps {
  connectedPlatform: ExternalPlatformArtistData;
  platform: PlatformType;
  onDisconnect: () => void;
}

export function ConnectedPlatform({ connectedPlatform, platform, onDisconnect }: ConnectedPlatformProps) {
  return (
    <Transition show={true} enter="transition-all duration-300" enterFrom="opacity-0 translate-y-2" enterTo="opacity-100 translate-y-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {connectedPlatform.avatar ? (
            <Image src={connectedPlatform.avatar} alt={connectedPlatform.name} width={40} height={40} className="rounded-md object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Icons.Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <Typography variant="h6">{connectedPlatform.name}</Typography>
            <Typography variant="small" className="text-gray-500">
              Connected to {platform}
            </Typography>
          </div>
          <Icons.Check className="w-5 h-5 text-green-500" />
        </div>
        <Button onClick={onDisconnect} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Icons.Unlink className="w-4 h-4" />
        </Button>
      </div>
    </Transition>
  );
}
