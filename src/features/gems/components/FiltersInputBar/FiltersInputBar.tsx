'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Button } from '../../../shared/components/buttons/Button';
import { FilterSelect } from '../../../shared/components/FilterSelect';
import { languages, musicFilters } from './filterOptions';
import { useParamFilters } from './hooks';

export function FiltersInputBar() {
  const { clearAllParams, isAnyParamSelected, handleParamChange, getSelectedParams } = useParamFilters();

  return (
    <div className="z-40 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-wrap gap-2 items-center justify-center px-4 py-4">
        <FilterSelect
          id="lang"
          icon="Globe"
          options={languages}
          isSearchable
          showFilterChips
          title="Language"
          onSelectionChange={(newValues) => handleParamChange('lang', newValues)}
          selectedValues={getSelectedParams('lang')}
          pageType="add"
        />
        {musicFilters.map(({ title, options, id, icon, isSearchable, showFilterChips }) => (
          <FilterSelect
            key={id}
            title={title}
            id={id}
            icon={icon}
            options={options}
            isSearchable={isSearchable}
            showFilterChips={showFilterChips}
            onSelectionChange={(newValues) => handleParamChange(id, newValues)}
            selectedValues={getSelectedParams(id)}
            pageType="add"
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
