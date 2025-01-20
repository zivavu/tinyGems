'use client';

import { FilterSelect } from '@/features/shared/components/FilterSelect';
import { writingGenres, writingStyles, writingThemes, writingTypes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function WordsFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: writingTypes,
      param: 'writingType',
      icon: 'BookOpen',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Genre',
      options: writingGenres,
      param: 'genre',
      icon: 'Library',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: writingStyles,
      param: 'style',
      icon: 'PenTool',
      searchable: true,
    },
    {
      title: 'Theme',
      options: writingThemes,
      param: 'theme',
      icon: 'Bookmark',
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
