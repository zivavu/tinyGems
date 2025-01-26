import { MusicGem } from '@/features/gems/types/gemsTypes';
import { useState } from 'react';

interface Platform {
  name: string;
  url: string;
}

interface PlatformPreviewProps {
  gem: MusicGem;
  onLoad?: () => void;
}

export function PlatformPreview({ gem, onLoad }: PlatformPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Get highest priority available platform
  const getPreferredPlatform = (platforms: Platform[]) => {
    const platformPriority = ['youtube', 'soundcloud', 'bandcamp', 'spotify'];

    return platformPriority.find((priority) => platforms.some((p) => p.name.toLowerCase() === priority));
  };

  const getPlatformUrl = (platforms: Platform[], platformName: string) => {
    return platforms.find((p) => p.name.toLowerCase() === platformName.toLowerCase())?.url;
  };

  const getEmbedUrl = (platform: string, url: string) => {
    switch (platform.toLowerCase()) {
      case 'soundcloud': {
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
      }
      case 'bandcamp': {
        // Extract album/track ID from URL and create embed URL
        // This will need to be adjusted based on your Bandcamp URLs
        return url.replace('bandcamp.com', 'bandcamp.com/embed');
      }
      default:
        return null;
    }
  };

  const preferredPlatform = getPreferredPlatform(gem.properties.platforms);
  if (!preferredPlatform) return null;

  const platformUrl = getPlatformUrl(gem.properties.platforms, preferredPlatform);
  if (!platformUrl) return null;

  const embedUrl = getEmbedUrl(preferredPlatform, platformUrl);
  if (!embedUrl) return null;

  const getIframeHeight = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'soundcloud':
        return '166';
      case 'bandcamp':
        return '120';
      default:
        return '166';
    }
  };

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          Loading {preferredPlatform}...
        </div>
      )}
      <iframe
        className={`w-full transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        height={getIframeHeight(preferredPlatform)}
        src={embedUrl}
        frameBorder="0"
        scrolling="no"
        allow="autoplay"
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </div>
  );
}
