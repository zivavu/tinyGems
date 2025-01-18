'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { artistSizes, genreStyles, musicGenres, productionStyles, releaseFrequency } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function MusicFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
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
