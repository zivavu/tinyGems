import { useRouter, useSearchParams } from 'next/navigation';

export function useParamFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getSelectedParams = (paramName: string) => {
    const param = searchParams.get(paramName);
    if (!param) return [];
    return param.split(',').filter(Boolean);
  };

  const handleParamChange = (paramName: string, newValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValues.length) {
      params.set(paramName, newValues.join(','));
    } else {
      params.delete(paramName);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    getSelectedParams,
    handleParamChange,
  };
}
