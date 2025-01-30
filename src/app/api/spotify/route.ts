import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackUrl = searchParams.get('url');

    if (!trackUrl) {
      return NextResponse.json({ error: 'Missing track URL' }, { status: 400 });
    }

    // Extract track ID from URL
    const match = trackUrl.match(/track\/([a-zA-Z0-9]+)/);
    const trackId = match ? match[1] : null;

    if (!trackId) {
      return NextResponse.json({ error: 'Invalid Spotify URL' }, { status: 400 });
    }

    // Get access token
    const auth = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(auth.body.access_token);

    // Get track info
    const track = await spotifyApi.getTrack(trackId);

    return NextResponse.json({
      coverImage: track.body.album.images[0]?.url,
      images: track.body.album.images.map((img) => img.url),
      duration: track.body.duration_ms,
      name: track.body.name,
      artist: track.body.artists[0].name,
      album: track.body.album.name,
      releaseDate: track.body.album.release_date,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ error: 'Failed to fetch track info' }, { status: 500 });
  }
}
