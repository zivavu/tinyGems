'use client';

import { FilterOptionsGroup } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import { Button as HeadlesUiButton } from '@headlessui/react';
import { FilterOption } from './filterOptions';

interface TagSelectorProps {
  options: FilterOption[] | FilterOptionsGroup[];
  selected: FilterOption[];
  onSelect: (option: FilterOption) => void;
  onRemove: (option: FilterOption) => void;
  onClear: () => void;
  isSearchable?: boolean;
  showFilterChips?: boolean;
  query: string;
  setQuery: (query: string) => void;
  isGrouped?: boolean;
  title?: string;
  className?: string;
}

export function TagSelector({
  options,
  selected,
  onSelect,
  onRemove,
  onClear,
  isSearchable = false,
  showFilterChips = false,
  query,
  setQuery,
  isGrouped = false,
  title,
  className,
}: TagSelectorProps) {
  const filteredOptions = isGrouped
    ? (options as FilterOptionsGroup[])
        .map((group) => ({
          ...group,
          options: group.options.filter(
            (option) =>
              option.label.toLowerCase().includes(query.toLowerCase()) ||
              (option.description?.toLowerCase().includes(query.toLowerCase()) ?? false),
          ),
        }))
        .filter((group) => group.options.length > 0)
    : (options as FilterOption[]).filter(
        (option) =>
          option.label.toLowerCase().includes(query.toLowerCase()) ||
          (option.description?.toLowerCase().includes(query.toLowerCase()) ?? false),
      );

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex justify-between items-center">
        {title && (
          <Typography variant="h4" className="text-base">
            {title}
          </Typography>
        )}
        <HeadlesUiButton variant="ghost" onClick={onClear} disabled={selected.length === 0}>
          Clear all
        </HeadlesUiButton>
      </div>

      {isSearchable && (
        <div className="relative">
          <Icons.Search className="absolute left-2 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2 dark:text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="py-2 pr-3 pl-8 w-full text-sm bg-gray-50 rounded-lg border-0 dark:bg-gray-800 focus:ring-2 focus:ring-rose-500"
          />
        </div>
      )}

      {showFilterChips && (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg dark:bg-gray-800">
          {selected.map((option) => (
            <HeadlesUiButton
              key={option.id}
              onClick={() => onRemove(option)}
              className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-rose-600 bg-rose-50 rounded-full border-2 border-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 dark:hover:bg-rose-500/20"
            >
              {option.Icon && <option.Icon className="w-4 h-3" />}
              <span>{option.label}</span>
              <Icons.X className="w-3 h-3" />
            </HeadlesUiButton>
          ))}
        </div>
      )}

      <div className="overflow-auto max-h-[400px] space-y-2">
        {isGrouped ? (
          (filteredOptions as FilterOptionsGroup[]).map((group) => (
            <div key={group.id} className="space-y-1">
              <div className="sticky top-0 px-2 py-1 text-xs font-semibold text-gray-500 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 dark:text-gray-400">
                {group.name}
              </div>
              <div className="space-y-0.5">
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSelect(option)}
                    className={cn(
                      'flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors',
                      selected.some((s) => s.id === option.id)
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                    )}
                  >
                    {option.Icon && <option.Icon className="flex-shrink-0 w-5 h-4" />}
                    <div className="flex flex-col flex-1 text-left">
                      <span>{option.label}</span>
                      {option.description && <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>}
                    </div>
                    {selected.some((s) => s.id === option.id) && <Icons.Check className="flex-shrink-0 w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-0.5">
            {(filteredOptions as FilterOption[]).map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option)}
                className={cn(
                  'flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors',
                  selected.some((s) => s.id === option.id)
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                )}
              >
                {option.Icon && <option.Icon className="flex-shrink-0 w-5 h-4" />}
                <div className="flex flex-col flex-1 text-left">
                  <span>{option.label}</span>
                  {option.description && <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>}
                </div>
                {selected.some((s) => s.id === option.id) && <Icons.Check className="flex-shrink-0 w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
