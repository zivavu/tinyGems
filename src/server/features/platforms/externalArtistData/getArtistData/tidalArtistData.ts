import { PlatformArtistData } from '../types';

const TIDAL_AUTH_URL = 'https://auth.tidal.com/v1/oauth2/token';
const TIDAL_API_URL = 'https://openapi.tidal.com/v2';
const TIDAL_CLIENT_ID = process.env.TIDAL_CLIENT_ID;
const TIDAL_CLIENT_SECRET = process.env.TIDAL_CLIENT_SECRET;

interface TidalToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let currentToken: TidalToken | null = null;
let tokenExpirationTime: number | null = null;

async function getAccessToken(): Promise<string> {
  if (currentToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return currentToken.access_token;
  }

  try {
    const response = await fetch(TIDAL_AUTH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TIDAL_CLIENT_ID}:${TIDAL_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Tidal auth error:', error);
      throw new Error('Failed to obtain Tidal access token');
    }

    const token = (await response.json()) as TidalToken;
    currentToken = token;
    // Set expiration time 5 minutes before actual expiration to be safe
    tokenExpirationTime = Date.now() + (token.expires_in - 300) * 1000;

    return token.access_token;
  } catch (error) {
    console.error('Error getting Tidal access token:', error);
    throw error;
  }
}

async function makeAuthorizedRequest(endpoint: string, params: Record<string, string> = {}) {
  const token = await getAccessToken();
  const searchParams = new URLSearchParams({
    ...params,
    countryCode: 'US',
  });

  const response = await fetch(`${TIDAL_API_URL}${endpoint}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Tidal API error:', error);
    throw new Error('Failed to fetch data from Tidal');
  }

  return response.json();
}

interface TidalArtistResponse {
  data: {
    id: string;
    type: 'artists';
    attributes: {
      name: string;
      popularity: number;
      imageLinks: Array<{
        href: string;
        meta: {
          width: number;
          height: number;
        };
      }>;
      externalLinks: Array<{
        href: string;
        meta: {
          type: string;
        };
      }>;
      roles: string[];
    };
    relationships: {
      albums?: {
        data: Array<{ id: string; type: string }>;
      };
      tracks?: {
        data: Array<{ id: string; type: string }>;
      };
    };
  };
}

function extractTidalId(url: string): string {
  const patterns = {
    artist: /tidal\.com\/artist\/(\d+)/,
    shortUrl: /tidal\.com\/a\/(\d+)/,
  };

  for (const [_, pattern] of Object.entries(patterns)) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  throw new Error('Invalid Tidal artist URL');
}

export async function fetchTidalArtistData(url: string) {
  try {
    const artistId = extractTidalId(url);
    const data = (await makeAuthorizedRequest(`/artists/${artistId}`, {
      include: 'albums,tracks',
    })) as TidalArtistResponse;

    const artist = data.data;
    console.log('dataFetched', data.data);
    if (!artist) {
      throw new Error('Artist not found on Tidal');
    }

    return {
      name: artist.attributes.name,
      platformId: artist.id,
      avatar: artist.attributes.imageLinks?.[0]?.href,

      audience: {
        tidal: {
          popularity: artist.attributes.popularity,
          albums: artist.relationships.albums?.data.length || 0,
          tracks: artist.relationships.tracks?.data.length || 0,
        },
      },
      metadata: {
        roles: artist.attributes.roles,
      },
    };
  } catch (error) {
    console.error('Error fetching Tidal artist data:', error);
    throw error;
  }
}

export async function searchTidalArtist(query: string): Promise<PlatformArtistData[]> {
  try {
    const data = (await makeAuthorizedRequest('/search', {
      q: query,
      types: 'ARTISTS',
      limit: '5',
    })) as TidalArtistResponse;

    return data.data.map((artist) => ({
      name: artist.attributes.name,
      platformId: artist.id,
      avatar: artist.attributes.imageLinks?.[0]?.href,
      links: {
        tidal: artist.externalLinks.find((link) => link.meta.type === 'TIDAL_SHARING')?.href || `https://tidal.com/artist/${artist.id}`,
      },
      audience: {
        tidal: {
          popularity: artist.attributes.popularity,
          // Search results don't include these
          albums: 0,
          tracks: 0,
        },
      },
      metadata: {
        roles: artist.attributes.roles,
      },
    }));
  } catch (error) {
    console.error('Error searching Tidal artists:', error);
    throw error;
  }
}
