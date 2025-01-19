'use client';

import { Icons } from '@/lib/Icons';
import { Gem, isMusicGem, isVideoGem } from '@/lib/types/gems';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GemMediaProps {
  gem: Gem;
  className?: string;
}

export function GemMedia({ gem, className }: GemMediaProps) {
  // Music gems show album art
  if (isMusicGem(gem)) {
    return (
      <div className={cn('bg-gray-900 aspect-[2/1]', className)}>
        <div className="flex justify-center items-center mx-auto max-w-screen-lg h-full">
          {gem.properties.albumArt ? (
            <Image src={gem.properties.albumArt} alt={gem.title} width={400} height={400} className="shadow-2xl aspect-square" />
          ) : (
            <Icons.Music className="w-20 h-20 text-white/20" />
          )}
        </div>
      </div>
    );
  }

  // Video gems show video thumbnail
  if (isVideoGem(gem)) {
    return (
      <div className={cn('bg-gray-900 aspect-video', className)}>
        {gem.properties.coverImage ? (
          <Image src={gem.properties.coverImage} alt={gem.title} fill className="object-cover" />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Icons.Video className="w-20 h-20 text-white/20" />
          </div>
        )}
      </div>
    );
  }

  // Default media display for other types
  return (
    <div className={cn('bg-gray-900 aspect-[2/1]', className)}>
      {gem.type === 'art' || gem.type === 'craft' || gem.type === 'photography' ? (
        gem.properties.images?.[0] ? (
          <Image src={gem.properties.images[0]} alt={gem.title} fill className="object-cover" />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Icons.Image className="w-20 h-20 text-white/20" />
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-full">
          <Icons.FileText className="w-20 h-20 text-white/20" />
        </div>
      )}
    </div>
  );
}
