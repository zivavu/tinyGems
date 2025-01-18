'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { filmGenres, filmStyles, filmTechniques, filmTypes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function MovieFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: filmTypes,
      param: 'filmType',
      icon: 'Clapperboard',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Genre',
      options: filmGenres,
      param: 'genre',
      icon: 'Film',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: filmStyles,
      param: 'style',
      icon: 'Video',
      searchable: true,
    },
    {
      title: 'Technique',
      options: filmTechniques,
      param: 'technique',
      icon: 'Camera',
      searchable: true,
    },
  ];

  return (
    <>
      {filtersArr.map(({ title, options, param, icon, searchable, showFilterChips }) => (
        <FilterSelect
          key={title}
          title={title}
          icon={icon}
          options={options}
          selected={getSelectedParams(param)}
          setSelected={(newValues) => handleParamChange(param, newValues)}
          isSearchable={searchable}
          showFilterChips={showFilterChips}
        />
      ))}
    </>
  );
}
