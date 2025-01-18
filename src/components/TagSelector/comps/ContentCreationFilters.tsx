'use client';

import { FilterSelect } from '@/components/ui/FilterSelect';
import { contentFormats, contentStyles, contentTopics, contentTypes } from '../constants';
import { useParamFilters } from '../hooks';
import { GemFilter } from './types';

export function ContentCreationFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  const filtersArr: GemFilter[] = [
    {
      title: 'Type',
      options: contentTypes,
      param: 'contentType',
      icon: 'Radio',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Topic',
      options: contentTopics,
      param: 'topic',
      icon: 'BookOpen',
      searchable: true,
      showFilterChips: true,
    },
    {
      title: 'Format',
      options: contentFormats,
      param: 'format',
      icon: 'Layout',
      searchable: true,
    },
    {
      title: 'Style',
      options: contentStyles,
      param: 'style',
      icon: 'Sparkles',
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
