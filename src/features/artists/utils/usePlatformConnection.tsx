import { trpcReact } from '@/lib/trpcReact';
import { toast } from 'sonner';

interface UsePlatformConnectionProps {
  initialArtistName?: string;
}

export function usePlatformConnection({ initialArtistName }: UsePlatformConnectionProps = {}) {
  const crossPlatformSearch = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: initialArtistName ?? '' },
    { enabled: Boolean(initialArtistName), refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const connectPlatform = trpcReact.externalArtistDataRouter.fetchFromUrl.useMutation({
    onSuccess: (data) => {
      if (!data.platform || !data.artistData) return;
      toast.success(`Connected ${data.platform} profile`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    suggestedMatches: crossPlatformSearch.data?.[0]?.platformMatches ?? [],
    isSearching: crossPlatformSearch.isFetching,
    connectPlatform: connectPlatform.mutate,
    isConnecting: connectPlatform.isPending,
  };
}
