'use client';

import { Category } from '@/lib/categories';
import { Icons } from '@/lib/Icons';
import { Button } from '../ui/buttons/Button';
import { FilterSelect } from '../ui/FilterSelect';
import { CategorySelect } from './CategorySelect';
import { languages } from './constants';
import { useParamFilters } from './hooks';
import { MusicFilters } from './MusicFilters';

interface TagSelectorProps {
  selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
  const { getSelectedParams, handleParamChange, clearAllParams } = useParamFilters();

  // Check if any filters are active
  const hasActiveFilters = ['languages', 'genres', 'sizes', 'styles', 'production', 'activity'].some(
    (param) => getSelectedParams(param).length > 0,
  );

  return (
    <div className="sticky top-0 p-3 rounded-md border border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap gap-2">
        <CategorySelect selectedCategory={selectedCategory} />
        <FilterSelect
          title="Languages"
          icon="Globe"
          options={languages}
          selected={getSelectedParams('languages')}
          setSelected={(newValues) => handleParamChange('languages', newValues)}
          isSearchable={true}
          showFilterChips={true}
        />

        {selectedCategory.slug === 'music' && <MusicFilters />}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllParams}
            className="ml-auto text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icons.X className="mr-1 w-3 h-3" />
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
