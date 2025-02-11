'use client';

import { Artist } from '@/features/artists/types';
import { LikeButton } from '@/features/shared/components/buttons/LikeButton';
import { CardError } from '@/features/shared/components/cards/CardError';
import { Icons } from '@/features/shared/components/Icons';
import { CardWrapper } from '@/features/shared/components/transitions/CardWrapper';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistPlaceholder } from './ArtistPlaceholder';
import { ArtistProperties } from './ArtistProperties';

interface ArtistCardProps {
  artist: Artist;
  className?: string;
  index: number;
  isLoading?: boolean;
}

export function ArtistCard({ artist, className, index }: ArtistCardProps) {
  if (!artist) {
    return <CardError type="artist" className={className} />;
  }

  return (
    <CardWrapper index={index} className={className}>
      <div className="relative">
        {artist.banner ? (
          <div className="h-36 overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image src={artist.banner} alt={`${artist.name}'s banner`} width={400} height={100} className="object-cover w-full h-full" />
            </motion.div>
          </div>
        ) : (
          <div className="h-36 bg-gray-100 dark:bg-gray-800/50" />
        )}
        <div className={cn('relative px-4', artist.banner ? '-mt-12' : 'pt-4')}>
          <div className="aspect-square w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-sm">
            {artist.avatar ? (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image src={artist.avatar} alt={artist.name} width={96} height={96} className="object-cover w-full h-full" />
              </motion.div>
            ) : (
              <ArtistPlaceholder />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <LikeButton id={artist.id} type="artist" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-gray-500 hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30"
            aria-label="Share artist"
          >
            <Icons.Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full text-gray-500 hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30"
            aria-label="Hide from feed"
          >
            <Icons.EyeOff className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <Link href={`/artist/${artist.id}`} className="block p-4 flex-1">
        <div className="mb-2 space-y-1">
          <div className="flex items-center gap-2">
            <Typography variant="h4" className="line-clamp-1">
              {artist.name}
            </Typography>
          </div>
          {artist.location?.country && (
            <Typography variant="small" className="text-gray-500 flex items-center gap-1">
              <Icons.MapPin className="w-4 h-4" />
              {artist.location.city ? `${artist.location.city}, ${artist.location.country}` : artist.location.country}
            </Typography>
          )}
        </div>

        <ArtistProperties artist={artist} />

        <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Tags">
          {artist.genres.slice(0, 3).map((genre) => (
            <motion.span
              key={genre}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
              role="listitem"
            >
              {genre}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <Typography variant="small" className="flex items-center gap-1">
            <Icons.Users className="w-4 h-4" />
            {artist.stats.followers} followers
          </Typography>
          {artist.stats.monthlyListeners && (
            <Typography variant="small" className="flex items-center gap-1">
              <Icons.Headphones className="w-4 h-4" />
              {artist.stats.monthlyListeners} monthly
            </Typography>
          )}
        </div>
      </Link>
    </CardWrapper>
  );
}
