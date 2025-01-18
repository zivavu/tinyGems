'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { artMediums, artStyles, artSubjects, artTechniques } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function GraphicArtFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Medium',
      options: artMediums,
      param: 'medium',
      icon: 'PenTool',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: artStyles,
      param: 'artStyle',
      icon: 'Palette',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Subject',
      options: artSubjects,
      param: 'subject',
      icon: 'Image',
      searchable: true,
    },
    {
      title: 'Technique',
      options: artTechniques,
      param: 'technique',
      icon: 'Brush',
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
