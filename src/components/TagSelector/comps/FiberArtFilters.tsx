'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { fiberComplexity, fiberMaterials, fiberStyles, fiberTechniques } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function FiberArtFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Technique',
      options: fiberTechniques,
      param: 'technique',
      icon: 'Scissors',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Material',
      options: fiberMaterials,
      param: 'material',
      icon: 'Anvil',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: fiberStyles,
      param: 'style',
      icon: 'Palette',
      searchable: true,
    },
    {
      title: 'Complexity',
      options: fiberComplexity,
      param: 'complexity',
      icon: 'Stars',
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
