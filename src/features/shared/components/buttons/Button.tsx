'use client';

import { Button as HeadlessButton } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithRef } from 'react';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white shadow hover:bg-primary-600 dark:bg-primary-700 dark:hover:bg-primary-800',
        destructive:
          'bg-destructive-500 text-white shadow-sm hover:bg-destructive-600 dark:bg-destructive-600 dark:hover:bg-destructive-600',
        outline:
          'border-2 border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:border-neutral-600',
        selected:
          'border-2 border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100',
      },
      size: {
        icon: 'p-1',
        default: 'px-5 py-2',
        sm: 'rounded-md px-3 py-1',
        lg: 'rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = ComponentPropsWithRef<typeof HeadlessButton> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <HeadlessButton className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

Button.displayName = 'Button';

export { Button, buttonVariants };
