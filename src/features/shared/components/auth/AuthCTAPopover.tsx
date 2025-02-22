'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { motion } from 'motion/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface AuthPopoverProps {
  children: ReactNode;
  className?: string;
}

export function AuthCTAPopover({ children, className }: AuthPopoverProps) {
  return (
    <Popover className="relative">
      <PopoverButton as={motion.button} initial={false} whileTap={{ scale: 0.9 }} className={className}>
        {children}
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
                <Icons.Heart className="w-4 h-4 text-rose-500" />
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
