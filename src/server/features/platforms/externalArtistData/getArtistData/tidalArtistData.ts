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

interface TidalSingleArtistResponse {
  data: {
    id?: string;
    type?: string;
    attributes?: {
      name?: string;
      popularity?: number;
      imageLinks?: Array<{
        href?: string;
        meta?: {
          width?: number;
          height?: number;
        };
      }>;
      externalLinks?: Array<{
        href?: string;
        meta?: {
          type?: string;
        };
      }>;
      roles?: Array<{
        id?: number;
        name?: string;
      }>;
    };
    relationships?: {
      similarArtists?: { links: { self?: string } };
      albums?: { links: { self?: string } };
      tracks?: { links: { self?: string } };
      videos?: { links: { self?: string } };
      roles?: { links: { self?: string } };
      radio?: { links: { self?: string } };
    };
    links?: {
      self?: string;
    };
  };
  links?: {
    self?: string;
  };
}

interface TidalSearchResponse {
  included?: Array<{
    id?: string;
    type?: string;
    attributes?: {
      name?: string;
      popularity?: number;
      picture?: Array<{
        url?: string;
        width?: number;
        height?: number;
      }>;
      imageLinks?: Array<{
        href?: string;
        meta?: {
          width?: number;
          height?: number;
        };
      }>;
      externalLinks?: Array<{
        href?: string;
        meta?: {
          type?: string;
        };
      }>;
      roles?: Array<{
        id?: number;
        name?: string;
      }>;
      biography?: string;
      location?: string;
    };
  }>;
}

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

    const responseText = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      console.error('Invalid JSON in Tidal response:', responseText);
      throw new Error('Invalid response from Tidal auth service');
    }

    if (!response.ok) {
      console.error('Tidal auth error:', responseData);
      throw new Error(`Tidal auth failed: ${responseData.error || 'Unknown error'}`);
    }

    const token = responseData as TidalToken;
    currentToken = token;
    tokenExpirationTime = Date.now() + (token.expires_in - 300) * 1000;

    return token.access_token;
  } catch (error) {
    console.error('Error getting Tidal access token:', error);
    throw new Error('Failed to authenticate with Tidal');
  }
}

async function makeAuthorizedRequest(
  endpoint: string,
  params: Record<string, string> = {},
  retryCount = 0,
): Promise<TidalSingleArtistResponse | TidalSearchResponse> {
  try {
    const token = await getAccessToken();
    const searchParams = new URLSearchParams({
      ...params,
      countryCode: 'US',
    });

    const url = `${TIDAL_API_URL}${endpoint}?${searchParams}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401 && retryCount < 1) {
        currentToken = null;
        tokenExpirationTime = null;
        return makeAuthorizedRequest(endpoint, params, retryCount + 1);
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        throw new Error(`Rate limited by Tidal. Try again in ${retryAfter || 60} seconds`);
      }

      if (response.status === 404) {
        throw new Error('Resource not found on Tidal');
      }

      throw new Error(`Tidal API error: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Tidal request error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while fetching from Tidal');
  }
}

function extractTidalId(url: string): string {
  const patterns = {
    artist: /tidal\.com\/artist\/(\d+)/,
    shortUrl: /tidal\.com\/a\/(\d+)/,
  };

  for (const [, pattern] of Object.entries(patterns)) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  throw new Error('Invalid Tidal artist URL');
}

export async function fetchTidalArtistData(url: string): Promise<PlatformArtistData> {
  try {
    const artistId = extractTidalId(url);
    const data = (await makeAuthorizedRequest(`/artists/${artistId}`, {
      include: 'artists',
    })) as TidalSingleArtistResponse;

    if (!data.data) {
      throw new Error('Artist not found on Tidal');
    }

    const artist = data.data;
    return {
      name: artist.attributes?.name || 'Unknown Artist',
      platformId: artist.id || '',
      avatar: artist.attributes?.imageLinks?.[0]?.href,
      links: {
        tidal:
          artist.attributes?.externalLinks?.find((link) => link.meta?.type === 'TIDAL_SHARING')?.href ||
          `https://tidal.com/artist/${artist.id}`,
      },
      audience: {
        tidal: {
          popularity: artist.attributes?.popularity || 0,
          albums: 0,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching Tidal artist data:', error);
    throw error;
  }
}

export async function searchTidalArtist(query: string): Promise<PlatformArtistData[]> {
  try {
    const data = (await makeAuthorizedRequest(`/searchresults/${encodeURIComponent(query)}/relationships/artists`, {
      include: 'artists',
    })) as TidalSearchResponse;

    if (!data.included?.length) {
      return [];
    }

    return data.included.slice(0, 5).map((artist) => ({
      name: artist.attributes?.name || 'Unknown Artist',
      platformId: artist.id || '',
      avatar: artist.attributes?.picture?.[0]?.url || artist.attributes?.imageLinks?.[0]?.href,
      links: {
        tidal: `https://tidal.com/artist/${artist.id}`,
      },
      audience: {
        tidal: {
          popularity: artist.attributes?.popularity || 0,
          albums: 0,
          tracks: 0,
        },
      },
      metadata: {
        roles: artist.attributes?.roles?.map((role) => role.name) || [],
        description: artist.attributes?.biography || '',
        location: artist.attributes?.location || '',
      },
    }));
  } catch (error) {
    console.error('Error searching Tidal artists:', error);
    throw error;
  }
}
