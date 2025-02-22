'use client';
import 'client-only';

import { Icons } from '@/features/shared/components/Icons';
import { useLike } from '@/features/shared/hooks/useLike';
import { cn } from '@/features/shared/utils/cn';
import { LikeType } from '@/server/fetching/routers/userRouter';
import { motion } from 'motion/react';
import { AuthCTAPopover } from '../auth/AuthCTAPopover';

interface LikeButtonProps {
  itemId: string;
  type: LikeType;
  className?: string;
}

export function LikeButton({ itemId, type, className }: LikeButtonProps) {
  const { isLiked, handleLike, isPending, isAuthenticated } = useLike({
    itemId,
    type,
  });

  if (!isAuthenticated && !isPending) {
    return (
      <AuthCTAPopover className={cn('p-2 rounded-full backdrop-blur-sm transition-colors', 'group/like bg-black/20', className)}>
        <Icons.Heart className="w-5 h-5 text-white group-hover/like:text-rose-500 transition-colors" />
      </AuthCTAPopover>
    );
  }

  return (
    <motion.button
      initial={false}
      whileTap={{ scale: 0.9 }}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={(e) => {
        e.preventDefault();
        if (!isPending) handleLike();
      }}
      className={cn(
        'p-2 rounded-full transition-colors',
        isLiked
          ? 'text-violet-500 bg-violet-100 dark:bg-violet-900/30'
          : 'text-gray-500 hover:text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/30',
        className,
      )}
      disabled={isPending}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <motion.div initial={false} animate={isLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
        {isLiked ? (
          <Icons.Heart className="w-5 h-5 text-rose-500 fill-current" />
        ) : (
          <Icons.Heart className="w-5 h-5 text-white group-hover/like:text-rose-500 transition-colors" />
        )}
      </motion.div>
    </motion.button>
  );
}
