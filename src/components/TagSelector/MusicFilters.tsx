'use client';

import { Icons } from '@/lib/Icons';
import { FilterSelect } from '../ui/FilterSelect';
import { artistSizes, genreStyles, musicGenres, productionStyles, releaseFrequency } from './constants';
import { useParamFilters } from './hooks';

interface MusicFilter {
  title: string;
  options: any[];
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
      title: 'Size',
      options: artistSizes,
      param: 'sizes',
      icon: 'Users',
    },
    {
      title: 'Style',
      options: genreStyles,
      param: 'styles',
      icon: 'Palette',
    },
    {
      title: 'Production',
      options: productionStyles,
      param: 'production',
      icon: 'Mic',
    },
    {
      title: 'Activity',
      options: releaseFrequency,
      param: 'activity',
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
