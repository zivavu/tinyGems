import { MusicGem } from '@/features/gems/types/gemsTypes';
import { usePlayerStore } from '@/features/shared/stores/playerStore';
import { cn } from '@/features/shared/utils/dummy/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Platform {
  name: string;
  url: string;
}

interface PlatformPreviewProps {
  gem: MusicGem;
  onLoad?: () => void;
}

declare global {
  interface Window {
    SC?: {
      Widget: new (iframe: HTMLIFrameElement) => {
        bind: (event: string, callback: () => void) => void;
        pause: () => void;
      };
    };
    onSpotifyIframeApiReady?: (IFrameAPI: {
      createController: (
        element: HTMLIFrameElement,
        options: { uri: string },
        callback: (EmbedController: { addListener: (event: string, callback: (e?: any) => void) => void; pause: () => void }) => void,
      ) => void;
    }) => void;
    YT?: {
      Player: new (
        iframe: HTMLIFrameElement,
        options: {
          events: {
            onReady: (event: any) => void;
            onStateChange: (event: any) => void;
          };
        },
      ) => {
        pauseVideo: () => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function getPreferredPlatform(platforms: Platform[]) {
  const platformPriority = ['youtube', 'soundcloud', 'bandcamp', 'spotify'];

  return platformPriority.find((priority) => platforms.some((p) => p.name.toLowerCase() === priority));
}

function getPlatformUrl(platforms: Platform[], platformName: string | undefined) {
  if (!platformName) return null;
  return platforms.find((p) => p.name.toLowerCase() === platformName.toLowerCase())?.url;
}

function getEmbedUrl(platform: string | undefined, url: string | undefined) {
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
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`;
    }
    default:
      return null;
  }
}

interface PlayerHandler {
  initialize: (iframe: HTMLIFrameElement, onPlay: () => void) => Promise<void>;
  pause: () => void;
  cleanup?: () => void;
}

const createYouTubeHandler = (playerId: string): PlayerHandler => {
  let player: any = null;

  return {
    initialize: async (iframe, onPlay) => {
      await loadScript('https://www.youtube.com/iframe_api', 'youtube-iframe-api');

      window.onYouTubeIframeAPIReady = () => {
        player = new window.YT.Player(iframe, {
          events: {
            onReady: () => console.log('YouTube player ready'),
            onStateChange: (event: any) => {
              if (event.data === 1) onPlay();
            },
          },
        });
      };
    },
    pause: () => player?.pauseVideo(),
    cleanup: () => delete window.onYouTubeIframeAPIReady,
  };
};

const createSoundCloudHandler = (playerId: string): PlayerHandler => {
  let widget: any = null;

  return {
    initialize: async (iframe, onPlay) => {
      await loadScript('https://w.soundcloud.com/player/api.js', 'soundcloud-api');

      widget = new window.SC.Widget(iframe);
      widget.bind('play', onPlay);
    },
    pause: () => widget?.pause(),
    cleanup: () => widget?.unbind('play'),
  };
};

const createSpotifyHandler = (playerId: string, trackUri: string): PlayerHandler => {
  let controller: any = null;

  return {
    initialize: async (iframe, onPlay) => {
      await loadScript('https://open.spotify.com/embed-podcast/iframe-api/v1', 'spotify-embed-api');

      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        IFrameAPI.createController(iframe, { uri: trackUri }, (c) => {
          controller = c;
          controller.addListener('playback_update', (e: any) => {
            if (!e.data.isPaused) onPlay();
          });
        });
      };
    },
    pause: () => controller?.pause(),
    cleanup: () => delete window.onSpotifyIframeApiReady,
  };
};

const loadScript = (src: string, id: string): Promise<void> => {
  return new Promise((resolve) => {
    if (document.getElementById(id)) return resolve();

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export function PlatformPreview({ gem, onLoad }: PlatformPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const playerHandler = useRef<PlayerHandler>();
  const { registerPlayer, unregisterPlayer, play } = usePlayerStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const preferredPlatform = getPreferredPlatform(gem.properties.platforms);
  const platformUrl = getPlatformUrl(gem.properties.platforms, preferredPlatform);
  const embedUrl = platformUrl ? getEmbedUrl(preferredPlatform, platformUrl) : null;
  const playerId = `${gem.id}-${preferredPlatform}`;

  const initializePlayer = useCallback(async () => {
    if (!iframeRef.current || !preferredPlatform || !platformUrl) return;

    const pauseHandler = () => playerHandler.current?.pause();

    switch (preferredPlatform) {
      case 'youtube':
        playerHandler.current = createYouTubeHandler(playerId);
        break;
      case 'soundcloud':
        playerHandler.current = createSoundCloudHandler(playerId);
        break;
      case 'spotify':
        const trackId = platformUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1];
        playerHandler.current = createSpotifyHandler(playerId, `spotify:track:${trackId}`);
        break;
      case 'bandcamp':
        // Bandcamp doesn't have an API, we can only handle through iframe replacement
        playerHandler.current = {
          initialize: async () => {},
          pause: () => {
            iframeRef.current?.remove();
          },
          cleanup: () => {},
        };
        break;
    }

    await playerHandler.current?.initialize(iframeRef.current, () => play(playerId));
    registerPlayer(playerId, pauseHandler);
  }, [preferredPlatform, platformUrl, playerId, play, registerPlayer]);

  useEffect(() => {
    initializePlayer();
    return () => {
      playerHandler.current?.cleanup?.();
      unregisterPlayer(playerId);
    };
  }, [initializePlayer, unregisterPlayer, playerId]);

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
        {/* Dark overlay to mask white background */}
        {preferredPlatform === 'spotify' && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
        <iframe
          ref={iframeRef}
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
