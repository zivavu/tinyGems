'use client';

import { Icons } from '@/features/shared/components/Icons';
import { SegmentedControl, SegmentOption } from '@/features/shared/components/SegmentedControl/SegmentedControl';
import { Button } from '../../../shared/components/buttons/Button';
import { FilterSelect } from '../../../shared/components/FilterSelect';
import { albumFilters, artistFilters, singlesFilter } from './filterOptions';
import { useParamFilters } from './hooks';

const contentTypeOptions: SegmentOption[] = [
  { id: 'songs', label: 'Songs', icon: 'Music' },
  { id: 'albums', label: 'Albums', icon: 'Disc' },
  { id: 'artists', label: 'Artists', icon: 'Users' },
] as const;

export function FiltersInputBar() {
  const { clearAllParams, isAnyParamSelected, handleParamChange, getSelectedParams, handleContentTypeChange, getContentType } =
    useParamFilters();

  const contentType = getContentType();

  const filtersMap = {
    songs: singlesFilter,
    albums: albumFilters,
    artists: artistFilters,
  } as const;

  return (
    <div className="z-40 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-col items-center gap-4 px-4 py-6">
        <SegmentedControl options={contentTypeOptions} value={contentType} onChange={handleContentTypeChange} />

        <div className="flex flex-wrap gap-2 items-center justify-center">
          {filtersMap[contentType].map(({ title, options, id, icon, isSearchable, showFilterChips }) => (
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
              pageType="seek"
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
    </div>
  );
}
