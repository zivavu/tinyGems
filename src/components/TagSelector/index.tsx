'use client';

import { Category } from '@/lib/categories';
import { FilterSelect } from '../ui/FilterSelect';
import { CategorySelect } from './CategorySelect';
import { languages } from './constants';
import { useParamFilters } from './hooks';
import { MusicFilters } from './MusicFilters';

interface TagSelectorProps {
  selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  return (
    <div className="sticky top-0 p-3 rounded-md border border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap gap-2">
        <CategorySelect selectedCategory={selectedCategory} />
        <FilterSelect
          title="Languages"
          options={languages}
          selected={getSelectedParams('languages')}
          setSelected={(newValues) => handleParamChange('languages', newValues)}
          searchable={true}
        />

        {selectedCategory.slug === 'music' && <MusicFilters />}
      </div>
    </div>
  );
}
