import { PlatformArtistData } from '../types';

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
const SOUNDCLOUD_API_URL = 'https://api.soundcloud.com';
const SOUNDCLOUD_AUTH_URL = 'https://secure.soundcloud.com/oauth/token';

interface SoundCloudToken {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
}

interface SoundCloudArtist {
  id: number;
  kind: string;
  permalink: string;
  username: string;
  last_modified: string;
  uri: string;
  permalink_url: string;
  avatar_url: string;
  country: string;
  first_name: string;
  last_name: string;
  full_name: string;
  description: string;
  city: string;
  followers_count: number;
  followings_count: number;
  likes_count: number;
  track_count: number;
  website: string;
  website_title: string;
}

let currentToken: SoundCloudToken | null = null;
let tokenExpirationTime: number | null = null;

async function getAccessToken(): Promise<string> {
  if (currentToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return currentToken.access_token;
  }

  try {
    const credentials = Buffer.from(`${SOUNDCLOUD_CLIENT_ID}:${SOUNDCLOUD_CLIENT_SECRET}`).toString('base64');

    const response = await fetch(SOUNDCLOUD_AUTH_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SoundCloud token error:', errorText);
      throw new Error('Failed to obtain SoundCloud access token');
    }

    const token = (await response.json()) as SoundCloudToken;
    currentToken = token;
    tokenExpirationTime = Date.now() + (token.expires_in - 300) * 1000;

    return token.access_token;
  } catch (error) {
    console.error('Error getting SoundCloud access token:', error);
    throw error;
  }
}

async function resolveUrl(url: string): Promise<SoundCloudArtist> {
  console.log('Resolving SoundCloud URL:', url);
  try {
    const token = await getAccessToken();
    console.log('Token:', token);
    const response = await fetch(
      `${SOUNDCLOUD_API_URL}/resolve?` +
        new URLSearchParams({
          url: url,
        }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SoundCloud resolve error:', errorText);
      throw new Error('Failed to resolve SoundCloud URL');
    }

    const data = await response.json();

    if (data.kind !== 'user') {
      throw new Error('URL does not point to a SoundCloud artist');
    }

    return data;
  } catch (error) {
    console.error('Error resolving SoundCloud URL:', error);
    throw error;
  }
}

export async function fetchSoundcloudArtistData(url: string): Promise<PlatformArtistData> {
  try {
    console.log('Fetching SoundCloud artist data for URL:', url);
    const artist = await resolveUrl(url);

    return {
      name: artist.username,
      platformId: artist.id.toString(),
      avatar: artist.avatar_url,
      links: {
        soundcloud: artist.permalink_url,
        website: artist.website,
      },
      audience: {
        soundcloud: {
          followers: artist.followers_count,
        },
      },
      metadata: {
        description: artist.description,
        location: artist.city || artist.country,
      },
    };
  } catch (error) {
    console.error('Error fetching SoundCloud artist data:', error);
    throw error;
  }
}

export async function searchSoundcloudArtist(query: string): Promise<PlatformArtistData[]> {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `${SOUNDCLOUD_API_URL}/users?` +
        new URLSearchParams({
          q: query,
          limit: '5',
        }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SoundCloud search error:', errorText);
      throw new Error('Failed to search SoundCloud artists');
    }

    const artists = (await response.json()) as SoundCloudArtist[];

    return artists.map((artist) => ({
      name: artist.username,
      platformId: artist.id.toString(),
      avatar: artist.avatar_url,
      links: {
        soundcloud: artist.permalink_url,
        website: artist.website,
      },
      audience: {
        soundcloud: {
          followers: artist.followers_count,
          following: artist.followings_count,
          likes: artist.likes_count,
          tracks: artist.track_count,
        },
      },
      metadata: {
        description: artist.description,
        location: artist.city || artist.country,
        fullName: artist.full_name,
        websiteTitle: artist.website_title,
        lastModified: artist.last_modified,
      },
    }));
  } catch (error) {
    console.error('Error searching SoundCloud artists:', error);
    throw error;
  }
}
