'use client';

import { GemBase } from '@/features/gems/types/gemsTypes';
import { Icons } from '@/features/shared/components/Icons';
import { cn } from '@/features/shared/utils/dummy/utils';
import Image from 'next/image';

interface GemMediaProps {
  gem: GemBase;
  className?: string;
}

export function GemMedia({ gem, className }: GemMediaProps) {
  const { media } = gem.properties;
  const mainImage = media.coverImage || media.images?.[0];

  if (!mainImage) {
    return (
      <div className={cn('bg-gray-900 aspect-[2/1]', className)} role="img" aria-label={`${gem.type} placeholder`}>
        <div className="flex justify-center items-center h-full">
          <Icons.Sparkles className="w-20 h-20 text-white/20" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative bg-gray-900 aspect-[2/1]', className)} role="img" aria-label={`${gem.title} preview`}>
      <Image src={mainImage} alt={`${gem.title} by ${gem.artist.name}`} fill className="object-cover" />
    </div>
  );
}
