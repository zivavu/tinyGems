import { ArtistTrack } from '@/features/artists/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const platformBaseUrls: Record<string, string> = {
  spotify: 'https://open.spotify.com/artist/',
  soundcloud: 'https://soundcloud.com/',
  youtube: 'https://youtube.com/channel/',
  tidal: 'https://listen.tidal.com/artist/',
};

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  spotify: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  soundcloud: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
  youtube: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
  tidal: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  default: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
};

const formatNumber = (num?: number): string => {
  if (num === undefined) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatPlatformName = (name: string): string => {
  if (name === 'spotify') return 'Spotify';
  if (name === 'soundcloud') return 'SoundCloud';
  if (name === 'youtube') return 'YouTube';
  if (name === 'tidal') return 'Tidal';
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export function UserProvidedURLArtistProfile({
  artistData,
  onContinue,
}: {
  artistData: ExternalPlatformArtistData;
  onContinue: (artistData: ExternalPlatformArtistData) => void;
}) {
  const [tracks, setTracks] = useState<ArtistTrack[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);

  // Get the platform ID in lowercase for consistent handling
  const platformId = artistData.platformId?.toLowerCase();

  // Get the actual platform name from the links object
  const platformName = Object.keys(artistData.links || {})[0] as 'spotify' | 'soundcloud' | 'youtube' | 'tidal' | undefined;

  // Get the platform URL directly from links object if available
  const platformUrl =
    // First try to get from the links object using platformId
    (platformId && artistData.links?.[platformId]) ||
    // Then try to check all links and use the first one
    (artistData.links && Object.values(artistData.links)[0]) ||
    // Fallback to constructing URL from base + platformId
    (platformId && platformBaseUrls[platformId] ? platformBaseUrls[platformId] + artistData.platformId : '#');

  const platformStyle = platformColors[platformId] || platformColors.default;
  const platformIcon = platformId ? platformIconsMap[platformId as keyof typeof platformIconsMap] : undefined;

  let metricLabel = '';
  let metricValue: number | undefined;

  if (platformId === 'spotify' && artistData.audience?.spotify) {
    metricLabel = 'Followers';
    metricValue = artistData.audience.spotify.followers;
  } else if (platformId === 'soundcloud' && artistData.audience?.soundcloud) {
    metricLabel = 'Followers';
    metricValue = artistData.audience.soundcloud.followers;
  } else if (platformId === 'youtube' && artistData.audience?.youtube) {
    metricLabel = 'Subscribers';
    metricValue = artistData.audience.youtube.subscribers;
  } else if (platformId === 'tidal' && artistData.audience?.tidal) {
    metricLabel = 'Popularity';
    metricValue = artistData.audience.tidal.popularity;
  }

  // Fetch tracks when component mounts
  const fetchTracks = trpcReact.externalArtistDataRouter.fetchArtistTracks.useQuery(
    {
      platformId: platformName as 'spotify' | 'soundcloud' | 'youtube' | 'tidal',
      artistId: artistData.platformId,
      limit: 5,
    },
    {
      enabled: !!platformName && !!artistData.platformId,
      // Don't refetch automatically to avoid hitting API rate limits
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  );

  useEffect(() => {
    if (platformName && artistData.platformId) {
      setIsLoadingTracks(true);
    }
  }, [platformName, artistData.platformId]);

  useEffect(() => {
    if (fetchTracks.data) {
      setTracks(fetchTracks.data as ArtistTrack[]);
      setIsLoadingTracks(false);
    }
    if (fetchTracks.error) {
      setIsLoadingTracks(false);
    }
  }, [fetchTracks.data, fetchTracks.error]);

  // Format track duration from milliseconds to mm:ss
  const formatDuration = (ms?: number) => {
    if (!ms) return '--:--';
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border shadow-sm ${platformStyle.border}`}>
      <div className={`${platformStyle.bg} p-3 flex items-center justify-between border-b ${platformStyle.border}`}>
        <div className="flex items-center gap-2">
          {platformIcon && (
            <div className={`p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm`}>
              <FontAwesomeIcon icon={platformIcon} className={`w-4 h-4 ${platformStyle.text}`} />
            </div>
          )}
          <Typography variant="small" className={`font-medium ${platformStyle.text}`}>
            {formatPlatformName(platformId || '')}
          </Typography>
        </div>

        <Link
          href={platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 ${platformStyle.text} hover:underline text-sm`}
        >
          <Icons.ExternalLink className="w-3.5 h-3.5" />
          <span>View profile</span>
        </Link>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-start gap-4">
          <div className="relative">
            {artistData.avatar ? (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Image width={90} height={90} src={artistData.avatar} alt={artistData.name} className="w-[90px] h-[90px] object-cover" />
              </div>
            ) : (
              <div className="w-[90px] h-[90px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center border border-gray-300 dark:border-gray-600">
                <Icons.Music className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Typography variant="h3" className="font-bold truncate">
              {artistData.name}
            </Typography>

            {metricValue !== undefined && (
              <div className="flex items-center mt-2">
                <div className="inline-flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  {platformId === 'spotify' && <Icons.Users className="w-3.5 h-3.5 mr-1" />}
                  {platformId === 'soundcloud' && <Icons.Users className="w-3.5 h-3.5 mr-1" />}
                  {platformId === 'youtube' && <Icons.Users className="w-3.5 h-3.5 mr-1" />}
                  {platformId === 'tidal' && <Icons.TrendingUp className="w-3.5 h-3.5 mr-1" />}
                  <span className="font-medium">{metricLabel}: </span>
                  <span className="font-bold ml-0.5">{formatNumber(metricValue)}</span>
                </div>
              </div>
            )}

            {artistData.metadata?.genres && artistData.metadata.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {artistData.metadata.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {genre}
                  </span>
                ))}
                {artistData.metadata.genres.length > 3 && (
                  <span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                    +{artistData.metadata.genres.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="small" className="font-medium flex items-center gap-1.5">
              <Icons.Music className="w-3.5 h-3.5" />
              <span>Top tracks</span>
            </Typography>
          </div>

          {isLoadingTracks && (
            <div className="flex justify-center py-4">
              <Icons.Loader className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          )}

          {!isLoadingTracks && fetchTracks.error && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <Typography variant="small" className="text-gray-500 dark:text-gray-400 text-center">
                Couldn&apos;t load tracks at this time
              </Typography>
            </div>
          )}

          {!isLoadingTracks && tracks.length === 0 && !fetchTracks.error && (
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <Typography variant="small" className="text-gray-500 dark:text-gray-400 text-center">
                No tracks available
              </Typography>
            </div>
          )}

          {!isLoadingTracks && tracks.length > 0 && (
            <div className="grid grid-cols-1 gap-1.5">
              {tracks.map((track, index) => (
                <Link
                  key={track.id}
                  href={track.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 w-4 mr-2">{index + 1}.</span>

                  {track.image && (
                    <div className="mr-2 w-8 h-8 flex-shrink-0 overflow-hidden rounded-sm border border-gray-200 dark:border-gray-700">
                      <Image width={32} height={32} src={track.image} alt={track.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <Typography variant="small" className="truncate flex items-center gap-1">
                      {track.name}
                      {track.isExplicit && (
                        <span className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 text-[10px] uppercase font-bold rounded">E</span>
                      )}
                    </Typography>

                    {track.album && (
                      <Typography variant="small" className="text-gray-500 dark:text-gray-400 truncate text-xs">
                        {track.album.name}
                      </Typography>
                    )}
                  </div>

                  <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">{formatDuration(track.duration)}</div>

                  <Icons.ExternalLink className="ml-2 w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onContinue(artistData)} className="px-4">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
