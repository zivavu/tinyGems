'use client';

import { cn } from '@/features/shared/utils/cn';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export function CardWrapper({ children, index = 0, className }: CardWrapperProps) {
  const MAX_DELAY = 0.3;
  const delay = Math.min(index * 0.05, MAX_DELAY);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.15,
        delay,
        ease: 'easeOut',
      }}
      className={cn(
        'relative overflow-hidden bg-background rounded-lg border flex flex-col border-border shadow-sm dark:border-border-strong dark:bg-background-subtle',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
