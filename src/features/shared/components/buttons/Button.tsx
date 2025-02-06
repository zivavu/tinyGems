'use client';

import { Button as HeadlessButton } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { cn } from '../../utils/dummy/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-rose-500 text-white shadow hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-800',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-600',
        outline:
          'border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600',
        selected: 'border-2 border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50',
        link: 'text-gray-900 underline-offset-4 hover:underline dark:text-gray-100',
      },
      size: {
        default: 'px-5 py-2',
        sm: 'rounded-md px-3',
        lg: 'rounded-md px-8',
        icon: 'w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, target, rel, ...props }, ref) => {
    const Comp = href ? NextLink : asChild ? HeadlessButton : 'button';

    const linkProps = href
      ? {
          href,
          target,
          rel: target === '_blank' ? 'noopener noreferrer' : rel,
        }
      : {};

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...linkProps} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
