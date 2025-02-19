'use client';

import { Button as HeadlessButton } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithRef } from 'react';
import { cn } from '../../utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-amber-500 text-white shadow hover:bg-amber-600 dark:bg-amber-700 dark:hover:bg-amber-800',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-600',
        outline:
          'border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600',
        selected: 'border-2 border-amber-500 bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50',
        link: 'text-gray-900 underline-offset-4 hover:underline dark:text-gray-100',
      },
      size: {
        default: 'px-5 py-2',
        sm: 'rounded-md px-3',
        lg: 'rounded-md px-8',
        icon: 'h-10 w-10',
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

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <HeadlessButton className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};

Button.displayName = 'Button';

export { Button, buttonVariants };
