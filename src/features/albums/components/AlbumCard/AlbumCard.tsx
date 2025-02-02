'use client';

import { Album } from '@/features/albums/types';
import { StatsSection } from '@/features/gems/components/GemCard/comps/StatsSection';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import Image from 'next/image';
import Link from 'next/link';
import { AlbumPlaceholder } from './comps/AlbumPlaceholder';
import { AlbumProperties } from './comps/AlbumProperties';

interface AlbumCardProps {
  album: Album;
  className?: string;
}

export function AlbumCard({ album, className }: AlbumCardProps) {
  const mainImage = album.properties.media?.coverImage;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white rounded-lg border flex flex-col border-gray-200 shadow-sm transition-all group hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div className="aspect-square overflow-hidden relative" role="img" aria-label={`Cover art for ${album.title}`}>
        {mainImage ? (
          <Image
            src={mainImage}
            alt={`${album.title} by ${album.artist.name}`}
            width={600}
            height={600}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        ) : (
          <AlbumPlaceholder />
        )}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded-full">
          <Typography variant="small" className="text-white flex items-center gap-1">
            <Icons.ListMusic className="w-4 h-4" />
            {album.properties.totalTracks} tracks
          </Typography>
        </div>
      </div>

      <Link href={`gem/album/${album.id}`} className="block p-4 flex-1 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="mb-2 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Typography variant="h4" className="line-clamp-1">
              {album.title}
            </Typography>
            <Typography variant="small" className="text-gray-500 uppercase">
              {album.type}
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            By {album.artist.name}
          </Typography>
        </div>

        <AlbumProperties album={album} />

        <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Tags">
          {album?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        <StatsSection likes={album.stats.likes} saves={album.stats.saves} />
      </Link>
    </div>
  );
}
