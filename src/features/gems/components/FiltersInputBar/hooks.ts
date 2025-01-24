import { useRouter, useSearchParams } from 'next/navigation';
import { MusicFiltersId } from './filterOptions';

export function useParamFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleParamChange = (id: MusicFiltersId | undefined, values: string[]) => {
    if (!id) return;

    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(id, values.join(','));
    } else {
      params.delete(id);
    }

    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  const getSelectedParams = (id: MusicFiltersId | undefined) => {
    if (!id) return [];

    const value = searchParams.get(id);
    return value ? value.split(',') : [];
  };

  const clearAllParams = () => {
    const params = new URLSearchParams();
    params.set('category', searchParams.get('category') || '');
    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  const getAllParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    return params;
  };

  const isAnyParamSelected = () => {
    const params = getAllParams();
    return Object.values(params).some((value) => value.length > 0);
  };

  return { handleParamChange, getSelectedParams, clearAllParams, getAllParams, isAnyParamSelected };
}
