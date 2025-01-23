import { useRouter, useSearchParams } from 'next/navigation';

export function useParamFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleParamChange = (param: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(param, values.join(','));
    } else {
      params.delete(param);
    }

    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  const getSelectedParams = (param: string) => {
    const value = searchParams.get(param);
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
