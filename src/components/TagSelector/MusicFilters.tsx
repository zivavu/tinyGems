'use client';

import { FilterSelect } from '../ui/FilterSelect';
import { artistSizes, genreStyles, musicGenres, productionStyles, releaseFrequency } from './constants';
import { useParamFilters } from './hooks';

export function MusicFilters() {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  return (
    <div className="flex flex-wrap gap-2">
      {[
        {
          title: 'Genres',
          options: musicGenres,
          param: 'genres',
          grouped: true,
          searchable: true,
          getSelected: () =>
            musicGenres
              .flatMap((group) => group.options)
              .filter((option) => getSelectedParams('genres').includes(option.id))
              .map((option) => option.id),
        },
        {
          title: 'Size',
          options: artistSizes,
          param: 'sizes',
        },
        {
          title: 'Style',
          options: genreStyles,
          param: 'styles',
        },
        {
          title: 'Production',
          options: productionStyles,
          param: 'production',
        },
        {
          title: 'Activity',
          options: releaseFrequency,
          param: 'activity',
        },
      ].map(({ title, options, param, grouped, searchable, getSelected }) => (
        <FilterSelect
          key={title}
          title={title}
          options={options}
          selected={getSelected?.() || options.filter((option) => getSelectedParams(param).includes(option.id)).map((option) => option.id)}
          setSelected={(newValues) => handleParamChange(param, newValues)}
          grouped={grouped}
          searchable={searchable}
        />
      ))}
    </div>
  );
}
