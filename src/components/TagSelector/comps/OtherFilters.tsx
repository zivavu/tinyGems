'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { otherApproaches, otherComplexity, otherMediums, otherThemes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function OtherFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Medium',
      options: otherMediums,
      param: 'medium',
      icon: 'Box',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Approach',
      options: otherApproaches,
      param: 'approach',
      icon: 'Lightbulb',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Theme',
      options: otherThemes,
      param: 'theme',
      icon: 'Compass',
      searchable: true,
    },
    {
      title: 'Complexity',
      options: otherComplexity,
      param: 'complexity',
      icon: 'Network',
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
