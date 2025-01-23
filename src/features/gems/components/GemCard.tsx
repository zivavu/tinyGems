'use client';

import { GemBase } from '@/features/gems/types/gems';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
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
        'flex flex-col justify-center items-center w-full aspect-[3/2]',
        'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
        className,
      )}
      role="img"
      aria-label="No preview available"
    >
      <Icons.Image className="w-10 h-10 text-gray-400 dark:text-gray-500" aria-hidden="true" />
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

        {gem.artist.avatar && <Image src={gem.artist.avatar} alt="" width={64} height={64} className="object-cover" />}
      </div>
    </CardWrapper>
  );
}
