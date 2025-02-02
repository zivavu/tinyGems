import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlbumFilterId,
  albumFilterIds,
  AllFilterId,
  ArtistFilterId,
  artistFilterIds,
  SingleFilterId,
  singleFilterIds,
} from './filterOptions';

export type FiltersId = SingleFilterId | AlbumFilterId | ArtistFilterId;
export type ContentType = 'songs' | 'albums' | 'artists';

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
      songs: singleFilterIds,
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
    return (searchParams.get('type') as ContentType) || 'songs';
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

  return {
    handleParamChange,
    getSelectedParams,
    clearAllParams,
    getAllParams,
    isAnyParamSelected,
    handleContentTypeChange,
    getContentType,
  };
}
