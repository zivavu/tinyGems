'use client';

import { usePlayerStore } from '@/features/gems/components/GemCard/comps/stores/playerStore';
import { GemPlatformName } from '@/features/gems/types/gemsTypes';

interface PlayerHandler {
  connectWithIFrame: (iframe: HTMLIFrameElement) => Promise<void>;
}

export function useInitEmbededPlayerControls({ playerId, playerType }: { playerId: string; playerType: GemPlatformName | undefined }) {
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
    return {
      connectWithIFrame: async () => {},
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

        const currentSrc = iframe.src;
        if (!currentSrc.includes('&enable_api=1')) {
          iframe.src = `${currentSrc}&enable_api=1`;
        }
      },
    };
  }

  function createBandcampHandler(playerId: string): PlayerHandler {
    return {
      connectWithIFrame: async () => {
        // Will be implemented when you provide the iframe structure
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
