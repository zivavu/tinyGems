'use client';

import { Gem, GemType } from '@/features/gems/types/gems';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import Image from 'next/image';
import Link from 'next/link';

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
    'content-creation': {
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
    'mixed-media': {
      icon: Icons.Image,
      text: 'No preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
    },
    other: {
      icon: Icons.FileText,
      text: 'No preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
    },
    'fiber-arts': {
      icon: Icons.Scissors,
      text: 'No preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-pink-50/50 to-pink-100/50 dark:from-pink-900/20 dark:to-pink-800/20',
    },
    'digital-art': {
      icon: Icons.Monitor,
      text: 'No preview',
      aspect: 'aspect-[3/2]',
      gradient: 'from-indigo-50/50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/20',
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

  const mainImage = gem.properties.media.coverImage || gem.properties.media.images?.[0];

  return (
    <CardWrapper>
      {/* Media Section */}
      <div
        className={cn('overflow-hidden', {
          'aspect-square': gem.type === 'music' || gem.type === 'craft',
          'aspect-video': gem.type === 'video',
          'aspect-[4/3]': gem.type === 'art',
          'aspect-[3/2]': gem.type === 'content-creation' || gem.type === 'words',
        })}
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={gem.title}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        ) : (
          <GemPlaceholder type={gem.type} />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2 space-y-1">
          <Typography variant="h4" className="line-clamp-1">
            {gem.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 line-clamp-1">
            {gem.artist.name}
          </Typography>
        </div>

        {/* Type-specific metadata */}
        <div className="flex flex-wrap gap-1 mb-4">
          {gem.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
              {tag}
            </span>
          ))}
        </div>

        <StatsSection />
      </div>
    </CardWrapper>
  );
}
