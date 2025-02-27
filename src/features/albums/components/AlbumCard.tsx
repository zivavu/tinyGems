'use client';

import { Album } from '@/features/albums/types';
import { LikeButton } from '@/features/shared/components/buttons/LikeButton';
import { CardError } from '@/features/shared/components/cards/CardError';
import { Icons } from '@/features/shared/components/Icons';
import { CardWrapper } from '@/features/shared/components/transitions/CardWrapper';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  album?: Album;
  className?: string;
  index: number;
}

export function AlbumCard({ album, className, index }: AlbumCardProps) {
  if (!album) {
    return <CardError type="album" className={className} />;
  }

  return (
    <CardWrapper index={index} className={cn('bg-card-background border border-card-border rounded-lg', className)}>
      <div className="aspect-square overflow-hidden relative">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image
            src={album.properties.media.coverImage || '/images/album-placeholder.jpg'}
            alt={`${album.title} by ${album.artist.name}`}
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b border-card-border">
        <div className="flex items-center gap-2">
          <LikeButton itemId={album.id} type="album" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-text-subtle hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30"
            aria-label="Add to playlist"
          >
            <Icons.ListPlus className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-text-subtle hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30"
            aria-label="Share album"
          >
            <Icons.Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-text-subtle hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30"
            aria-label="Hide from feed"
          >
            <Icons.EyeOff className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <motion.div
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
        className="block p-4 flex-1 hover:bg-card-hover transition-colors"
      >
        <Link href={`/album/${album.id}`} className="block">
          <div className="mb-2 space-y-1">
            <Typography variant="h4" className="line-clamp-1">
              {album.title}
            </Typography>
            <Typography variant="small" className="text-text-muted line-clamp-1">
              By {album.artist.name}
            </Typography>
          </div>

          <div className="mb-2">
            <Typography variant="small" className="text-text-muted">
              {new Date(album.metadata.releaseDate).toLocaleDateString()}
            </Typography>
          </div>

          <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Tags">
            {album?.tags?.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-0.5 text-xs text-card-tag-text bg-card-tag-bg rounded-full"
                role="listitem"
              >
                {tag}
              </motion.span>
            ))}
            {album.properties.genres.map((genre) => (
              <motion.span
                key={genre}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-0.5 text-xs text-card-tag-text bg-card-tag-bg rounded-full"
                role="listitem"
              >
                {genre}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Icons.Heart className="w-4 h-4 text-text-muted" />
              <Typography variant="small" className="text-text-muted">
                {album.likes.total}
              </Typography>
            </div>
          </div>
        </Link>
      </motion.div>
    </CardWrapper>
  );
}
