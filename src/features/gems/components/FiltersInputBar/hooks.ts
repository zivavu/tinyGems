import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import {
  AlbumFilterId,
  albumFilterIds,
  AllFilterId,
  ArtistFilterId,
  artistFilterIds,
  RangeFilterId,
  SingleFilterId,
  singleFilterIds,
} from './filterOptions';

export type FiltersId = SingleFilterId | AlbumFilterId | ArtistFilterId;
export type ContentType = 'singles' | 'albums' | 'artists';

export function useParamFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleParamChange = (id: FiltersId | undefined, values: string[]) => {
    if (!id) return;

    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(id, values.join(','));
    } else {
      params.delete(id);
    }

    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  const handleContentTypeChange = (type: ContentType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);

    // Get the filter IDs for the selected content type
    const allowedFilters: Record<ContentType, readonly FiltersId[]> = {
      singles: singleFilterIds,
      albums: albumFilterIds,
      artists: artistFilterIds,
    } as const;

    // Keep only the parameters that are valid for the selected content type
    const allParams = Array.from(params.entries());
    allParams.forEach(([paramKey]) => {
      const typeFilters = allowedFilters[type];
      const isParamInNewCategory = typeFilters.includes(paramKey as AllFilterId);
      if (!isParamInNewCategory && paramKey !== 'type' && paramKey !== 'category') {
        params.delete(paramKey);
      }
    });

    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  const getContentType = (): ContentType => {
    return (searchParams.get('type') as ContentType) || 'singles';
  };

  const getSelectedParams = (id: FiltersId | undefined) => {
    if (!id) return [];

    const value = searchParams.get(id);
    return value ? value.split(',') : [];
  };

  const clearAllParams = () => {
    const params = new URLSearchParams();
    const contentType = getContentType();
    params.set('type', contentType);
    router.push(`/seek?category=music&${params.toString()}`, { scroll: false });
  };

  const getAllParams = () => {
    return new URLSearchParams(searchParams.toString());
  };

  const isAnyParamSelected = () => {
    const params = getAllParams();
    let hasFilters = false;
    params.forEach((value, key) => {
      if (key !== 'type' && key !== 'category' && value.length > 0) {
        hasFilters = true;
      }
    });
    return hasFilters;
  };

  function getRangeValues(id: RangeFilterId | undefined): [number, number] | undefined {
    if (!id) return undefined;
    const value = searchParams.get(id);
    return value ? (value.split(',').map(Number) as [number, number]) : undefined;
  }

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleRangeChange = useCallback(
    (id: RangeFilterId | undefined, values: [number, number]) => {
      if (!id) return;

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(id, values.join(','));
        router.push(`/seek?${params.toString()}`, { scroll: false });
      }, 300);
    },
    [router, searchParams],
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    handleParamChange,
    getSelectedParams,
    clearAllParams,
    getAllParams,
    isAnyParamSelected,
    handleContentTypeChange,
    getContentType,
    getRangeValues,
    handleRangeChange,
  };
}
