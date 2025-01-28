import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MusicFiltersId } from '../components/FiltersInputBar/filterOptions';
import { MusicGem } from '../types/gemsTypes';
import { filterGems } from '../utils/filterGems';

export function useFilteredGems(gems: MusicGem[]) {
  const searchParams = useSearchParams();

  const filteredGems = useMemo(() => {
    const params: { [key in MusicFiltersId]?: string[] } = {};

    // Convert URL search params to filter params
    searchParams.forEach((value, key) => {
      if (value) {
        params[key as MusicFiltersId] = value.split(',');
      }
    });

    return filterGems(gems, params);
  }, [gems, searchParams]);

  return filteredGems;
}
