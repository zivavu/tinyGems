import { GemPlatformName } from '@/features/gems/types';

export interface Platform {
  name: string;
  url: string;
}

export const platformPriority = ['youtube', 'soundcloud', 'bandcamp', 'spotify'] as GemPlatformName[];

export function getPreferredPlatform(platforms: Platform[]) {
  return platformPriority.find((priority) => platforms.some((p) => p.name.toLowerCase() === priority));
}

export function getPlatformUrl(platforms: Platform[], platformName: string | undefined) {
  if (!platformName) return null;
  return platforms.find((p) => p.name.toLowerCase() === platformName.toLowerCase())?.url;
}

export function getEmbedUrl(platform: string | undefined, url: string | undefined) {
  if (!platform || !url) return null;
  switch (platform.toLowerCase()) {
    case 'youtube': {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];

      if (!videoId) return null;
      // Added enablejsapi=1 and origin parameter for postMessage API
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&mute=0&enablejsapi=1&origin=${window.location.origin}&playsinline=1`;
    }
    case 'soundcloud': {
      // Added enable_api=true for Widget API
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&enable_api=true`;
    }
    case 'bandcamp': {
      return `https://bandcamp.com/EmbeddedPlayer/album=1282391830/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`;
    }
    case 'spotify': {
      const trackId = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)?.[1];
      if (!trackId) return null;
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1&enable_api=1`;
    }
    default:
      return null;
  }
}
