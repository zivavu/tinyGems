import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

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

export function UserProvidedURLArtistProfile({ artistData }: { artistData: ExternalPlatformArtistData }) {
  // Get the platform ID in lowercase for consistent handling
  const platformId = artistData.platformId?.toLowerCase();

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

        {artistData.metadata?.topTracks && artistData.metadata.topTracks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Typography variant="small" className="font-medium flex items-center gap-1.5">
                <Icons.Music className="w-3.5 h-3.5" />
                <span>Top tracks</span>
              </Typography>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {artistData.metadata.topTracks.slice(0, 3).map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 w-4">{index + 1}.</span>
                  <Typography variant="small" className="ml-1 truncate">
                    {track.name}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
