'use client';

import { Artist } from '@/features/artists/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistPlaceholder } from './comps/ArtistPlaceholder';
import { ArtistProperties } from './comps/ArtistProperties';

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, className }: ArtistCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white rounded-lg border flex flex-col border-gray-200 shadow-sm transition-all group hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div className="relative">
        {artist.banner && (
          <div className="h-24 overflow-hidden">
            <Image src={artist.banner} alt={`${artist.name}'s banner`} width={400} height={100} className="object-cover w-full h-full" />
          </div>
        )}
        <div className={cn('relative px-4', artist.banner ? '-mt-12' : 'pt-4')}>
          <div className="aspect-square w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-sm">
            {artist.avatar ? (
              <Image
                src={artist.avatar}
                alt={artist.name}
                width={96}
                height={96}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            ) : (
              <ArtistPlaceholder />
            )}
          </div>
        </div>
      </div>

      <Link href={`/artist/${artist.id}`} className="block p-4 flex-1 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="mb-2 space-y-1">
          <div className="flex items-center gap-2">
            <Typography variant="h4" className="line-clamp-1">
              {artist.name}
            </Typography>
            {artist.metadata.verificationType && <Icons.BadgeCheck className="w-5 h-5 text-blue-500" aria-label="Verified artist" />}
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
            <span
              key={genre}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
              role="listitem"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <Typography variant="small" className="flex items-center gap-1">
            <Icons.Users className="w-4 h-4" />
            {artist.stats.followers.toLocaleString()} followers
          </Typography>
          {artist.stats.monthlyListeners && (
            <Typography variant="small" className="flex items-center gap-1">
              <Icons.Headphones className="w-4 h-4" />
              {artist.stats.monthlyListeners.toLocaleString()} monthly
            </Typography>
          )}
        </div>
      </Link>
    </div>
  );
}
