'use client';

import { LikeType } from '@/server/fetching/routers/userRouter';
import { CardWrapper } from '../transitions/CardWrapper';

interface LoadingCardProps {
  className?: string;
  index: number;
  variant?: LikeType;
}

export function LoadingCard({ className, index, variant = 'song' }: LoadingCardProps) {
  return (
    <CardWrapper index={index} className={className}>
      <div className="animate-pulse">
        {variant === 'artist' ? (
          <>
            <div className="h-36 bg-gray-200 dark:bg-gray-800" />
            <div className="px-4 -mt-12">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-900" />
            </div>
          </>
        ) : (
          <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
        )}

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>

          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-16" />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
