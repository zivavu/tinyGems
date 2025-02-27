'use client';

import { cn } from '@/features/shared/utils/cn';

interface LoadingCardProps {
  variant?: 'artist' | 'album' | 'song';
  className?: string;
}

export function LoadingCard({ variant = 'album', className }: LoadingCardProps) {
  return (
    <div className={cn('animate-pulse overflow-hidden rounded-lg bg-background', variant === 'artist' ? 'pt-[45%]' : '', className)}>
      {variant === 'artist' && (
        <>
          <div className="h-36 bg-background-muted dark:bg-background-muted" />
          <div className="relative -mt-12 px-4">
            <div className="w-24 h-24 rounded-full bg-background-subtle dark:bg-background-subtle border-4 border-background dark:border-background" />
          </div>
        </>
      )}

      {variant !== 'artist' && <div className="aspect-square bg-background-muted dark:bg-background-muted" />}

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-background-muted dark:bg-background-muted rounded w-3/4" />
          <div className="h-4 bg-background-muted dark:bg-background-muted rounded w-1/2" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-background-muted dark:bg-background-muted rounded-full w-16" />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 bg-background-muted dark:bg-background-muted rounded w-24" />
          <div className="h-8 w-8 bg-background-muted dark:bg-background-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}
