'use client';

import { cn } from '../../utils/utils';
import { Icons } from '../Icons';
import { Button } from './Button';

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export function LikeButton({ isLiked, onClick, isLoading, className }: LikeButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
      className={cn('group flex items-center gap-1', isLiked && 'text-rose-500', className)}
    >
      {isLiked ? <Icons.Heart className="w-4 h-4 fill-current" /> : <Icons.Heart className="w-4 h-4 group-hover:text-rose-500" />}
    </Button>
  );
}
