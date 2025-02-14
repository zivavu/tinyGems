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

interface SoundCloudSearchRecord {
  avatar_url: string;
  id: number;
  kind: string;
  permalink_url: string;
  uri: string;
  username: string;
  permalink: string;
  created_at: string;
  last_modified: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  city: string | null;
  description: string | null;
  country: string | null;
  track_count: number;
  public_favorites_count: number;
  reposts_count: number;
  followers_count: number;
  followings_count: number;
  plan: string;
  myspace_name: string | null;
  discogs_name: string | null;
  website_title: string | null;
  website: string | null;
  comments_count: number;
  online: boolean;
  likes_count: number;
  playlist_count: number;
  subscriptions: Array<unknown>;
}

let currentToken: SoundCloudToken | null = null;
let tokenExpirationTime: number | null = null;

async function getAccessToken() {
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

    const responseText = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      throw new Error('Invalid response from SoundCloud auth service');
    }

    if (!response.ok) {
      throw new Error(`SoundCloud auth failed: ${responseData.error || 'Unknown error'}`);
    }

    const token = responseData as SoundCloudToken;
    currentToken = token;
    tokenExpirationTime = Date.now() + (token.expires_in - 300) * 1000;

    return token.access_token;
  } catch (error) {
    console.error('Error getting SoundCloud access token:', error);
    throw new Error('Failed to authenticate with SoundCloud');
  }
}

async function resolveUrl(url: string) {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${SOUNDCLOUD_API_URL}/resolve?` + new URLSearchParams({ url: url }), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SoundCloud resolve error:', errorText);
      throw new Error('Failed to resolve SoundCloud URL');
    }

    const data: SoundCloudArtist = await response.json();

    if (data.kind !== 'user') {
      throw new Error('URL does not point to a SoundCloud artist');
    }

    return data;
  } catch (error) {
    console.error('Error resolving SoundCloud URL:', error);
    throw error;
  }
}

export async function fetchSoundcloudArtistData(url: string) {
  try {
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

export async function searchSoundcloudArtist(query: string) {
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

    const data: SoundCloudSearchRecord[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching SoundCloud artists:', error);
    throw error;
  }
}
