'use client';

import { Icons } from '@/features/shared/components/Icons';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  description?: string;
  icon?: keyof typeof Icons;
  count?: number;
  selected?: boolean;
  open?: boolean;
}

export function FilterButton({ className, children, ...props }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'flex gap-2 justify-center items-center',
        'transition-colors duration-200',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'active:bg-gray-100 dark:active:bg-gray-700',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
