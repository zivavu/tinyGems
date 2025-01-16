'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { artistSizes, genreStyles, productionStyles, releaseFrequency } from './constants';
import { FilterInput } from './FilterInput';
import { GenreSelector } from './GenreSelector';

export function MusicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function getActiveFilters(paramName: string) {
    return searchParams.get(paramName)?.split(',').filter(Boolean) || [];
  }

  const handleFilterChange = (paramName: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(paramName, values.join(','));
    } else {
      params.delete(paramName);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <GenreSelector />
      <FilterInput
        title="Size"
        options={artistSizes}
        selected={getActiveFilters('sizes')}
        setSelected={(values) => handleFilterChange('sizes', values)}
      />
      <FilterInput
        title="Style"
        options={genreStyles}
        selected={getActiveFilters('styles')}
        setSelected={(values) => handleFilterChange('styles', values)}
      />
      <FilterInput
        title="Production"
        options={productionStyles}
        selected={getActiveFilters('production')}
        setSelected={(values) => handleFilterChange('production', values)}
      />
      <FilterInput
        title="Activity"
        options={releaseFrequency}
        selected={getActiveFilters('activity')}
        setSelected={(values) => handleFilterChange('activity', values)}
      />
    </div>
  );
}
