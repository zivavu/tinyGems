import { NextResponse } from 'next/server';

interface SoundCloudTrack {
  artwork_url: string | null;
  title: string;
  duration: number;
  user: {
    username: string;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackUrl = searchParams.get('url');

    if (!trackUrl) {
      return NextResponse.json({ error: 'Missing track URL' }, { status: 400 });
    }

    // First, resolve the URL to get track info
    const resolveUrl = `https://api.soundcloud.com/resolve?url=${encodeURIComponent(trackUrl)}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`;
    const resolveResponse = await fetch(resolveUrl);

    if (!resolveResponse.ok) {
      throw new Error(`SoundCloud resolve error: ${resolveResponse.statusText}`);
    }

    const track: SoundCloudTrack = await resolveResponse.json();

    // SoundCloud artwork URLs come in small size by default
    // We can get larger versions by replacing the size in the URL
    const artworkUrl = track.artwork_url ? track.artwork_url.replace('-large', '-t500x500') : null;

    return NextResponse.json({
      coverImage: artworkUrl,
      images: artworkUrl
        ? [
            artworkUrl,
            track.artwork_url, // Original size as fallback
          ].filter(Boolean)
        : [],
      duration: track.duration,
      title: track.title,
      artist: track.user.username,
    });
  } catch (error) {
    console.error('SoundCloud API error:', error);
    return NextResponse.json({ error: 'Failed to fetch track info' }, { status: 500 });
  }
}
