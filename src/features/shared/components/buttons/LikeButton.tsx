'use client';

import { Icons } from '@/features/shared/components/Icons';
import { useLike } from '@/features/shared/hooks/useLike';
import { cn } from '@/features/shared/utils/utils';
import { LikeType } from '@/server/routers/userRouter';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { AuthCTAPopover } from '../auth/AuthCTAPopover';

interface LikeButtonProps {
  id: string;
  type: LikeType;
  className?: string;
}

export function LikeButton({ id, type, className }: LikeButtonProps) {
  const { isLiked, handleLike, isPending, isAuthenticated } = useLike({ id, type });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button className={cn('p-2 rounded-full backdrop-blur-sm transition-colors', 'group/like bg-black/20', className)}>
        <Icons.Heart className="w-5 h-5 text-white group-hover/like:text-rose-500 transition-colors" />
      </button>
    );
  }

  if (!isAuthenticated) {
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
        'p-2 rounded-full backdrop-blur-sm transition-colors',
        'group/like',
        isPending && 'cursor-not-allowed opacity-50',
        isLiked ? 'bg-black/30' : 'bg-black/20',
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
