'use client';

import { Icons } from '@/features/shared/components/Icons';
import { RangeSlider } from '@/features/shared/components/RangeSlider/RangeSlider';
import { SegmentedControl, SegmentOption } from '@/features/shared/components/SegmentedControl/SegmentedControl';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '../../../shared/components/buttons/Button';
import { FilterSelect } from '../../../shared/components/FilterSelect';
import { albumFilters, AllFilterId, artistFilters, isRangeFilter, singlesFilter } from './filterOptions';
import { ContentType, useParamFilters } from './hooks';

const contentTypeOptions: SegmentOption[] = [
  { id: 'singles', label: 'Singles', icon: 'Music' },
  { id: 'albums', label: 'Albums', icon: 'Disc' },
  { id: 'artists', label: 'Artists', icon: 'Users' },
] as const;

const filterGroups: Record<ContentType, { title: string; filters: AllFilterId[] }[]> = {
  singles: [
    {
      title: 'Artist Properties',
      filters: ['gender', 'combinedPopularity'],
    },
    {
      title: 'Music Properties',
      filters: ['genre', 'mood', 'lyricsTopics', 'bpm'],
    },
    {
      title: 'Technical',
      filters: ['lang', 'platform', 'releaseYear', 'additional'],
    },
  ],
  albums: [
    {
      title: 'Artist Properties',
      filters: ['gender', 'combinedPopularity'],
    },
    {
      title: 'Music Properties',
      filters: ['genre', 'mood', 'lyricsTopics'],
    },
    {
      title: 'Technical',
      filters: ['lang', 'platform', 'releaseYear', 'albumType'],
    },
  ],
  artists: [
    {
      title: 'Artist Properties',
      filters: ['gender', 'combinedPopularity', 'location', 'verification', 'activity'],
    },
    {
      title: 'Music Properties',
      filters: ['genre', 'mood'],
    },
    {
      title: 'Technical',
      filters: ['lang', 'platform'],
    },
  ],
} as const;

export function FiltersInputBar() {
  const {
    clearAllParams,
    isAnyParamSelected,
    handleParamChange,
    getSelectedParams,
    handleRangeChange,
    getRangeValues,
    handleContentTypeChange,
    getContentType,
  } = useParamFilters();

  const contentType = getContentType();

  const filtersMap = {
    singles: singlesFilter,
    albums: albumFilters,
    artists: artistFilters,
  } as const;

  return (
    <div className="z-40 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-col items-center gap-6 px-4 py-6">
        <SegmentedControl options={contentTypeOptions} value={contentType} onChange={handleContentTypeChange} />

        <div className="w-full max-w-7xl">
          {filterGroups[contentType].map((group) => (
            <div key={group.title} className="mb-6 last:mb-0">
              <div className="mb-3 flex items-center">
                <Typography variant="h5" className="text-gray-700 dark:text-gray-300">
                  {group.title}
                </Typography>
                <div className="ml-3 flex-1 border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.filters.map((filterId) => {
                  const filter = filtersMap[contentType].find((f) => f.id === filterId);
                  if (!filter) return null;

                  if (isRangeFilter(filter)) {
                    return (
                      <RangeSlider
                        key={filter.id}
                        min={filter.min}
                        max={filter.max}
                        step={filter.step}
                        values={getRangeValues(filter.id) ?? [filter.min, filter.max]}
                        onChange={(values) => handleRangeChange(filter.id, values)}
                        label={filter.title}
                        icon={filter.icon}
                        formatValue={filter.formatValue}
                      />
                    );
                  }

                  return (
                    <FilterSelect
                      key={filter.id}
                      title={filter.title}
                      id={filter.id}
                      icon={filter.icon}
                      options={filter.options}
                      isSearchable={filter.isSearchable}
                      showFilterChips={filter.showFilterChips}
                      onSelectionChange={(newValues) => handleParamChange(filter.id, newValues)}
                      selectedValues={getSelectedParams(filter.id)}
                      pageType="seek"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

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
