import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'muted';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}

const variants = {
  h1: {
    tag: 'h1',
    className: 'text-4xl font-bold text-gray-900 dark:text-gray-100',
  },
  h2: {
    tag: 'h2',
    className: 'text-3xl font-semibold text-gray-900 dark:text-gray-100',
  },
  h3: {
    tag: 'h3',
    className: 'text-2xl font-medium text-gray-900 dark:text-gray-100',
  },
  h4: {
    tag: 'h4',
    className: 'text-xl font-medium text-gray-900 dark:text-gray-100',
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

export function Typography({ variant = 'p', children, className, ...props }: TypographyProps) {
  const Tag = variants[variant].tag;

  return (
    <Tag className={cn(variants[variant].className, className)} {...props}>
      {children}
    </Tag>
  );
}
