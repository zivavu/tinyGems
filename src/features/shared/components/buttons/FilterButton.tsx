'use client';

import { cn } from '@/features/shared/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  count?: number;
  selected?: boolean;
}

export function FilterButton({ children, count, selected, className, ...props }: FilterButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center',
        'gap-2 py-2 px-3 rounded-lg text-sm',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'transition-colors duration-200',
        'hover:bg-background-subtle dark:hover:bg-background-subtle',
        'active:bg-background-muted dark:active:bg-background-muted',
        className,
      )}
      type="button"
      {...props}
    >
      {children}
      {count ? (
        <span className="h-5 min-w-5 flex items-center justify-center px-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
          {count}
        </span>
      ) : null}
      {selected && (
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-background dark:border-background-subtle"></div>
      )}
    </button>
  );
}
