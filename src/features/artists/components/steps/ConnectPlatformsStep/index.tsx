import { useEffect, useState } from 'react';

import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';

import { ConnectedPlatformsRecord, MatchedArtist } from '@/features/artists/types';
import { validateAnyPlatformUrl } from '@/features/artists/utils/platformUrlValidators';
import { PlatformType } from '@/features/gems/types';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { ArtistMatchCard } from './ArtistMatchCard';
import { ManualLinkInput } from './ManualLinkInput';

// Define types for our component
interface PlatformMatch {
  platform: string;
  artistId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  confidence?: number;
}

type ConnectPlatformsStepProps = {
  artistData: ExternalPlatformArtistData;
  onPrevious: () => void;
  onComplete: (mergedArtistData: ExternalPlatformArtistData, platformLinks: ConnectedPlatformsRecord) => void;
};

export function ConnectPlatformsStep({ artistData, onPrevious, onComplete }: ConnectPlatformsStepProps) {
  // Extract current platform from the artist's platform ID
  const currentPlatform = artistData.platformId.split('-')[0];

  // State for platform matches
  const [matches, setMatches] = useState<PlatformMatch[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedMatches, setSelectedMatches] = useState<Record<string, PlatformMatch>>({});

  // State for manual links
  const [manualLinks, setManualLinks] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Define supported platforms and filter out the current one
  const supportedPlatforms = ['spotify', 'soundcloud', 'youtube', 'tidal'].filter((p) => p !== currentPlatform);
  const otherPlatforms = ['bandcamp', 'appleMusic', 'instagram', 'xTwitter'].filter((p) => p !== currentPlatform);
  const allPlatforms = [...supportedPlatforms, ...otherPlatforms];

  // Set up search query
  const findAcrossPlatformsQuery = trpcReact.externalArtistDataRouter.findAcrossPlatforms.useQuery(
    { artistName: artistData.name },
    { enabled: false },
  );

  // Perform search on mount
  useEffect(() => {
    handleSearch();
  }, []);

  // Handle search for matches
  function handleSearch() {
    setIsSearching(true);
    findAcrossPlatformsQuery.refetch().then((result) => {
      setIsSearching(false);
      if (result.data) {
        // Transform match data into a flatter structure for easier use
        const flattenedMatches: PlatformMatch[] = [];

        result.data.matches.forEach((match) => {
          match.platformMatches.forEach((platformMatch) => {
            if (platformMatch.possibleArtists) {
              platformMatch.possibleArtists.forEach((artist: MatchedArtist) => {
                flattenedMatches.push({
                  platform: platformMatch.platform,
                  artistId: artist.artistId,
                  name: artist.artistName,
                  url: artist.artistUrl,
                  thumbnailUrl: artist.thumbnailImageUrl || undefined,
                  confidence: artist.confidence,
                });
              });
            }
          });
        });

        setMatches(flattenedMatches);
      }
    });
  }

  // Define functions for handling matches and form submission
  function handleManualLinkChange(platform: string, url: string) {
    // update links and validate
    setManualLinks((prev) => ({ ...prev, [platform]: url }));

    if (!url) {
      // Remove validation error if field is empty
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
      return;
    }

    // Validate URL
    const validation = validateAnyPlatformUrl(url, platform as PlatformType);
    if (validation.isValid) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [platform]: validation.error || 'Invalid URL',
      }));
    }
  }

  function toggleSelectMatch(platform: string, platformId: string) {
    setSelectedMatches((prev) => {
      const newMatches = { ...prev };

      if (prev[platform] && prev[platform].artistId === platformId) {
        // Deselect if already selected
        delete newMatches[platform];
      } else {
        // Select new match
        const match = matches.find((m) => m.platform === platform && m.artistId === platformId);
        if (match) {
          newMatches[platform] = match;
        }
      }

      return newMatches;
    });
  }

  const handleComplete = () => {
    const platformLinks: ConnectedPlatformsRecord = {};

    // Process selected matches
    Object.entries(selectedMatches).forEach(([platform, match]) => {
      if (match) {
        platformLinks[platform] = {
          platformId: match.artistId,
          name: match.name,
          avatar: match.thumbnailUrl || undefined,
        };
      }
    });

    // Process manual links
    Object.entries(manualLinks).forEach(([platform, url]) => {
      if (url && validateAnyPlatformUrl(url, platform as PlatformType).isValid && !validationErrors[platform]) {
        platformLinks[platform] = {
          platformId: url,
          name: artistData.name || 'Unknown Artist',
        };
      }
    });

    onComplete(artistData, platformLinks);
  };

  // Component rendering
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <Typography variant="h5" data-testid="connect-platforms-title">
          Connect to other platforms
        </Typography>
        <Typography variant="muted">Match your artist across different music platforms to enhance their profile</Typography>
      </div>

      {isSearching ? (
        <div className="flex justify-center items-center p-8">
          <Icons.Loader className="animate-spin h-6 w-6 text-primary-500 mr-2" />
          <Typography variant="p">Searching for artist matches...</Typography>
        </div>
      ) : (
        <>
          {/* Platform matches section */}
          <div className="space-y-4">
            {supportedPlatforms.length > 0 && (
              <div className="space-y-4">
                <Typography variant="h6">Platform Matches</Typography>
                <div className="space-y-4">
                  {supportedPlatforms.map((platform) => {
                    const platformMatches = matches.filter((match) => match.platform === platform);
                    const hasSelectedMatch = selectedMatches[platform];

                    return (
                      <div key={platform} className="space-y-2" data-testid={`platform-section-${platform}`}>
                        <div className="flex items-center justify-between">
                          <Typography variant="p" className="capitalize">
                            {platform}
                          </Typography>
                          {(platformMatches.length > 0 || hasSelectedMatch) && (
                            <Button
                              variant="ghost"
                              className="text-sm"
                              onClick={() => toggleSelectMatch(platform, '')}
                              disabled={!hasSelectedMatch}
                              data-testid={`deselect-${platform}`}
                            >
                              <Icons.X className="w-3 h-3 mr-1" />
                              Skip
                            </Button>
                          )}
                        </div>

                        {platformMatches.length > 0 ? (
                          <div className="space-y-2">
                            {platformMatches.map((match) => (
                              <ArtistMatchCard
                                key={match.artistId}
                                artist={{
                                  artistId: match.artistId,
                                  artistName: match.name,
                                  artistUrl: match.url,
                                  thumbnailImageUrl: match.thumbnailUrl,
                                  confidence: match.confidence || 0.75,
                                }}
                                platform={platform as PlatformType}
                                isSelected={selectedMatches[platform] && selectedMatches[platform].artistId === match.artistId}
                                onToggleSelect={() => toggleSelectMatch(platform, match.artistId)}
                                data-testid={`match-card-${platform}-${match.artistId}`}
                              />
                            ))}
                          </div>
                        ) : hasSelectedMatch ? (
                          <div className="px-4 py-3 bg-primary-50 text-primary-800 rounded-lg border border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-800">
                            <Typography variant="small" className="flex items-center">
                              <Icons.Check className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                              Match selected
                            </Typography>
                          </div>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 text-gray-600 rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                            <Typography variant="small" className="flex items-center">
                              <Icons.Info className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-500" />
                              No matches found. Try adding a link manually below.
                            </Typography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Manual links section */}
            <div className="space-y-4">
              <Typography variant="h6">Add Links Manually</Typography>
              <div className="space-y-4">
                {allPlatforms.map((platform) => (
                  <div key={platform} data-testid={`manual-link-${platform}`}>
                    <ManualLinkInput
                      platform={platform}
                      value={manualLinks[platform] || ''}
                      onChange={(url) => handleManualLinkChange(platform, url)}
                      disabled={!!selectedMatches[platform]}
                      disabledMessage={selectedMatches[platform] ? 'Already selected from suggestions' : undefined}
                      data-testid={`manual-link-input-${platform}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious} data-testid="back-button">
          Back
        </Button>
        <Button onClick={handleComplete} data-testid="continue-button">
          Continue
        </Button>
      </div>
    </div>
  );
}
