'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { photographyStyles, photographySubjects, photographyTechniques, photographyTypes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function PhotographyFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: photographyTypes,
      param: 'photoType',
      icon: 'Camera',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: photographyStyles,
      param: 'photoStyle',
      icon: 'Palette',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Technique',
      options: photographyTechniques,
      param: 'technique',
      icon: 'Settings',
      searchable: true,
    },
    {
      title: 'Subject',
      options: photographySubjects,
      param: 'subject',
      icon: 'Focus',
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
