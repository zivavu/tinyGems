import { validatePlatformArtistUrl } from '@/features/artists/utils/platformUrlValidators';
import { PlatformType } from '@/features/gems/types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { findArtistAcrossPlatforms } from './platforms/externalArtistData/crossPlatformSearch';
import { fetchSoundcloudArtistData, searchSoundcloudArtist } from './platforms/externalArtistData/getArtistData/soundcloudArtistData';
import { fetchSpotifyArtistData, searchSpotifyArtist } from './platforms/externalArtistData/getArtistData/spotifyArtistData';
import { fetchTidalArtistData, searchTidalArtist } from './platforms/externalArtistData/getArtistData/tidalArtistData';
import { fetchYoutubeArtistData, searchYoutubeArtist } from './platforms/externalArtistData/getArtistData/youtubeArtistData';

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

export const externalArtistDataRouter = createTRPCRouter({
  fetchFromUrl: protectedProcedure
    .input(
      z.object({
        url: z
          .string()
          .url()
          .refine((url) => {
            const validate = validatePlatformArtistUrl(url);
            if (!validate.isValid) {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: validate.error,
              });
            }
            return validate.isValid;
          }),
      }),
    )
    .query(async ({ input }) => {
      try {
        const platform = Object.entries(platformHandlers).find(([, handler]) => handler.urlPattern.test(input.url))?.[0] as
          | PlatformType
          | undefined;

        if (!platform) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Unsupported platform. Only Spotify, SoundCloud, YouTube, and Tidal are supported.',
          });
        }

        const artistData = await platformHandlers[platform as keyof typeof platformHandlers].fetch(input.url);
        return { platform, artistData };
      } catch (error) {
        throw new TRPCError({
          code: error instanceof TRPCError ? error.code : 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch artist data',
        });
      }
    }),

  searchArtists: protectedProcedure
    .input(z.object({ query: z.string().min(2, 'Search query must be at least 2 characters long') }))
    .query(async ({ input }) => {
      const resuletsArray = await Promise.allSettled(
        Object.entries(platformHandlers).map(async ([platform, handler]) => {
          try {
            const data = await handler.search(input.query);
            return [platform, data];
          } catch (error) {
            console.error(`${platform} search error:`, error);
            return [platform, []];
          }
        }),
      );

      const filteredResults = resuletsArray.filter((result) => result.status === 'fulfilled');
      return Object.fromEntries(filteredResults.map((result) => result.value));
    }),

  findAcrossPlatforms: protectedProcedure
    .input(z.object({ artistName: z.string().min(2, 'Artist name must be at least 2 characters long') }))
    .query(async ({ input }) => {
      try {
        const matches = await findArtistAcrossPlatforms(input.artistName);
        if (!matches?.length) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'No matches found across platforms' });
        }
        return matches;
      } catch (error) {
        throw new TRPCError({
          code: error instanceof TRPCError ? error.code : 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Failed to find artist across platforms',
        });
      }
    }),
});
