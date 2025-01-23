'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Button } from '../../../shared/components/buttons/Button';
import { FilterSelect } from '../../../shared/components/FilterSelect';
import { languages, musicFilters } from './constants';
import { useParamFilters } from './hooks';

export function TagSelector() {
  const { clearAllParams, isAnyParamSelected } = useParamFilters();

  return (
    <div className="sticky top-16 z-40 bg-white border-b dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex flex-wrap gap-2 items-center px-4 py-4">
        <FilterSelect title="Language" icon="Globe" options={languages} param="lang" isSearchable showFilterChips />
        {musicFilters.map(({ title, options, param, icon, isSearchable, showFilterChips }) => (
          <FilterSelect
            key={title}
            title={title}
            icon={icon}
            param={param}
            options={options}
            isSearchable={isSearchable}
            showFilterChips={showFilterChips}
          />
        ))}
        {isAnyParamSelected() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllParams}
            className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icons.X className="mr-1 w-3 h-3" />
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
