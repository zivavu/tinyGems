import { MusicGem } from '@/features/gems/types/gemsTypes';
import { cn } from '@/features/shared/utils/dummy/utils';
import { useEffect, useRef, useState } from 'react';
import { useInitEmbededPlayerControls } from './hooks/hooks';
import { getEmbedUrl, getPlatformUrl, getPreferredPlatform } from './utils';

export interface PlatformPreviewProps {
  gem: MusicGem;
  onLoad?: () => void;
}

export function PlatformPreview({ gem, onLoad }: PlatformPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { connectWithIFrame: initialize } = useInitEmbededPlayerControls({
    playerId: gem.id,
    playerType: getPreferredPlatform(gem.properties.platforms),
  });

  const preferredPlatform = getPreferredPlatform(gem.properties.platforms);
  const platformUrl = getPlatformUrl(gem.properties.platforms, preferredPlatform);
  const embedUrl = platformUrl ? getEmbedUrl(preferredPlatform, platformUrl) : null;
  const playerId = `${gem.id}-${preferredPlatform}`;

  useEffect(() => {
    if (!iframeRef.current) return;
    initialize(iframeRef.current);
  }, []);

  if (!preferredPlatform) return null;

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

  if (!embedUrl) return null;

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          Loading {preferredPlatform}...
        </div>
      )}
      <div className="relative">
        <iframe
          id={playerId}
          ref={iframeRef}
          className={cn(getIframeClassName(preferredPlatform), 'overflow-hidden, w-full')}
          height={getIframeHeight(preferredPlatform)}
          src={embedUrl}
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
