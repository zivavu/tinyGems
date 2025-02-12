import { PlatformType } from '@/features/gems/types';
import { fetchSpotifyArtistData, searchSpotifyArtist } from './getArtistData/spotifyArtistData';
import { PlatformArtistData } from './types';

export function parseSpotifyArtistLink(url: string) {
  const artistIdMatch = url.match(/artist\/([a-zA-Z0-9]+)/);
  if (!artistIdMatch) {
    return { platformId: '', isValid: false, error: 'Invalid Spotify artist URL' };
  }
  return { platformId: artistIdMatch[1], isValid: true };
}

export async function fetchExternalArtistData({
  platform,
  platformUrl,
}: {
  platform: PlatformType;
  platformUrl: string;
}): Promise<PlatformArtistData | null> {
  try {
    switch (platform) {
      case 'spotify':
        return await fetchSpotifyArtistData({ platformUrl });
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${platform} artist data:`, error);
    return null;
  }
}

export async function searchAcrossPlatforms(artistName: string): Promise<Record<PlatformType, PlatformArtistData[]>> {
  const results: Partial<Record<PlatformType, PlatformArtistData[]>> = {};

  try {
    // For now, we only have Spotify
    results.spotify = await searchSpotifyArtist(artistName);
  } catch (error) {
    console.error('Error searching across platforms:', error);
    results.spotify = [];
  }

  return results as Record<PlatformType, PlatformArtistData[]>;
}
