'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import React from 'react';
import { cn } from '../utils/utils';
import { FilterButton } from './buttons/FilterButton';
import { PopoverTransition } from './transitions/PopoverTransition';
import { Typography } from './Typography';

interface SelectProps {
  title: string;
  open?: boolean;
  selected?: boolean;
  count?: number;
  icon?: keyof typeof Icons;
  children: React.ReactNode;
  popoverClassName?: string;
  className?: string;
}

export function Select({ title, selected, count, icon: IconName, popoverClassName, className, children }: SelectProps) {
  const Icon = IconName ? Icons[IconName] : null;
  return (
    <Popover className={cn('relative', className)}>
      {({ open: isOpen }) => (
        <>
          <div className="flex h-full">
            <PopoverButton
              as={FilterButton}
              className={cn(
                'flex-1 transition-all duration-200',
                count && count > 0 && !isOpen && 'shadow-[0_0_0_1px] shadow-amber-200 dark:shadow-amber-500/30',
                isOpen && 'bg-amber-50 dark:bg-amber-500/10',
              )}
            >
              <div className="flex gap-2 items-center">
                {Icon && <Icon className={cn('w-4 h-4 transition-colors', (isOpen || selected) && 'text-amber-600 dark:text-amber-400')} />}
                <Typography
                  variant="small"
                  className={cn('font-medium transition-colors', (isOpen || selected) && 'text-amber-600 dark:text-amber-400')}
                >
                  {title}
                </Typography>
              </div>
            </PopoverButton>
          </div>

          <PopoverTransition show={isOpen}>
            <PopoverPanel
              className={cn(
                'absolute z-10 mt-2 bg-white rounded-lg border-amber-200 shadow-lg border-1 min-w-80 dark:bg-gray-800 dark:border-gray-700',
                popoverClassName,
              )}
            >
              <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white rotate-45 border-l-2 border-t-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700" />
              {children}
            </PopoverPanel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  );
}
