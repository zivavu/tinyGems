'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { digitalArtCategories, digitalArtSoftware, digitalArtStyles, digitalArtTypes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function DigitalArtFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: digitalArtTypes,
      param: 'digitalType',
      icon: 'Box',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Style',
      options: digitalArtStyles,
      param: 'style',
      icon: 'Palette',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Software',
      options: digitalArtSoftware,
      param: 'software',
      icon: 'Monitor',
      searchable: true,
    },
    {
      title: 'Category',
      options: digitalArtCategories,
      param: 'category',
      icon: 'Layers',
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
