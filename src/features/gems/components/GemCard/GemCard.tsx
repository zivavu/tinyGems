'use client';

import { MusicGem } from '@/features/gems/types/gemsTypes';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import { Button } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GemPlaceholder } from './comps/GemPlaceholder';
import { MusicProperties } from './comps/MusicProperties';
import { PlatformPreview } from './comps/PlatformPreview';
import { StatsSection } from './comps/StatsSection';

interface GemCardProps {
  gem: MusicGem;
  className?: string;
}

export function GemCard({ gem, className }: GemCardProps) {
  const mainImage = gem.properties.media.coverImage || gem.properties.media.images?.[0];
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white rounded-lg border flex flex-col border-gray-200 shadow-sm transition-all group hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div className={cn(`${showPreview ? '' : 'aspect-square'} relative`)} role="img" aria-label={`Preview image for ${gem.title}`}>
        {showPreview ? (
          <PlatformPreview gem={gem} />
        ) : (
          <>
            {mainImage ? (
              <Image
                src={mainImage}
                alt={`${gem.title} by ${gem.artist.name}`}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            ) : (
              <GemPlaceholder />
            )}
            {gem.type === 'music' && gem.properties.platforms.length > 0 && (
              <Button
                onClick={() => {
                  setShowPreview(true);
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                aria-label="Play preview"
              >
                <Icons.Play className="w-12 h-12 text-white" />
              </Button>
            )}
          </>
        )}
      </div>

      <Link href={`/gem/${gem.id}`} className="block p-4 flex-1 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="mb-2 space-y-1">
          <Typography variant="h4" className="line-clamp-1">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            By {gem.artist.name}
          </Typography>
        </div>

        <MusicProperties gem={gem} />

        <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Tags">
          {gem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        <StatsSection likes={gem.likes} saves={gem.saves} />
      </Link>
    </div>
  );
}
