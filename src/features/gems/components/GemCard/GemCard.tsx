'use client';

import { MusicGem } from '@/features/gems/types';
import { LikeButton } from '@/features/shared/components/buttons/LikeButton';
import { CardError } from '@/features/shared/components/cards/CardError';
import { LoadingCard } from '@/features/shared/components/cards/LoadingCard';
import { Icons } from '@/features/shared/components/Icons';
import { MediaPreviewPlayer } from '@/features/shared/components/MediaPreviewPlayer/MediaPreviewPlayer';
import { CardWrapper } from '@/features/shared/components/transitions/CardWrapper';
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
  gem?: MusicGem;
  className?: string;
  index: number;
  isLoading?: boolean;
}

export function GemCard({ gem, className, index, isLoading }: GemCardProps) {
  const mainImage = gem?.properties.media?.coverImage || gem?.properties.media?.coverImage?.[0];
  const [showPreview, setShowPreview] = useState(false);

  if (!gem) {
    return <CardError type="gem" className={className} />;
  }

  if (isLoading) {
    return <LoadingCard index={index} className={className} variant="gem" />;
  }
  return (
    <CardWrapper index={index} className={className}>
      <div className={cn(`${showPreview ? '' : 'aspect-square'} overflow-hidden relative`)}>
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
    </CardWrapper>
  );
}
