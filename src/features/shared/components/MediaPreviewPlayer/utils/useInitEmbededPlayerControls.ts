'use client';

import { PlatformType } from '@/features/gems/types';
import { usePlayerStore } from './usePlayerStore';

interface PlayerHandler {
  connectWithIFrame: (iframe: HTMLIFrameElement) => Promise<void | (() => void)>;
}

interface SoundCloudWidget {
  bind: (event: string, callback: () => void) => void;
  pause: () => void;
  play: () => void;
  seekTo: (milliseconds: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  setVolume: (volume: number) => void;
  getDuration: (callback: (duration: number) => void) => void;
  getCurrentPosition: (callback: (position: number) => void) => void;
}

interface SoundCloudWidgetAPI {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      LOAD_PROGRESS: string;
      SEEK: string;
      READY: string;
    };
  };
}

declare global {
  interface Window {
    SC?: SoundCloudWidgetAPI;
  }
}

interface UseInitEmbededPlayerControlsProps {
  playerId: string;
  playerType: PlatformType | undefined;
  mediaType?: 'gem' | 'album';
}

export function useInitEmbededPlayerControls({ playerId, playerType }: UseInitEmbededPlayerControlsProps) {
  const { registerPlayerInTheStore, setCurrentPlayer, currentPlayerId } = usePlayerStore();

  if (!playerType) return { connectWithIFrame: async () => {}, pause: () => {} };

  function createYouTubeHandler(playerId: string): PlayerHandler {
    let isInitialized = false;

    return {
      connectWithIFrame: async (iframe) => {
        iframe.addEventListener('load', () => {
          if (isInitialized) return;

          isInitialized = true;

          window.addEventListener('message', (event) => {
            if (event.origin !== 'https://www.youtube.com') return;

            try {
              const data = JSON.parse(event.data);

              if (data.event === 'infoDelivery' && data.id === playerId && data.info.playerState === 1) {
                setCurrentPlayer(playerId);
              }
            } catch (error) {
              console.error(error);
            }
          });

          // Initialize the player
          iframe.contentWindow?.postMessage(
            JSON.stringify({
              event: 'listening',
              id: playerId,
            }),
            '*',
          );
        });
        registerPlayerInTheStore({
          id: playerId,
          pauseHandler: () => {
            if (!iframe) return;
            if (currentPlayerId === playerId) return;

            iframe.contentWindow?.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'pauseVideo',
                args: [],
                id: playerId,
              }),
              '*',
            );
          },
        });
      },
    };
  }

  function createSoundCloudHandler(playerId: string): PlayerHandler {
    let widget: SoundCloudWidget | null = null;

    const loadSoundCloudAPI = async () => {
      return new Promise<SoundCloudWidgetAPI>((resolve) => {
        if (window.SC) {
          resolve(window.SC);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => resolve(window.SC!);
        document.body.appendChild(script);
      });
    };

    return {
      connectWithIFrame: async (iframe) => {
        try {
          await loadSoundCloudAPI();

          // Need to wait a bit after the API loads before initializing the widget
          await new Promise((resolve) => setTimeout(resolve, 1000));

          widget = window.SC!.Widget(iframe);

          widget.bind(window.SC!.Widget.Events.PLAY, () => {
            setCurrentPlayer(playerId);
          });

          registerPlayerInTheStore({
            id: playerId,
            pauseHandler: () => {
              if (!widget || currentPlayerId === playerId) return;
              widget.pause();
            },
          });
        } catch (error) {
          console.error('Error initializing SoundCloud widget:', error);
        }
      },
    };
  }

  function createSpotifyHandler(playerId: string): PlayerHandler {
    return {
      connectWithIFrame: async (iframe) => {
        window.addEventListener('message', (event) => {
          if (event.origin !== 'https://open.spotify.com') return;

          try {
            const data = event.data;
            if (data.type === 'playback_update' && data.payload.isPaused === false) {
              setCurrentPlayer(playerId);
            }
          } catch (error) {
            console.error(error);
          }
        });

        registerPlayerInTheStore({
          id: playerId,
          pauseHandler: () => {
            if (!iframe) return;
            if (currentPlayerId === playerId) return;

            iframe.contentWindow?.postMessage(
              {
                type: 'command',
                command: 'pause',
              },
              'https://open.spotify.com',
            );
          },
        });

        const currentSrc = iframe.src;
        if (!currentSrc.includes('&enable_api=1')) {
          iframe.src = `${currentSrc}&enable_api=1`;
        }
      },
    };
  }

  function createBandcampHandler(playerId: string): PlayerHandler {
    return {
      connectWithIFrame: async (iframe) => {
        iframe.addEventListener('load', () => {
          setCurrentPlayer(playerId);
        });
      },
    };
  }

  switch (playerType) {
    case 'youtube':
      return createYouTubeHandler(playerId);
    case 'soundcloud':
      return createSoundCloudHandler(playerId);
    case 'spotify':
      return createSpotifyHandler(playerId);
    case 'bandcamp':
      return createBandcampHandler(playerId);
    default:
      return {
        connectWithIFrame: async () => {},
      };
  }
}
