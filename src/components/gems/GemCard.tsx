'use client';

import { Icons } from '@/lib/Icons';
import { Gem, GemSource } from '@/lib/types/gems';
import { cn } from '@/lib/utils';
import { faBandcamp, faSoundcloud, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../ui/Typography';

interface GemCardProps {
  gem: Gem;
  className?: string;
}

export function GemCard({ gem, className }: GemCardProps) {
  if (gem.type === 'music') {
    return (
      <div
        className={cn(
          'overflow-hidden relative bg-white rounded-lg border border-gray-200 shadow-sm transition-all group hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
          className,
        )}
      >
        <div className="overflow-hidden aspect-square">
          {gem.albumArt ? (
            <Image
              src={gem.albumArt}
              alt={`${gem.title} album art`}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex justify-center items-center h-full bg-gray-100 dark:bg-gray-800">
              <Icons.Music className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex gap-2 items-center mb-2">
            <div className="flex-1">
              <Typography variant="h4" className="line-clamp-1">
                {gem.title}
              </Typography>
              <Typography variant="small" className="text-gray-500 line-clamp-1">
                {gem.artist.name}
              </Typography>
            </div>
            <SourceIcon source={gem.source} />
          </div>

          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex gap-4 items-center">
              <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500">
                <Icons.Heart className="w-4 h-4" />
                <span>{gem.likes}</span>
              </button>
              <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500">
                <Icons.Bookmark className="w-4 h-4" />
                <span>{gem.saves}</span>
              </button>
            </div>
            <Typography variant="small" className="text-gray-500">
              {gem.duration}
            </Typography>
          </div>
        </div>

        <Link href={`/gem/${gem.id}`} className="absolute inset-0">
          <span className="sr-only">View details for {gem.title}</span>
        </Link>
      </div>
    );
  }

  // Add more gem type renderers here
  return null;
}

function SourceIcon({ source }: { source: GemSource }) {
  if (source === 'other') {
    return <Icons.Link className="w-4 h-4 text-gray-400" />;
  }

  return (
    <FontAwesomeIcon
      icon={
        source === 'bandcamp'
          ? faBandcamp
          : source === 'spotify'
            ? faSpotify
            : source === 'soundcloud'
              ? faSoundcloud
              : source === 'youtube'
                ? faYoutube
                : faBandcamp // fallback
      }
      className={cn(
        'w-4 h-4',
        {
          'text-[#1DA0C3]': source === 'bandcamp',
          'text-[#1DB954]': source === 'spotify',
          'text-[#FF3300]': source === 'soundcloud',
          'text-[#FF0000]': source === 'youtube',
        },
        'transition-opacity opacity-75 hover:opacity-100',
      )}
    />
  );
}
