import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { ExternalPlatformArtistData, findArtistAcrossPlatforms } from './platforms/externalArtistData/crossPlatformSearch';
import {
  fetchSoundcloudArtistData,
  fetchSoundcloudArtistTracks,
  searchSoundcloudArtist,
} from './platforms/externalArtistData/getArtistData/soundcloudArtistData';
import {
  fetchSpotifyArtistData,
  fetchSpotifyArtistTracks,
  searchSpotifyArtist,
} from './platforms/externalArtistData/getArtistData/spotifyArtistData';
import {
  fetchTidalArtistData,
  fetchTidalArtistTracks,
  searchTidalArtist,
} from './platforms/externalArtistData/getArtistData/tidalArtistData';
import {
  fetchYoutubeArtistData,
  fetchYoutubeArtistTracks,
  searchYoutubeArtist,
} from './platforms/externalArtistData/getArtistData/youtubeArtistData';
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
    try {
      const url = input.url.trim();
      const platform: PlatformHandlerName | undefined = Object.entries(platformHandlers).find(([, handler]) =>
        handler.urlPattern.test(url),
      )?.[0] as PlatformHandlerName | undefined;

      if (!platform) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Please provide a valid link from Spotify, SoundCloud, YouTube, or Tidal',
        });
      }

      try {
        const artistData: ExternalPlatformArtistData = await platformHandlers[platform].fetch(url);
        return { platform, artistData };
      } catch {
        let errorMessage = `We couldn't find an artist at this ${platform} URL.`;

        switch (platform) {
          case 'spotify':
            errorMessage = "We couldn't find this Spotify artist. Make sure you're linking to an artist profile, not a track or playlist.";
            break;
          case 'soundcloud':
            errorMessage =
              "We couldn't find this SoundCloud artist. Make sure you're linking to an artist profile, not a track or playlist.";
            break;
          case 'youtube':
            errorMessage = "We couldn't find this YouTube channel. Make sure you're linking to a channel, not a video or playlist.";
            break;
          case 'tidal':
            errorMessage = "We couldn't find this Tidal artist. Make sure you're linking to an artist profile, not a track or album.";
            break;
        }

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: errorMessage,
        });
      }
    } catch (error) {
      if (error instanceof TRPCError) {
        console.log(error);
        throw error;
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong. Please try again later.',
      });
    }
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
        const platform = input.platformId;

        switch (platform) {
          case 'spotify':
            return await fetchSpotifyArtistTracks(input.artistId, input.limit);
          case 'soundcloud':
            return await fetchSoundcloudArtistTracks(input.artistId, input.limit);
          case 'youtube':
            return await fetchYoutubeArtistTracks(input.artistId, input.limit);
          case 'tidal':
            return await fetchTidalArtistTracks(input.artistId, input.limit);
          default:
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: `Unknown platform: ${platform}`,
            });
        }
      } catch (error) {
        console.error(`Error fetching tracks for ${input.platformId}:`, error);
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
    .input(
      z.object({
        artistName: z.string().min(2, 'Artist name must be at least 2 characters long'),
        skipPlatform: z.enum(['spotify', 'soundcloud', 'youtube', 'tidal']).optional(),
      }),
    )
    .query(async ({ input }) => {
      const matches = await findArtistAcrossPlatforms(input.artistName, input.skipPlatform);
      if (!matches?.length) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'No matches found across platforms' });
      }
      return { matches };
    }),
});
