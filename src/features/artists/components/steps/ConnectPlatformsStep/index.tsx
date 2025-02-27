import { Match, MatchedArtist } from '@/features/artists/types';
import { validateAnyPlatformUrl } from '@/features/artists/utils/platformUrlValidators';
import { PlatformType } from '@/features/gems/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { useEffect, useState } from 'react';
import { ArtistMatchCard } from './ArtistMatchCard';
import { ManualLinkInput } from './ManualLinkInput';
import Link from 'next/link';

interface ConnectPlatformsStepProps {
  artistData: ExternalPlatformArtistData;
  onPrevious: () => void;
  onComplete: (mergedArtistData: ExternalPlatformArtistData) => void;
}

export function ConnectPlatformsStep({ artistData, onPrevious, onComplete }: ConnectPlatformsStepProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMatches, setSelectedMatches] = useState<Record<string, string>>({});
  const [manualLinks, setManualLinks] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const currentPlatform = Object.keys(artistData.links || {})[0] as PlatformType;

  const connectedPlatforms = new Set([currentPlatform]);

  const supportedPlatforms: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal'].filter(
    (platform) => !connectedPlatforms.has(platform as PlatformType),
  ) as PlatformType[];

  const otherPlatforms: PlatformType[] = ['bandcamp', 'appleMusic', 'instagram', 'xTwitter'] as PlatformType[];

  const validSkipPlatform = ['spotify', 'soundcloud', 'youtube', 'tidal'].includes(currentPlatform)
    ? (currentPlatform as 'spotify' | 'soundcloud' | 'youtube' | 'tidal')
    : undefined;

  const findAcrossPlatformsQuery = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    {
      artistName: artistData.name,
      skipPlatform: validSkipPlatform,
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  );

  useEffect(() => {
    if (findAcrossPlatformsQuery.data && findAcrossPlatformsQuery.data.matches) {
      // Set matches directly since deduplication is now handled in the backend
      setMatches(findAcrossPlatformsQuery.data.matches);
      setIsSearching(false);
    }
  }, [findAcrossPlatformsQuery.data]);

  useEffect(() => {
    if (findAcrossPlatformsQuery.isLoading) {
      setIsSearching(true);
    } else if (findAcrossPlatformsQuery.error) {
      setIsSearching(false);
    }
  }, [findAcrossPlatformsQuery.isLoading, findAcrossPlatformsQuery.error]);

  function handleSearch() {
    setIsSearching(true);
    findAcrossPlatformsQuery.refetch();
  }

  function toggleSelectMatch(platformId: string, artistId: string) {
    setSelectedMatches((prev) => {
      const newSelection = { ...prev };

      if (newSelection[platformId] === artistId) {
        delete newSelection[platformId];
      } else {
        newSelection[platformId] = artistId;
      }

      return newSelection;
    });
  }

  function handleManualLinkUpdate(platform: string, url: string) {
    if (url) {
      const validation = validateAnyPlatformUrl(url, platform as PlatformType);

      if (!validation.isValid) {
        setValidationErrors((prev) => ({
          ...prev,
          [platform]: validation.error || 'Invalid URL',
        }));
        return;
      } else {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[platform];
          return newErrors;
        });
      }
    } else {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }

    setManualLinks((prev) => ({
      ...prev,
      [platform]: url,
    }));
  }

  function handleComplete() {
    // Validate all manual links before completing
    let hasErrors = false;
    const newErrors: Record<string, string> = {};

    Object.entries(manualLinks).forEach(([platform, url]) => {
      if (url) {
        const validation = validateAnyPlatformUrl(url, platform as PlatformType);
        if (!validation.isValid) {
          hasErrors = true;
          newErrors[platform] = validation.error || 'Invalid URL';
        }
      }
    });

    if (hasErrors) {
      setValidationErrors(newErrors);
      return;
    }

    const mergedData: ExternalPlatformArtistData = {
      ...artistData,
      links: { ...(artistData.links || {}) },
      audience: { ...(artistData.audience || {}) },
      metadata: { ...(artistData.metadata || {}) },
    };

    for (const match of matches) {
      for (const platformMatch of match.platformMatches) {
        const platform = platformMatch.platform;
        const artistId = selectedMatches[platform];

        if (artistId) {
          const selectedArtist = platformMatch.possibleArtists?.find((artist: MatchedArtist) => artist.artistId === artistId);

          if (selectedArtist) {
            if (!mergedData.links) mergedData.links = {};
            mergedData.links[platform] = selectedArtist.artistUrl;
          }
        }
      }
    }

    for (const [platform, url] of Object.entries(manualLinks)) {
      if (url) {
        if (!mergedData.links) mergedData.links = {};
        mergedData.links[platform] = url;
      }
    }

    onComplete(mergedData);
  }

  function formatDisplayUrl(fullUrl: string): string {
    try {
      const urlObj = new URL(fullUrl);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      return hostname;
    } catch {
      return 'link';
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography variant="h3">Connect {artistData.name} to More Platforms</Typography>
        <Typography variant="muted">
          Connect this artist to other music platforms to show all their music in one place. We&apos;ll try to find them automatically, or
          you can add links manually.
        </Typography>
      </div>

      <div className="space-y-2">
        <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
          Currently connected
        </Typography>

        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Icons.Check className="w-4 h-4 text-green-700 dark:text-green-400" />
            </div>
            <Typography className="font-medium capitalize">{currentPlatform}</Typography>
            <div className="flex-1" />
            <Button variant="ghost">
              <a href={Object.values(artistData.links || {})[0]} target="_blank" rel="noopener noreferrer">
                <Icons.ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Find on other platforms
          </Typography>

          {(findAcrossPlatformsQuery.error || (!isSearching && findAcrossPlatformsQuery.isFetched)) && (
            <Button
              variant="secondary"
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
            >
              {isSearching ? <Icons.Loader className="w-3.5 h-3.5 animate-spin" /> : <Icons.RefreshCw className="w-3.5 h-3.5" />}
              {isSearching ? 'Searching...' : 'Retry Search'}
            </Button>
          )}
        </div>

        {!isSearching && !matches.length && !findAcrossPlatformsQuery.error && !findAcrossPlatformsQuery.isFetched && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
            <Typography variant="muted">Searching for matches automatically...</Typography>
            <Typography variant="small" className="text-gray-500 dark:text-gray-400 mt-1">
              We&apos;ll skip searching on {currentPlatform} since you&apos;re already connected there.
            </Typography>
          </div>
        )}

        {findAcrossPlatformsQuery.error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
            <Typography variant="small" className="text-red-700 dark:text-red-400">
              {findAcrossPlatformsQuery.error.message || 'Couldn&apos;t find matches for this artist. Try adding links manually.'}
            </Typography>
          </div>
        )}

        {!isSearching && findAcrossPlatformsQuery.isFetched && !findAcrossPlatformsQuery.error && matches.length === 0 && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800 text-center">
            <Typography variant="small" className="text-amber-700 dark:text-amber-400">
              No matches found for this artist on other platforms. Try adding links manually.
            </Typography>
          </div>
        )}

        {isSearching && (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-amber-400 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
                <div className="absolute inset-4 rounded-full border-2 border-t-transparent border-r-transparent border-b-amber-300 border-l-transparent animate-spin animation-delay-300"></div>
              </div>

              <Typography variant="h4" className="font-semibold text-gray-800 dark:text-gray-200">
                Finding {artistData.name}
              </Typography>

              <Typography variant="muted">
                Searching across {supportedPlatforms.length} platform{supportedPlatforms.length !== 1 ? 's' : ''}...
              </Typography>

              <div className="flex flex-wrap gap-2 justify-center mt-1 max-w-md">
                {supportedPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-xs font-medium capitalize shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-1.5"
                  >
                    {platform === 'spotify' && <Icons.Music className="w-3.5 h-3.5 text-green-500" />}
                    {platform === 'soundcloud' && <Icons.Cloud className="w-3.5 h-3.5 text-orange-500" />}
                    {platform === 'youtube' && <Icons.Video className="w-3.5 h-3.5 text-red-500" />}
                    {platform === 'tidal' && <Icons.Waves className="w-3.5 h-3.5 text-blue-500" />}
                    {platform}
                  </span>
                ))}
              </div>

              <Typography variant="small" className="text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                This may take a moment as we search for the best matches across multiple music platforms.
              </Typography>
            </div>
          </div>
        )}

        {!isSearching && matches.length > 0 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
              <Typography variant="small" className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Icons.Info className="w-4 h-4" />
                <span>Select the best match for each platform to connect with {artistData.name}</span>
              </Typography>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Only show SoundCloud if not already connected */}
              {!connectedPlatforms.has('soundcloud') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800/50">
                    <Icons.Cloud className="w-4 h-4 text-orange-500" />
                    <Typography variant="small" className="font-medium text-orange-700 dark:text-orange-400">
                      SoundCloud
                    </Typography>
                  </div>

                  {matches.flatMap((match) =>
                    match.platformMatches
                      .filter((pm) => pm.platform === 'soundcloud' && pm.possibleArtists?.length)
                      .flatMap(
                        (pm) =>
                          pm.possibleArtists
                            ?.sort((a, b) => b.confidence - a.confidence)
                            .slice(0, 3)
                            .map((artist) => (
                              <ArtistMatchCard
                                key={artist.artistId}
                                artist={artist}
                                platform="soundcloud"
                                isSelected={selectedMatches['soundcloud'] === artist.artistId}
                                onToggleSelect={() => toggleSelectMatch('soundcloud', artist.artistId)}
                              />
                            )) || [],
                      ),
                  )}

                  {!matches.some((match) =>
                    match.platformMatches.some((pm) => pm.platform === 'soundcloud' && pm.possibleArtists?.length),
                  ) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                      <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                        No SoundCloud matches found
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {/* Only show YouTube if not already connected */}
              {!connectedPlatforms.has('youtube') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/50">
                    <Icons.Video className="w-4 h-4 text-red-500" />
                    <Typography variant="small" className="font-medium text-red-700 dark:text-red-400">
                      YouTube
                    </Typography>
                  </div>

                  {matches.flatMap((match) =>
                    match.platformMatches
                      .filter((pm) => pm.platform === 'youtube' && pm.possibleArtists?.length)
                      .flatMap(
                        (pm) =>
                          pm.possibleArtists
                            ?.sort((a, b) => b.confidence - a.confidence)
                            .slice(0, 3)
                            .map((artist) => (
                              <ArtistMatchCard
                                key={artist.artistId}
                                artist={artist}
                                platform="youtube"
                                isSelected={selectedMatches['youtube'] === artist.artistId}
                                onToggleSelect={() => toggleSelectMatch('youtube', artist.artistId)}
                              />
                            )) || [],
                      ),
                  )}

                  {!matches.some((match) =>
                    match.platformMatches.some((pm) => pm.platform === 'youtube' && pm.possibleArtists?.length),
                  ) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                      <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                        No YouTube matches found
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {/* Only show Tidal if not already connected */}
              {!connectedPlatforms.has('tidal') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
                    <Icons.Waves className="w-4 h-4 text-blue-500" />
                    <Typography variant="small" className="font-medium text-blue-700 dark:text-blue-400">
                      Tidal
                    </Typography>
                  </div>

                  {matches.flatMap((match) =>
                    match.platformMatches
                      .filter((pm) => pm.platform === 'tidal' && pm.possibleArtists?.length)
                      .flatMap(
                        (pm) =>
                          pm.possibleArtists
                            ?.sort((a, b) => b.confidence - a.confidence)
                            .slice(0, 3)
                            .map((artist) => (
                              <ArtistMatchCard
                                key={artist.artistId}
                                artist={artist}
                                platform="tidal"
                                isSelected={selectedMatches['tidal'] === artist.artistId}
                                onToggleSelect={() => toggleSelectMatch('tidal', artist.artistId)}
                              />
                            )) || [],
                      ),
                  )}

                  {!matches.some((match) => match.platformMatches.some((pm) => pm.platform === 'tidal' && pm.possibleArtists?.length)) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                      <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                        No Tidal matches found
                      </Typography>
                    </div>
                  )}
                </div>
              )}

              {/* Only show Spotify if not already connected */}
              {!connectedPlatforms.has('spotify') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/50">
                    <Icons.Music className="w-4 h-4 text-green-500" />
                    <Typography variant="small" className="font-medium text-green-700 dark:text-green-400">
                      Spotify
                    </Typography>
                  </div>

                  {matches.flatMap((match) =>
                    match.platformMatches
                      .filter((pm) => pm.platform === 'spotify' && pm.possibleArtists?.length)
                      .flatMap(
                        (pm) =>
                          pm.possibleArtists
                            ?.sort((a, b) => b.confidence - a.confidence)
                            .slice(0, 3)
                            .map((artist) => (
                              <ArtistMatchCard
                                key={artist.artistId}
                                artist={artist}
                                platform="spotify"
                                isSelected={selectedMatches['spotify'] === artist.artistId}
                                onToggleSelect={() => toggleSelectMatch('spotify', artist.artistId)}
                              />
                            )) || [],
                      ),
                  )}

                  {!matches.some((match) =>
                    match.platformMatches.some((pm) => pm.platform === 'spotify' && pm.possibleArtists?.length),
                  ) && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                      <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                        No Spotify matches found
                      </Typography>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
          Add links manually
        </Typography>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {supportedPlatforms.length > 0 && (
              <div className="space-y-3">
                <Typography variant="small" className="font-medium text-gray-600 dark:text-gray-400">
                  Supported Platforms
                </Typography>
                <div className="space-y-2">
                  {supportedPlatforms.map((platform) => (
                    <ManualLinkInput
                      key={platform}
                      platform={platform}
                      value={manualLinks[platform] || ''}
                      onChange={(url) => handleManualLinkUpdate(platform, url)}
                      disabled={!!selectedMatches[platform]}
                      disabledMessage={selectedMatches[platform] ? 'Already selected from suggestions' : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherPlatforms.length > 0 && (
              <div className="space-y-3">
                <Typography variant="small" className="font-medium text-gray-600 dark:text-gray-400">
                  Other Platforms
                </Typography>
                <div className="space-y-2">
                  {otherPlatforms.map((platform) => (
                    <ManualLinkInput
                      key={platform}
                      platform={platform}
                      value={manualLinks[platform] || ''}
                      onChange={(url) => handleManualLinkUpdate(platform, url)}
                      disabled={!!selectedMatches[platform]}
                      disabledMessage={selectedMatches[platform] ? 'Already selected from suggestions' : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consolidated Connected Platforms Section */}
      {(Object.keys(selectedMatches).length > 0 ||
        Object.entries(manualLinks).filter(([p, url]) => url && !validationErrors[p]).length > 0) && (
        <div className="space-y-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Connected Platforms Summary
          </Typography>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center gap-2 mb-3">
              <Icons.Check className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <Typography variant="small" className="font-medium text-blue-700 dark:text-blue-400">
                {Object.keys(selectedMatches).length +
                  Object.entries(manualLinks).filter(([p]) => !validationErrors[p] && manualLinks[p]).length}{' '}
                Platform
                {Object.keys(selectedMatches).length +
                  Object.entries(manualLinks).filter(([p]) => !validationErrors[p] && manualLinks[p]).length !==
                  1 && 's'}{' '}
                Connected
              </Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Render matched connections */}
              {Object.entries(selectedMatches).map(([platform, artistId]) => {
                const artist = matches
                  .flatMap((m) => m.platformMatches.filter((pm) => pm.platform === platform).flatMap((pm) => pm.possibleArtists || []))
                  .find((a) => a.artistId === artistId);

                return artist ? (
                  <div
                    key={`match-${platform}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-800 rounded-full border border-blue-200 dark:border-blue-700 text-xs group relative"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/30">
                      {platform === 'spotify' && <Icons.Music className="w-3 h-3 text-green-500" />}
                      {platform === 'soundcloud' && <Icons.Cloud className="w-3 h-3 text-orange-500" />}
                      {platform === 'youtube' && <Icons.Video className="w-3 h-3 text-red-500" />}
                      {platform === 'tidal' && <Icons.Waves className="w-3 h-3 text-blue-500" />}
                    </div>
                    <span className="capitalize font-medium">{platform}</span>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="truncate max-w-[120px]">{artist.artistName}</span>
                    <span className="ml-1 text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-1.5 rounded-full text-[10px] font-medium">
                      matched
                    </span>
                    <a
                      href={artist.artistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-500 hover:text-blue-600 flex-shrink-0 transition-colors hover:scale-110"
                    >
                      <Icons.ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : null;
              })}

              {/* Render manual connections */}
              {Object.entries(manualLinks)
                .filter(([p, url]) => url && !validationErrors[p])
                .map(([platform, url]) => {
                  // Skip if this platform already has a match
                  if (selectedMatches[platform]) return null;

                  return (
                    <div
                      key={`manual-${platform}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-800 rounded-full border border-green-200 dark:border-green-700/50 text-xs group relative"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                        {platform === 'spotify' && <Icons.Music className="w-3 h-3 text-green-500" />}
                        {platform === 'soundcloud' && <Icons.Cloud className="w-3 h-3 text-orange-500" />}
                        {platform === 'youtube' && <Icons.Video className="w-3 h-3 text-red-500" />}
                        {platform === 'tidal' && <Icons.Waves className="w-3 h-3 text-blue-500" />}
                        {platform === 'bandcamp' && <Icons.Radio className="w-3 h-3 text-teal-500" />}
                        {platform === 'appleMusic' && <Icons.Music className="w-3 h-3 text-pink-500" />}
                        {platform === 'instagram' && <Icons.Camera className="w-3 h-3 text-purple-500" />}
                        {platform === 'xTwitter' && <Icons.MessageCircle className="w-3 h-3 text-blue-400" />}
                      </div>
                      <span className="capitalize font-medium">{platform === 'appleMusic' ? 'Apple Music' : platform}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className="truncate max-w-[60px]">{formatDisplayUrl(url)}</span>
                      <span className="ml-1 text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-1.5 rounded-full text-[10px] font-medium">
                        manual
                      </span>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-500 hover:text-blue-600 flex-shrink-0 transition-colors hover:scale-110"
                      >
                        <Icons.ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>

        <Button onClick={handleComplete} disabled={Object.keys(validationErrors).length > 0}>
          Complete
        </Button>
      </div>
    </div>
  );
}
