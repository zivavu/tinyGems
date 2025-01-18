'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { craftComplexity, craftMaterials, craftStyles } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function CraftFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Materials',
      options: craftMaterials,
      param: 'materials',
      icon: 'Hammer',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Complexity',
      options: craftComplexity,
      param: 'complexity',
      icon: 'Stars',
    },
    {
      title: 'Style',
      options: craftStyles,
      param: 'style',
      icon: 'Palette',
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
