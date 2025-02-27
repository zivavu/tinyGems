import { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

const variants = {
  h1: {
    tag: 'h1',
    className: 'text-6xl font-bold text-text dark:text-text-inverted',
  },
  h2: {
    tag: 'h2',
    className: 'text-5xl font-semibold text-text dark:text-text-inverted',
  },
  h3: {
    tag: 'h3',
    className: 'text-4xl font-medium text-text dark:text-text-inverted',
  },
  h4: {
    tag: 'h4',
    className: 'text-3xl font-medium text-text dark:text-text-inverted',
  },
  h5: {
    tag: 'h5',
    className: 'text-2xl font-medium text-text dark:text-text-inverted',
  },
  h6: {
    tag: 'h6',
    className: 'text-xl font-medium text-text dark:text-text-inverted',
  },

  large: {
    tag: 'p',
    className: 'text-lg text-text-muted dark:text-text-inverted',
  },

  p: {
    tag: 'p',
    className: 'text-base text-text-muted dark:text-text-inverted',
  },
  small: {
    tag: 'p',
    className: 'text-sm text-text-muted dark:text-text-inverted',
  },
  muted: {
    tag: 'p',
    className: 'text-sm text-text-subtle dark:text-text-subtle',
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
