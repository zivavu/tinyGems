'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { useLike } from '@/features/shared/hooks/useLike';
import { cn } from '@/features/shared/utils/utils';
import { LikeType } from '@/server/routers/userRouter';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { motion } from 'motion/react';
import NextLink from 'next/link';

interface LikeButtonProps {
  id: string;

  type: LikeType;
  className?: string;
}

export function LikeButton({ id, type, className }: LikeButtonProps) {
  const { isLiked, handleLike, isPending, isAuthenticated } = useLike({ id, type });

  if (!isAuthenticated) {
    return (
      <Popover className="relative">
        <PopoverButton
          as={motion.button}
          initial={false}
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          className={cn('p-2 rounded-full backdrop-blur-sm transition-colors', 'group/like bg-black/20', className)}
        >
          <Icons.Heart className="w-5 h-5 text-white group-hover/like:text-rose-500 transition-colors" />
        </PopoverButton>

        <PopoverPanel anchor={{ to: 'bottom end' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 w-92"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-full">
                  <Icons.Heart className="w-5 h-5 text-rose-500" />
                </div>
                <Typography variant="h4">Like what you see?</Typography>
              </div>
              <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                Create an account to like your favorite gems, create playlists and more!
              </Typography>
            </div>

            <NextLink
              href="/auth"
              className={cn(
                'mt-4 group/auth flex items-center justify-between',
                'w-full px-4 py-3 rounded-lg',
                'bg-gradient-to-r from-rose-500 to-rose-600',
                'hover:from-rose-600 hover:to-rose-700',
                'dark:from-rose-600 dark:to-rose-700',
                'dark:hover:from-rose-700 dark:hover:to-rose-800',
                'text-white font-medium shadow-sm',
                'transition-all duration-200 ease-in-out',
                'hover:shadow-md hover:-translate-y-0.5',
              )}
            >
              <span className="flex items-center gap-2">
                <Icons.Sparkles className="w-5 h-5" />
                Join tinyGems
              </span>
              <motion.div
                initial={false}
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <Icons.ArrowRight className="w-5 h-5" />
              </motion.div>
            </NextLink>
            <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700" />
          </motion.div>
        </PopoverPanel>
      </Popover>
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
