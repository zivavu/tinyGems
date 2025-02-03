'use client';

import { Album } from '@/features/albums/types';
import { MusicGem } from '@/features/gems/types';
import { cn } from '@/features/shared/utils/dummy/utils';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '../Typography';
import { useInitEmbededPlayerControls } from './utils/useInitEmbededPlayerControls';
import { getEmbedUrl, getIframeClassName, getIframeHeight, getPlatformUrl, getPreferredPlatform } from './utils/utils';

type MediaType = MusicGem | Album;

interface MediaPreviewPlayerProps {
  media: MediaType;
  onLoad?: () => void;
  type: 'gem' | 'album';
}

export function MediaPreviewPlayer({ media, onLoad, type }: MediaPreviewPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const platforms = media.properties.platforms;
  const preferredPlatform = getPreferredPlatform(platforms, type);

  const { connectWithIFrame: initialize } = useInitEmbededPlayerControls({
    playerId: media.id,
    playerType: preferredPlatform,
    mediaType: type,
  });

  const platformUrl = getPlatformUrl(platforms, preferredPlatform);
  const embedUrl = platformUrl ? getEmbedUrl(preferredPlatform, platformUrl, type) : null;
  const playerId = `${media.id}-${preferredPlatform}`;

  useEffect(() => {
    if (!iframeRef.current) return;
    initialize(iframeRef.current);
  }, []);

  if (!preferredPlatform || !embedUrl) return null;

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <Typography variant="small">Loading {preferredPlatform}...</Typography>
        </div>
      )}
      <div className="relative">
        <iframe
          id={playerId}
          ref={iframeRef}
          className={cn(getIframeClassName(preferredPlatform, isLoaded), 'overflow-hidden w-full')}
          height={getIframeHeight(preferredPlatform, type)}
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
