import { type HTMLAttributes } from 'react';
import { cn } from '../utils/dummy/utils';

const variants = {
  h1: {
    tag: 'h1',
    className: 'text-7xl font-bold text-gray-900 dark:text-gray-100',
  },
  h2: {
    tag: 'h2',
    className: 'text-6xl font-semibold text-gray-900 dark:text-gray-100',
  },
  h3: {
    tag: 'h3',
    className: 'text-5xl font-medium text-gray-900 dark:text-gray-100',
  },
  h4: {
    tag: 'h4',
    className: 'text-4xl font-medium text-gray-900 dark:text-gray-100',
  },
  h5: {
    tag: 'h5',
    className: 'text-3xl font-medium text-gray-900 dark:text-gray-100',
  },
  h6: {
    tag: 'h6',
    className: 'text-2xl font-medium text-gray-900 dark:text-gray-100',
  },

  p: {
    tag: 'p',
    className: 'text-base text-gray-800 dark:text-gray-300',
  },
  small: {
    tag: 'p',
    className: 'text-sm text-gray-800 dark:text-gray-300',
  },
  muted: {
    tag: 'p',
    className: 'text-sm text-gray-600 dark:text-gray-400',
  },
} as const;

type TypographyVariant = keyof typeof variants;

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}

export function Typography({ variant = 'p', children, className, ...props }: TypographyProps) {
  const Tag = variants[variant].tag;

  return (
    <Tag className={cn(variants[variant].className, className)} {...props}>
      {children}
    </Tag>
  );
}
