import { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

const variants = {
  h1: {
    tag: 'h1',
    className: 'text-6xl font-bold text-text',
  },
  h2: {
    tag: 'h2',
    className: 'text-5xl font-semibold text-text',
  },
  h3: {
    tag: 'h3',
    className: 'text-4xl font-medium text-text',
  },
  h4: {
    tag: 'h4',
    className: 'text-3xl font-medium text-text',
  },
  h5: {
    tag: 'h5',
    className: 'text-2xl font-medium text-text',
  },
  h6: {
    tag: 'h6',
    className: 'text-xl font-medium text-text',
  },

  large: {
    tag: 'p',
    className: 'text-lg text-text-muted',
  },

  p: {
    tag: 'p',
    className: 'text-base text-text-muted',
  },
  small: {
    tag: 'p',
    className: 'text-sm text-text-muted',
  },
  muted: {
    tag: 'p',
    className: 'text-sm text-text-subtle',
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
