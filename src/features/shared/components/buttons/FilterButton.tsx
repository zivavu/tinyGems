'use client';

import { cn } from '@/features/shared/utils/cn';
import { Button } from './Button';

interface FilterButtonProps {
  children: React.ReactNode;
  count?: number;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export function FilterButton({ children, count, selected, className, ...props }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'relative flex items-center justify-center',
        'transition-colors duration-200',
        selected && 'border-primary-200 dark:border-primary-700',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {count ? (
          <span className="h-5 min-w-5 flex items-center justify-center px-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
            {count}
          </span>
        ) : null}
      </div>
      {selected && (
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-background dark:border-background-subtle"></div>
      )}
    </Button>
  );
}
