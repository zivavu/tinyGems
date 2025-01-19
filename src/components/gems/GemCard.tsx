'use client';

import { Icons } from '@/lib/Icons';
import {
  Gem,
  GemSource,
  GemType,
  isArtGem,
  isContentGem,
  isCraftGem,
  isMusicGem,
  isPhotographyGem,
  isVideoGem,
  isWordsGem,
} from '@/lib/types/gems';
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

// Add a reusable placeholder component with specific styles per type
function GemPlaceholder({ type, className }: { type: GemType; className?: string }) {
  const config = {
    music: {
      icon: Icons.Music,
      text: 'No music preview',
      aspect: 'aspect-square',
      gradient: 'from-rose-50/50 to-rose-100/50 dark:from-rose-900/20 dark:to-rose-800/20',
    },
    art: {
      icon: Icons.Image,
      text: 'No artwork preview',
      aspect: 'aspect-[4/3]',
      gradient: 'from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    craft: {
      icon: Icons.Hammer,
      text: 'No craft preview',
      aspect: 'aspect-square',
      gradient: 'from-amber-50/50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20',
    },
    photography: {
      icon: Icons.Camera,
      text: 'No photo preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-emerald-50/50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20',
    },
    video: {
      icon: Icons.Video,
      text: 'No video preview',
      aspect: 'aspect-video',
      gradient: 'from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20',
    },
    content: {
      icon: Icons.FileText,
      text: 'No content preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
    },
    words: {
      icon: Icons.FileText,
      text: 'No preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
    },
  }[type];

  return (
    <div className={cn('flex flex-col justify-center items-center w-full', 'bg-gradient-to-br', config.gradient, config.aspect, className)}>
      <config.icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      <Typography variant="small" className="mt-2 text-gray-500 dark:text-gray-400">
        {config.text}
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

  // Common stats section
  const StatsSection = () => (
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
    </div>
  );

  // Music Gem Card
  if (isMusicGem(gem)) {
    return (
      <CardWrapper>
        <div className="overflow-hidden aspect-square">
          {gem.properties.albumArt ? (
            <Image
              src={gem.properties.albumArt}
              alt={`${gem.title} album art`}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <GemPlaceholder type="music" />
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
            <SourceIcon source={gem.properties.source} />
          </div>
          <StatsSection />
          <Typography variant="small" className="text-gray-500">
            {gem.properties.duration}
          </Typography>
        </div>
      </CardWrapper>
    );
  }

  // Art/Photography Gem Card
  if (isArtGem(gem) || isPhotographyGem(gem)) {
    return (
      <CardWrapper>
        <div className="overflow-hidden aspect-[3/2]">
          {gem.properties.images[0] ? (
            <Image
              src={gem.properties.images[0]}
              alt={gem.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <GemPlaceholder type={gem.type} />
          )}
        </div>

        <div className="p-4">
          <Typography variant="h4" className="mb-1 line-clamp-1">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            {gem.artist.name}
          </Typography>
          <div className="flex flex-wrap gap-1 mt-2">
            {gem.properties.medium.map((medium) => (
              <span key={medium} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                {medium}
              </span>
            ))}
          </div>
          <StatsSection />
        </div>
      </CardWrapper>
    );
  }

  // Craft Gem Card
  if (isCraftGem(gem)) {
    return (
      <CardWrapper>
        <div className="overflow-hidden aspect-square">
          {gem.properties.images[0] ? (
            <Image
              src={gem.properties.images[0]}
              alt={gem.title}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <GemPlaceholder type="craft" />
          )}
        </div>

        <div className="p-4">
          <Typography variant="h4" className="mb-1 line-clamp-1">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            {gem.artist.name}
          </Typography>
          <div className="flex flex-wrap gap-1 mt-2">
            {gem.properties.materials.map((material) => (
              <span
                key={material}
                className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
              >
                {material}
              </span>
            ))}
          </div>
          <StatsSection />
        </div>
      </CardWrapper>
    );
  }

  // Video Gem Card
  if (isVideoGem(gem)) {
    return (
      <CardWrapper>
        <div className="overflow-hidden aspect-video">
          {gem.properties.coverImage ? (
            <Image
              src={gem.properties.coverImage}
              alt={gem.title}
              width={600}
              height={338}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <GemPlaceholder type="video" />
          )}
        </div>

        <div className="p-4">
          <Typography variant="h4" className="mb-1 line-clamp-2">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            {gem.artist.name}
          </Typography>
          {gem.description && (
            <Typography variant="small" className="mt-2 text-gray-600 line-clamp-3 dark:text-gray-400">
              {gem.description}
            </Typography>
          )}
          <StatsSection />
        </div>
      </CardWrapper>
    );
  }

  // Content/Words Gem Card
  if (isContentGem(gem) || isWordsGem(gem)) {
    return (
      <CardWrapper>
        {gem.properties.coverImage ? (
          <div className="overflow-hidden aspect-[3/2]">
            <Image
              src={gem.properties.coverImage}
              alt={gem.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <GemPlaceholder type={gem.type} />
        )}
        <div className="p-4">
          <Typography variant="h4" className="mb-1 line-clamp-2">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            {gem.artist.name}
          </Typography>
          {gem.description && (
            <Typography variant="small" className="mt-2 text-gray-600 line-clamp-3 dark:text-gray-400">
              {gem.description}
            </Typography>
          )}
          <StatsSection />
        </div>
      </CardWrapper>
    );
  }

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
