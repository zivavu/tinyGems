import { PlatformType } from '@/features/gems/types';
import { SAMPLE_ALBUMS_URLS } from '@/features/shared/utils/dummy/albums';

export interface Platform {
  name: string;
  url: string;
}

export const platformPriority = {
  gem: ['spotify', 'soundcloud', 'bandcamp', 'youtube'] as PlatformType[],
  album: ['spotify', 'bandcamp'] as PlatformType[],
};

export function getPreferredPlatform(platforms: Platform[], type: 'gem' | 'album'): PlatformType | undefined {
  return platformPriority[type].find((priority) => platforms.some((p) => p.name.toLowerCase() === priority));
}

export function getPlatformUrl(platforms: Platform[], platformName: string | undefined) {
  if (!platformName) return null;
  return platforms.find((p) => p.name.toLowerCase() === platformName.toLowerCase())?.url;
}

export function getEmbedUrl(platform: string | undefined, url: string | undefined, type: 'gem' | 'album'): string | null {
  if (!platform || !url) return null;

  switch (platform.toLowerCase()) {
    case 'youtube': {
      if (type === 'album') return null;
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&mute=0&enablejsapi=1&origin=${window.location.origin}&playsinline=1`;
    }

    case 'soundcloud': {
      if (type === 'album') return null;
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&enable_api=true`;
    }

    case 'bandcamp': {
      const bandcampAlbum = SAMPLE_ALBUMS_URLS.bandcamp.find((album) => album.url === url);
      if (!bandcampAlbum) return null;

      const commonParams = '/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/';
      return `https://bandcamp.com/EmbeddedPlayer/album=${bandcampAlbum.albumId}${commonParams}`;
    }

    case 'spotify': {
      if (type === 'album') {
        const albumId = url.match(/spotify\.com\/album\/([a-zA-Z0-9]+)/)?.[1];
        if (!albumId) return null;
        return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0&autoplay=1&enable_api=1`;
      }
      const trackId = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)?.[1];
      if (!trackId) return null;
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1&enable_api=1`;
    }

    default:
      return null;
  }
}

export function getIframeHeight(platform: string, type: 'gem' | 'album'): string {
  if (type === 'album') {
    switch (platform.toLowerCase()) {
      case 'bandcamp':
        return '600';
      case 'spotify':
        return '380';
      default:
        return '450';
    }
  }

  switch (platform.toLowerCase()) {
    case 'youtube':
      return '315';
    case 'soundcloud':
      return '315';
    case 'bandcamp':
      return '415';
    case 'spotify':
      return '352';
    default:
      return '166';
  }
}

export function getIframeClassName(platform: string, isLoaded: boolean): string {
  const baseClasses = 'transition-opacity duration-300 border-0';
  const visibilityClasses = isLoaded ? 'opacity-100' : 'opacity-0';

  switch (platform.toLowerCase()) {
    case 'spotify':
      return `${baseClasses} ${visibilityClasses} bg-transparent rounded-2xl`;
    default:
      return `${baseClasses} ${visibilityClasses}`;
  }
}
