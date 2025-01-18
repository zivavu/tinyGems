'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { mixedMediaTypes, mixedMediaMaterials, mixedMediaApproaches, mixedMediaSpaces } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function MixedMediaFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: mixedMediaTypes,
      param: 'mixedType',
      icon: 'Combine',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Materials',
      options: mixedMediaMaterials,
      param: 'materials',
      icon: 'Shapes',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Approach',
      options: mixedMediaApproaches,
      param: 'approach',
      icon: 'Lightbulb',
      searchable: true,
    },
    {
      title: 'Space',
      options: mixedMediaSpaces,
      param: 'space',
      icon: 'Box',
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
