'use client';

import { MusicGem } from '@/features/gems/types';
import { LikeButton } from '@/features/shared/components/buttons/LikeButton';
import { Icons } from '@/features/shared/components/Icons';
import { MediaPreviewPlayer } from '@/features/shared/components/MediaPreviewPlayer/MediaPreviewPlayer';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GemPlaceholder } from './GemPlaceholder';
import { MusicProperties } from './MusicProperties';
import { StatsSection } from './StatsSection';

interface GemCardProps {
  gem: MusicGem;
  className?: string;
}

export function GemCard({ gem, className }: GemCardProps) {
  const mainImage = gem?.properties.media?.coverImage || gem?.properties.media?.coverImage?.[0];
  const [showPreview, setShowPreview] = useState(false);

  if (!gem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-white dark:bg-gray-900 rounded-lg border flex flex-col border-rose-200 dark:border-rose-800 shadow-sm"
      >
        <div className="aspect-square bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
          <Icons.AlertTriangle className="w-12 h-12 text-rose-500" />
        </div>
        <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
          <Typography variant="h4" className="mb-2 text-rose-500">
            Oops! Something went wrong
          </Typography>
          <Typography variant="small" className="text-gray-500 max-w-[80%]">
            We couldn&apos;t load this gem. Please try refreshing the page or come back later.
          </Typography>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden bg-white rounded-lg border flex flex-col border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div
        className={cn(`${showPreview ? '' : 'aspect-square'} overflow-hidden relative`)}
        role="img"
        aria-label={`Preview image for ${gem.title}`}
      >
        {showPreview ? (
          <MediaPreviewPlayer media={gem} type="gem" />
        ) : (
          <>
            {mainImage ? (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src={mainImage}
                  alt={`${gem.title} by ${gem.artist.name}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ) : (
              <GemPlaceholder />
            )}
            {gem?.properties?.platforms?.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={() => setShowPreview(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50"
                aria-label="Play preview"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Icons.Play className="w-12 h-12 text-white" />
                </motion.div>
              </motion.button>
            )}
          </>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <LikeButton id={gem.id} type="song" />
      </div>

      <motion.div
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
        className="block p-4 flex-1 dark:hover:bg-gray-800/50 transition-colors"
      >
        <Link href={`/gem/song/${gem.id}`} className="block">
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
            {gem?.tags?.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
                role="listitem"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <StatsSection totalLikes={gem?.likes?.total} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
