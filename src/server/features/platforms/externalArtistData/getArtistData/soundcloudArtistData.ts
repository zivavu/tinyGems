import { PlatformArtistData } from '../types';

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_API_URL = 'https://api.soundcloud.com';

async function resolveUrl(url: string) {
  try {
    const userId = url.split('/').pop();
    const resolvedUrl = `https://api.soundcloud.com/users/${encodeURIComponent(userId)}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`;
    console.log(resolvedUrl);
    const response = await fetch(resolvedUrl);

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to resolve SoundCloud URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error resolving SoundCloud URL:', error);
    throw error;
  }
}

export async function fetchSoundcloudArtistData(url: string): Promise<PlatformArtistData> {
  try {
    const artist = await resolveUrl(url);

    if (!artist || artist.kind !== 'user') {
      throw new Error('Invalid SoundCloud artist URL');
    }

    console.log(artist);
    return {
      name: artist.username,
      platformId: artist.id.toString(),
      avatar: artist.avatar_url,
      links: {
        soundcloud: artist.permalink_url,
      },
      audience: {
        soundcloud: {
          followers: artist.followers_count,
          trackPlays: artist.track_count,
        },
      },
      metadata: {
        genres: artist.genre ? [artist.genre] : [],
        description: artist.description,
        location: artist.country || artist.city,
      },
    };
  } catch (error) {
    console.error('Error fetching SoundCloud artist data:', error);
    throw error;
  }
}

export async function searchSoundcloudArtist(query: string): Promise<PlatformArtistData[]> {
  try {
    const response = await fetch(`${SOUNDCLOUD_API_URL}/users?q=${encodeURIComponent(query)}&client_id=${SOUNDCLOUD_CLIENT_ID}&limit=5`);

    if (!response.ok) {
      throw new Error('Failed to search SoundCloud artists');
    }

    const artists = await response.json();

    return artists.map((artist: any) => ({
      name: artist.username,
      platformId: artist.id.toString(),
      avatar: artist.avatar_url,
      links: {
        soundcloud: artist.permalink_url,
      },
      audience: {
        soundcloud: {
          followers: artist.followers_count,
          trackPlays: artist.track_count,
        },
      },
      metadata: {
        genres: artist.genre ? [artist.genre] : [],
        description: artist.description,
        location: artist.country || artist.city,
      },
    }));
  } catch (error) {
    console.error('Error searching SoundCloud artists:', error);
    throw error;
  }
}
