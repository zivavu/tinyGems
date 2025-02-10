'use client';

import { cn } from '@/features/shared/utils/utils';
import { motion, useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

import { useEffect, useState } from 'react';

export function useIsNearTop(threshold = 1000) {
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      setIsNearTop(scrollPosition < threshold);
    }

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isNearTop;
}

export function CardWrapper({ children, index = 0, className }: CardWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const isNearTop = useIsNearTop();

  // Only animate if we're near the top of the page
  const shouldAnimate = isNearTop && isInView;

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? { opacity: 0.5, y: 20 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={
        shouldAnimate
          ? {
              duration: 0.2,
              delay: index * 0.05,
              ease: [0.21, 1.11, 0.81, 0.99],
            }
          : undefined
      }
      className={cn(
        'relative overflow-hidden bg-white rounded-lg border flex flex-col border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
