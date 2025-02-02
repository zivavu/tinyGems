import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SingleFilterId } from '../components/FiltersInputBar/filterOptions';

import { MusicGem } from '../types';
import { filterGems } from '../utils/filterGems';

export function useFilteredGems(gems: MusicGem[]) {
  const searchParams = useSearchParams();

  const filteredGems = useMemo(() => {
    const params: { [key in SingleFilterId]?: string[] } = {};

    // Convert URL search params to filter params
    searchParams.forEach((value, key) => {
      if (value) {
        params[key as SingleFilterId] = value.split(',');
      }
    });

    return filterGems(gems, params);
  }, [gems, searchParams]);

  return filteredGems;
}
