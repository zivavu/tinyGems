import { MusicGem } from '@/features/gems/types/gemsTypes';
import { cn } from '@/features/shared/utils/dummy/utils';
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
      case 'youtube': {
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];

        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&mute=0`;
      }
      case 'soundcloud': {
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
      }
      case 'bandcamp': {
        return `https://bandcamp.com/EmbeddedPlayer/album=1282391830/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`;
      }
      case 'spotify': {
        const trackId = url.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)?.[1];
        if (!trackId) return null;
        return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
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
      case 'youtube':
        return '315';
      case 'soundcloud':
        return '315';
      case 'bandcamp':
        return '470';
      case 'spotify':
        return '352'; // Compact player height
      default:
        return '166';
    }
  };

  const getIframeClassName = (platform: string) => {
    const baseClasses = 'transition-opacity duration-300 border-0';
    const visibilityClasses = isLoaded ? 'opacity-100' : 'opacity-0';

    switch (platform.toLowerCase()) {
      case 'youtube':
        return `${baseClasses} ${visibilityClasses}`;
      case 'spotify':
        return `${baseClasses} ${visibilityClasses} bg-transparent rounded-xl`;
      default:
        return `${baseClasses} ${visibilityClasses}`;
    }
  };

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          Loading {preferredPlatform}...
        </div>
      )}
      <div className="relative">
        {/* Dark overlay to mask white background */}
        {preferredPlatform === 'spotify' && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
        <iframe
          className={cn(getIframeClassName(preferredPlatform), 'overflow-hidden, w-full')}
          height={getIframeHeight(preferredPlatform)}
          src={embedUrl}
          frameBorder="0"
          scrolling="no"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
        />
      </div>
    </div>
  );
}
