'use client';

import { Icons } from '@/lib/Icons';
import { FilterOption, FilterSelect } from '../ui/FilterSelect';
import { artistSizes, GenreCategory, genreStyles, musicGenres, productionStyles, releaseFrequency } from './constants';
import { useParamFilters } from './hooks';

interface MusicFilter {
  title: string;
  options: FilterOption[] | GenreCategory[];
  param: string;
  icon: keyof typeof Icons;
  grouped?: boolean;
  searchable?: boolean;
  showFilterChips?: boolean;
}

export function MusicFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: MusicFilter[] = [
    {
      title: 'Genres',
      options: musicGenres,
      param: 'genres',
      icon: 'Music',
      grouped: true,
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Audience Size',
      options: artistSizes,
      param: 'audienceSize',
      icon: 'Users',
    },
    {
      title: 'Style',
      options: genreStyles,
      param: 'genreStyle',
      icon: 'Palette',
    },
    {
      title: 'Production',
      options: productionStyles,
      param: 'productionStyle',
      icon: 'Mic',
    },
    {
      title: 'Activity',
      options: releaseFrequency,
      param: 'releaseFrequency',
      icon: 'Clock',
    },
  ] as const;
  return (
    <>
      {filtersArr.map(({ title, options, param, icon, grouped, searchable, showFilterChips }) => (
        <FilterSelect
          key={title}
          title={title}
          icon={icon}
          options={options}
          selected={getSelectedParams(param)}
          setSelected={(newValues) => handleParamChange(param, newValues)}
          isGrouped={grouped}
          isSearchable={searchable}
          showFilterChips={showFilterChips}
        />
      ))}
    </>
  );
}
