'use client';

import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { Typography } from '../Typography';
import { Button } from './Button';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  description?: string;
  icon?: keyof typeof Icons;
  count?: number;
  selected?: boolean;
  open?: boolean;
}

export function FilterButton({ label, description, icon, count, selected, open, className, children, ...props }: FilterButtonProps) {
  const Icon = icon ? Icons[icon] : null;

  return (
    <Button variant={selected || open ? 'selected' : 'outline'} className={cn('gap-2 py-2 h-auto', className)} {...props}>
      <div className="flex gap-2 items-center">
        {Icon && (
          <div
            className={cn(
              'p-1.5 rounded-md transition-colors',
              open || selected ? 'bg-rose-100 dark:bg-rose-900/20' : 'bg-gray-100 dark:bg-gray-800',
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        <div className="flex gap-2 items-center">
          {description ? (
            <div className="flex flex-col items-start">
              <Typography variant="muted" className="text-xs">
                {description}
              </Typography>
              <Typography variant="small" className="font-medium">
                {label}
              </Typography>
            </div>
          ) : (
            <Typography variant="small" className="font-medium">
              {label}
            </Typography>
          )}

          {count !== undefined && (
            <span
              className={cn(
                'px-1.5 py-0.5 text-xs rounded-full font-medium',
                open || selected
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
              )}
            >
              {count}
            </span>
          )}
        </div>
      </div>

      {children}

      <Icons.ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
    </Button>
  );
}
