import { Platform, PlatformType } from '../../features/gems/types';
import { getSoundCloudTrackInfo } from '../soundcloudClient';
import { getSpotifyTrackInfo } from '../spotifyClient';
import { getYouTubeVideoInfo } from '../youtubeClient';

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
      const trackInfo = await getSoundCloudTrackInfo(url);

      if (!trackInfo) return {};

      return {
        coverImage: trackInfo.coverImage,
        images: trackInfo.images,
        duration: msToMinutesAndSeconds(trackInfo.duration),
        title: trackInfo.title,
        artist: trackInfo.artist,
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

// Main function to get media info from any platform
export async function getPlatformMediaInfo(platforms: Platform[]): Promise<PlatformMediaInfo> {
  // Try platforms in order of preference
  const preferredOrder: PlatformType[] = ['spotify', 'youtube', 'soundcloud', 'bandcamp'];

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
