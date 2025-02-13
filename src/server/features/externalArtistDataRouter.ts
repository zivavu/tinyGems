import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

import { fetchSoundcloudArtistData, searchSoundcloudArtist } from './platforms/externalArtistData/getArtistData/soundcloudArtistData';
import { fetchSpotifyArtistData, searchSpotifyArtist } from './platforms/externalArtistData/getArtistData/spotifyArtistData';
import { fetchYoutubeArtistData, searchYoutubeArtist } from './platforms/externalArtistData/getArtistData/youtubeArtistData';

const platformLinkSchema = z.object({
  url: z.string().url('Please provide a valid URL'),
});

const searchQuerySchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters long'),
});

export const externalArtistDataRouter = createTRPCRouter({
  fetchFromUrl: protectedProcedure.input(platformLinkSchema).mutation(async ({ input }) => {
    console.log('Fetching artist data from URL:', input.url);
    try {
      if (input.url.includes('spotify.com')) {
        const artistData = await fetchSpotifyArtistData(input.url);
        return { platform: 'spotify' as const, artistData };
      }

      if (input.url.includes('soundcloud.com')) {
        const artistData = await fetchSoundcloudArtistData(input.url);
        return { platform: 'soundcloud' as const, artistData };
      }

      if (input.url.includes('youtube.com') || input.url.includes('youtu.be')) {
        const artistData = await fetchYoutubeArtistData(input.url);
        return { platform: 'youtube' as const, artistData };
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Only Spotify, SoundCloud, YouTube, and Bandcamp links are supported at the moment',
      });
    } catch (error) {
      console.error('Error fetching artist data:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch artist data',
      });
    }
  }),

  searchArtists: protectedProcedure.input(searchQuerySchema).query(async ({ input }) => {
    try {
      const [spotifyResults, soundcloudResults, youtubeResults] = await Promise.all([
        searchSpotifyArtist(input.query).catch((error) => {
          console.error('Spotify search error:', error);
          return [];
        }),
        searchSoundcloudArtist(input.query).catch((error) => {
          console.error('SoundCloud search error:', error);
          return [];
        }),
        searchYoutubeArtist(input.query).catch((error) => {
          console.error('YouTube search error:', error);
          return [];
        }),
      ]);

      return {
        spotify: spotifyResults,
        soundcloud: soundcloudResults,
        youtube: youtubeResults,
      };
    } catch (error) {
      console.error('Error searching for artists:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to search for artists',
      });
    }
  }),
});
