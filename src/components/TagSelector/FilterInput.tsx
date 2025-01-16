'use client';

import { Select } from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { FilterOption } from './constants';
import { Button } from '../ui/Buttons/Button';

interface FilterInputProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  setSelected: (value: string[]) => void;
  count?: number;
}

export function FilterInput({ title, options, selected, setSelected, count }: FilterInputProps) {
  const toggleFilter = (option: FilterOption) => {
    const newSelection = selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id];
    setSelected(newSelection);
  };

  return (
    <Select title={title} selected={selected.length > 0} count={count || selected.length || undefined}>
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-base">
            {title}
          </Typography>
          {selected.length > 0 && (
            <Button

              variant="ghost"
              size="sm"
              onClick={() => setSelected([])}
              className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear all
            </Button>
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg dark:bg-gray-700/50">
            {options
              .filter((option) => selected.includes(option.id))
              .map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleFilter(option)}
                  className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-rose-600 bg-rose-50 rounded-full border-2 border-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 dark:hover:bg-rose-500/20"
                >
                  <span>{option.label}</span>
                  <Icons.X className="w-3 h-3" />
                </button>
              ))}
          </div>
        )}

        <div className="space-y-1">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleFilter(option)}
              className={cn(
                'flex flex-col w-full gap-0.5 px-3 py-2 text-sm rounded-lg transition-colors',
                selected.includes(option.id)
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800',
              )}
            >
              <Typography variant="small" className="font-medium text-left">
                {option.label}
              </Typography>
              <Typography variant="muted" className="text-left">
                {option.description}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </Select>
  );
}
