'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GemBase, GemPlatformName, MusicGem } from '@/features/gems/types/gemsTypes';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBandcamp, faSoundcloud, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

interface GemCardProps {
  gem: GemBase;
  className?: string;
}

function GemPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center w-full h-full',
        'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
        className,
      )}
      role="img"
      aria-label="No preview available"
    >
      <Icons.Sparkles size={120} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
      <Typography variant="small" className="mt-2 text-gray-500 dark:text-gray-400">
        No preview
      </Typography>
    </div>
  );
}

export function GemCard({ gem, className }: GemCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className={cn(
        'overflow-hidden relative bg-white rounded-lg border border-gray-200 shadow-sm transition-all group hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      {children}
      <Link href={`/gem/${gem.id}`} className="absolute inset-0">
        <span className="sr-only">View details for {gem.title}</span>
      </Link>
    </div>
  );

  const StatsSection = () => (
    <div className="flex justify-between items-center mt-4 text-sm" aria-label="Engagement stats">
      <div className="flex gap-4 items-center">
        <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500" aria-label={`Like this gem (${gem.likes} likes)`}>
          <Icons.Heart className="w-4 h-4" aria-hidden="true" />
          <span>{gem.likes}</span>
        </button>
        <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500" aria-label={`Save this gem (${gem.saves} saves)`}>
          <Icons.Bookmark className="w-4 h-4" aria-hidden="true" />
          <span>{gem.saves}</span>
        </button>
      </div>
    </div>
  );

  const mainImage = gem.properties.media.coverImage || gem.properties.media.images?.[0];

  function MusicProperties() {
    if (gem.type !== 'music') return null;
    const musicGem = gem as MusicGem;

    const iconsMap: Record<GemPlatformName, IconProp> = {
      bandcamp: faBandcamp,
      soundcloud: faSoundcloud,
      spotify: faSpotify,
      youtube: faYoutube,
      other: faLink,
    } as const;

    return (
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2" role="list" aria-label="Available platforms">
          {musicGem.properties.platforms.map((platform) => (
            <FontAwesomeIcon key={platform.url} icon={iconsMap[platform.name]} />
          ))}
        </div>

        {/* Properties tags section */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Music properties">
          {musicGem.properties.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs text-indigo-600 bg-indigo-50 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300"
              role="listitem"
            >
              {genre}
            </span>
          ))}
          {musicGem.properties.languages?.map((language) => (
            <span
              key={language}
              className="px-2 py-0.5 text-xs text-emerald-600 bg-emerald-50 rounded-full dark:bg-emerald-900/30 dark:text-emerald-300"
              role="listitem"
            >
              {language}
            </span>
          ))}
          {musicGem.properties.moods?.map((mood) => (
            <span
              key={mood}
              className="px-2 py-0.5 text-xs text-amber-600 bg-amber-50 rounded-full dark:bg-amber-900/30 dark:text-amber-300"
              role="listitem"
            >
              {mood}
            </span>
          ))}
          {musicGem.properties.lyrics?.map((lyric) => (
            <span
              key={lyric}
              className="px-2 py-0.5 text-xs text-rose-600 bg-rose-50 rounded-full dark:bg-rose-900/30 dark:text-rose-300"
              role="listitem"
            >
              {lyric}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <CardWrapper>
      <div
        className={cn('overflow-hidden', {
          'aspect-square': gem.type === 'music' || gem.type === 'craft',
        })}
        role="img"
        aria-label={`Preview image for ${gem.title}`}
      >
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
      </div>

      <div className="p-4">
        <div className="mb-2 space-y-1">
          <Typography variant="h4" className="line-clamp-1">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            By {gem.artist.name}
          </Typography>
        </div>

        <MusicProperties />

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

        <StatsSection />
      </div>
    </CardWrapper>
  );
}
