'use client';

import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { FilterButton } from './buttons/FilterButton';
import { Typography } from './Typography';

interface SelectProps {
  title: string;
  open?: boolean;
  selected?: boolean;
  count?: number;
  icon?: keyof typeof Icons;
  children: React.ReactNode;
}

export function Select({ title, selected, count, icon: IconName, children }: SelectProps) {
  const Icon = IconName ? Icons[IconName] : null;

  return (
    <Popover className="relative">
      {({ open: isOpen }) => (
        <>
          <PopoverButton as={FilterButton}>
            <div className="flex gap-2 items-center">
              {Icon && <Icon className="w-4 h-4" />}
              <Typography variant="small" className="font-medium">
                {title}
              </Typography>
              {count !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 text-xs rounded-full font-medium',
                    isOpen || selected
                      ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
                  )}
                >
                  {count}
                </span>
              )}
            </div>
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-2 w-80 bg-white rounded-lg border-2 border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
            {children}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
