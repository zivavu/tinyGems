import { GemPlatform, GemPlatformName } from '../types/gemsTypes';
import { getSpotifyTrackInfo } from './spotifyClient';
import { getYouTubeVideoInfo } from './youtubeClient';

// Types for media info from different platforms
interface PlatformMediaInfo {
  coverImage?: string;
  images?: string[];
  duration?: string;
  title?: string;
  artist?: string;
  album?: string;
  releaseDate?: string;
}

// Helper to extract IDs from platform URLs
const extractIds = {
  spotify: (url: string) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  },
  youtube: (url: string) => {
    const match = url.match(/(?:v=|\/)([\w-]{11})(?:\?|$)/);
    return match ? match[1] : null;
  },
  soundcloud: (url: string) => url, // Soundcloud needs full URL for their API
  bandcamp: (url: string) => url,
};

// Platform-specific media fetchers
const mediaFetchers = {
  spotify: async (url: string): Promise<PlatformMediaInfo> => {
    try {
      const trackInfo = await getSpotifyTrackInfo(url);

      if (!trackInfo) return {};

      return {
        coverImage: trackInfo.coverImage,
        images: trackInfo.images,
        duration: msToMinutesAndSeconds(trackInfo.duration),
        title: trackInfo.name,
        artist: trackInfo.artist,
        album: trackInfo.album,
        releaseDate: trackInfo.releaseDate,
      };
    } catch (error) {
      console.error('Spotify API error:', error);
      return {};
    }
  },

  youtube: async (url: string): Promise<PlatformMediaInfo> => {
    try {
      const videoInfo = await getYouTubeVideoInfo(url);

      if (!videoInfo) return {};

      return {
        coverImage: videoInfo.coverImage,
        images: videoInfo.images,
        duration: videoInfo.duration,
        title: videoInfo.title,
      };
    } catch (error) {
      console.error('YouTube API error:', error);
      return {};
    }
  },
  soundcloud: async (url: string): Promise<PlatformMediaInfo> => {
    try {
      // Using SoundCloud API
      const response = await fetch(`https://api.soundcloud.com/resolve?url=${url}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`);
      const track = await response.json();

      return {
        coverImage: track.artwork_url?.replace('large', 't500x500'),
        images: [track.artwork_url?.replace('large', 't500x500'), track.artwork_url].filter(Boolean),
        duration: msToMinutesAndSeconds(track.duration),
      };
    } catch (error) {
      console.error('SoundCloud API error:', error);
      return {};
    }
  },
};

// Helper function to convert milliseconds to MM:SS format
function msToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}

// Helper function to parse YouTube ISO 8601 duration
function parseDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes || '0'}:`;
  result += seconds.padStart(2, '0');

  return result;
}

// Main function to get media info from any platform
export async function getPlatformMediaInfo(platforms: GemPlatform[]): Promise<PlatformMediaInfo> {
  // Try platforms in order of preference
  const preferredOrder: GemPlatformName[] = ['spotify', 'youtube', 'soundcloud', 'bandcamp'];

  for (const platformName of preferredOrder) {
    const platform = platforms.find((p) => p.name === platformName);
    if (!platform) continue;

    const fetcher = mediaFetchers[platformName as keyof typeof mediaFetchers];
    if (!fetcher) continue;

    const mediaInfo = await fetcher(platform.url);
    if (mediaInfo.coverImage) return mediaInfo;
  }

  return {};
}
