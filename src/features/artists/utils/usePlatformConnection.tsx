import { trpcReact } from '@/lib/trpcReact';

interface UsePlatformConnectionProps {
  initialArtistName?: string;
  initialArtistUrl?: string;
}

export function usePlatformConnection({ initialArtistName, initialArtistUrl }: UsePlatformConnectionProps = {}) {
  const crossPlatformSearch = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: initialArtistName ?? '' },
    { enabled: Boolean(initialArtistName), refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const connectPlatform = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery({ url: initialArtistUrl ?? '' });

  return {
    suggestedMatches: crossPlatformSearch.data?.[0]?.platformMatches ?? [],
    isSearching: crossPlatformSearch.isFetching,
    connectPlatform: connectPlatform,
    isConnecting: connectPlatform.isPending,
  };
}
