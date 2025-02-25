import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { findArtistAcrossPlatforms } from './platforms/externalArtistData/crossPlatformSearch';
import { fetchSoundcloudArtistData, searchSoundcloudArtist } from './platforms/externalArtistData/getArtistData/soundcloudArtistData';
import { fetchSpotifyArtistData, searchSpotifyArtist } from './platforms/externalArtistData/getArtistData/spotifyArtistData';
import { fetchTidalArtistData, searchTidalArtist } from './platforms/externalArtistData/getArtistData/tidalArtistData';
import { fetchYoutubeArtistData, searchYoutubeArtist } from './platforms/externalArtistData/getArtistData/youtubeArtistData';
import { artistUrlSchema } from './schemas';

const platformHandlers = {
  spotify: {
    fetch: fetchSpotifyArtistData,
    search: searchSpotifyArtist,
    urlPattern: /spotify\.com/,
  },
  soundcloud: {
    fetch: fetchSoundcloudArtistData,
    search: searchSoundcloudArtist,
    urlPattern: /soundcloud\.com/,
  },
  youtube: {
    fetch: fetchYoutubeArtistData,
    search: searchYoutubeArtist,
    urlPattern: /(youtube\.com|youtu\.be)/,
  },
  tidal: {
    fetch: fetchTidalArtistData,
    search: searchTidalArtist,
    urlPattern: /tidal\.com/,
  },
} as const;

type PlatformHandlerName = keyof typeof platformHandlers;

export const externalArtistDataRouter = createTRPCRouter({
  fetchFromUrl: protectedProcedure.input(artistUrlSchema).query(async ({ input }) => {
    const platform: PlatformHandlerName | undefined = Object.entries(platformHandlers).find(([, handler]) =>
      handler.urlPattern.test(input.url),
    )?.[0] as PlatformHandlerName | undefined;

    if (!platform) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'We only support Spotify, SoundCloud, YouTube, and Tidal links for now',
      });
    }

    const artistData = await platformHandlers[platform].fetch(input.url);
    return { platform, artistData };
  }),

  fetchArtistTracks: protectedProcedure
    .input(
      z.object({
        platformId: z.enum(['spotify', 'soundcloud', 'youtube', 'tidal']),
        artistId: z.string(),
        limit: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ input }) => {
      try {
        // This is a placeholder - in a real implementation, we would call platform-specific
        // functions to fetch tracks for the given artist ID
        const platform = input.platformId;

        // Mock implementation - in production, you would replace this with actual API calls
        // to each platform's track fetching functionality
        switch (platform) {
          case 'spotify':
            // Call Spotify API to get tracks for this artist
            // return await fetchSpotifyArtistTracks(input.artistId, input.limit);
            break;
          case 'soundcloud':
            // Call SoundCloud API to get tracks for this artist
            // return await fetchSoundcloudArtistTracks(input.artistId, input.limit);
            break;
          case 'youtube':
            // Call YouTube API to get tracks for this artist
            // return await fetchYoutubeArtistTracks(input.artistId, input.limit);
            break;
          case 'tidal':
            // Call Tidal API to get tracks for this artist
            // return await fetchTidalArtistTracks(input.artistId, input.limit);
            break;
        }

        throw new TRPCError({
          code: 'NOT_IMPLEMENTED',
          message: `Fetching tracks for ${platform} is not yet implemented`,
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch artist tracks: ${(error as Error).message}`,
        });
      }
    }),

  searchArtists: protectedProcedure
    .input(z.object({ query: z.string().min(2, 'Search query must be at least 2 characters long') }))
    .query(async ({ input }) => {
      const resuletsArray = await Promise.allSettled(
        Object.entries(platformHandlers).map(async ([platform, handler]) => {
          const data = await handler.search(input.query);
          return [platform, data];
        }),
      );

      const filteredResults = resuletsArray.filter((result) => result.status === 'fulfilled');
      return Object.fromEntries(filteredResults.map((result) => result.value));
    }),

  findAcrossPlatforms: protectedProcedure
    .input(z.object({ artistName: z.string().min(2, 'Artist name must be at least 2 characters long') }))
    .query(async ({ input }) => {
      const matches = await findArtistAcrossPlatforms(input.artistName);
      if (!matches?.length) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'No matches found across platforms' });
      }
      return matches;
    }),
});
