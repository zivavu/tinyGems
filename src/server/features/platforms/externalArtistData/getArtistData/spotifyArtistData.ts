import 'server-only';

import SpotifyWebApi from 'spotify-web-api-node';
import { PlatformArtistData } from '../types';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getAccessToken() {
  const auth = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(auth.body.access_token);
}

export async function fetchSpotifyArtistData(platformUrl: string) {
  try {
    const match = platformUrl.match(/artist\/([a-zA-Z0-9]+)/);
    const artistId = match?.[1];

    if (!artistId) {
      throw new Error('Invalid Spotify artist URL');
    }

    await getAccessToken();

    const [artist] = await Promise.all([spotifyApi.getArtist(artistId)]);

    const artistData: PlatformArtistData = {
      name: artist.body.name,
      platformId: artist.body.id,
      avatar: artist.body.images[0]?.url,
      links: {
        spotify: `https://open.spotify.com/artist/${artist.body.id}`,
      },
      audience: {
        spotify: {
          followers: artist.body.followers.total,
          popularity: artist.body.popularity,
        },
      },
      metadata: {
        genres: artist.body.genres,
      },
    };

    return artistData;
  } catch (error) {
    console.error('Error fetching Spotify artist data:', error);
    throw error;
  }
}

export async function searchSpotifyArtist(query: string) {
  try {
    await getAccessToken();
    const response = await spotifyApi.searchArtists(query, { limit: 10 });

    return response.body.artists;
  } catch (error) {
    console.error('Error searching Spotify artists:', error);
    throw error;
  }
}
