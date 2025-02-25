import { Match, MatchedArtist } from '@/features/artists/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { useState } from 'react';
import { ArtistMatchCard } from './ArtistMatchCard';
import { ManualLinkInput } from './ManualLinkInput';

interface ConnectPlatformsStepProps {
  artistData: ExternalPlatformArtistData;
  onPrevious: () => void;
  onComplete: (mergedArtistData: ExternalPlatformArtistData) => void;
}

export function ConnectPlatformsStep({ artistData, onPrevious, onComplete }: ConnectPlatformsStepProps) {
  const [matches] = useState<Match[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMatches, setSelectedMatches] = useState<Record<string, string>>({});
  const [manualLinks, setManualLinks] = useState<Record<string, string>>({});

  // Get the starting platform
  const currentPlatform = Object.keys(artistData.links || {})[0];

  // Get platforms that are already connected (just the starting one initially)
  const connectedPlatforms = new Set([currentPlatform]);

  // Create a list of supported platforms that aren't connected yet
  const supportedPlatforms = ['spotify', 'soundcloud', 'youtube', 'tidal'].filter((platform) => !connectedPlatforms.has(platform));

  // Create a list of other common platforms for manual entry
  const otherPlatforms = ['bandcamp', 'appleMusic', 'instagram', 'twitter'].filter((platform) => !manualLinks[platform]);

  // Find artist across platforms
  const findAcrossPlatformsQuery = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery({
    artistName: artistData.name,
  });

  // Start the search process
  function handleSearch() {
    setIsSearching(true);
    findAcrossPlatformsQuery.refetch();
  }

  // Toggle selection of a match
  function toggleSelectMatch(platformId: string, artistId: string) {
    setSelectedMatches((prev) => {
      const newSelection = { ...prev };

      if (newSelection[platformId] === artistId) {
        // If already selected, deselect it
        delete newSelection[platformId];
      } else {
        // Otherwise select it
        newSelection[platformId] = artistId;
      }

      return newSelection;
    });
  }

  // Add or update a manual link
  function handleManualLinkUpdate(platform: string, url: string) {
    setManualLinks((prev) => ({
      ...prev,
      [platform]: url,
    }));
  }

  // Complete this step by merging all the data
  function handleComplete() {
    // Start with the current artist data
    const mergedData: ExternalPlatformArtistData = {
      ...artistData,
      links: { ...(artistData.links || {}) },
      audience: { ...(artistData.audience || {}) },
      metadata: { ...(artistData.metadata || {}) },
    };

    // Add selected matches data
    for (const match of matches) {
      for (const platformMatch of match.platformMatches) {
        const platform = platformMatch.platform;
        const artistId = selectedMatches[platform];

        if (artistId) {
          const selectedArtist = platformMatch.possibleArtists?.find((artist: MatchedArtist) => artist.artistId === artistId);

          if (selectedArtist) {
            // Add to links
            if (!mergedData.links) mergedData.links = {};
            mergedData.links[platform] = selectedArtist.artistUrl;
          }
        }
      }
    }

    // Add manual links
    for (const [platform, url] of Object.entries(manualLinks)) {
      if (url) {
        if (!mergedData.links) mergedData.links = {};
        mergedData.links[platform] = url;
      }
    }

    onComplete(mergedData);
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

      {/* Currently connected platforms */}
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

      {/* Find on other platforms */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Find on other platforms
          </Typography>

          <Button variant="secondary" size="sm" onClick={handleSearch} disabled={isSearching} className="flex items-center gap-2">
            {isSearching ? <Icons.Loader className="w-3.5 h-3.5 animate-spin" /> : <Icons.Search className="w-3.5 h-3.5" />}
            <span>{isSearching ? 'Searching...' : 'Search'}</span>
          </Button>
        </div>

        {!isSearching && !matches.length && !findAcrossPlatformsQuery.error && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
            <Typography variant="muted">Click &quot;Search&quot; to find this artist on other platforms automatically.</Typography>
          </div>
        )}

        {findAcrossPlatformsQuery.error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 text-center">
            <Typography variant="small" className="text-red-700 dark:text-red-400">
              {findAcrossPlatformsQuery.error.message || 'Couldn&apos;t find matches for this artist. Try adding links manually.'}
            </Typography>
          </div>
        )}

        {matches.length > 0 && (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div key={index} className="space-y-2">
                <Typography variant="small" className="font-medium">
                  Match Group {index + 1}
                </Typography>

                <div className="grid gap-2 sm:grid-cols-2">
                  {match.platformMatches.map((platformMatch) => (
                    <div key={platformMatch.platform}>
                      {platformMatch.possibleArtists && platformMatch.possibleArtists.length > 0 && (
                        <div className="space-y-2">
                          <Typography variant="small" className="font-medium capitalize">
                            {platformMatch.platform}
                          </Typography>

                          <div className="space-y-2">
                            {platformMatch.possibleArtists.slice(0, 3).map((artist) => (
                              <ArtistMatchCard
                                key={artist.artistId}
                                artist={artist}
                                platform={platformMatch.platform}
                                isSelected={selectedMatches[platformMatch.platform] === artist.artistId}
                                onToggleSelect={() => toggleSelectMatch(platformMatch.platform, artist.artistId)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual links */}
      <div className="space-y-3">
        <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
          Add links manually
        </Typography>

        <div className="space-y-2">
          {supportedPlatforms.map((platform) => (
            <ManualLinkInput
              key={platform}
              platform={platform}
              value={manualLinks[platform] || ''}
              onChange={(url) => handleManualLinkUpdate(platform, url)}
            />
          ))}

          {otherPlatforms.map((platform) => (
            <ManualLinkInput
              key={platform}
              platform={platform}
              value={manualLinks[platform] || ''}
              onChange={(url) => handleManualLinkUpdate(platform, url)}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>

        <Button onClick={handleComplete}>Complete</Button>
      </div>
    </div>
  );
}
