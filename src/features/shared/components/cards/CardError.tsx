'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';
import { CardWrapper } from '../transitions/CardWrapper';

interface CardErrorProps {
  type: 'gem' | 'album' | 'artist';
  className?: string;
  message?: string;
}

export function CardError({ type, className, message }: CardErrorProps) {
  const defaultMessage = {
    gem: "This gem seems to be missing. It might have been deleted or you don't have access to it.",
    album: "This album seems to be missing. It might have been deleted or you don't have access to it.",
    artist: "This artist profile seems to be missing. It might have been deleted or you don't have access to it.",
  }[type];

  return (
    <CardWrapper className={cn('opacity-75', className)}>
      <div className="aspect-square bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
        <Icons.Ghost className="w-12 h-12 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="p-4 flex-1">
        <Typography variant="small" className="text-gray-500 dark:text-gray-400">
          {message || defaultMessage}
        </Typography>
      </div>
    </CardWrapper>
  );
}
