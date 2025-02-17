import { ExternalPlatformArtistData } from '../crossPlatformSearch';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

interface YoutubeChannelData {
  id: string;
  kind?: string;
  snippet: {
    title: string;
    description?: string;
    customUrl?: string;
    publishedAt?: string;
    thumbnails?: {
      default?: {
        url?: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url?: string;
        width?: number;
        height?: number;
      };
      high?: {
        url?: string;
        width?: number;
        height?: number;
      };
    };
    localized?: {
      title?: string;
      description?: string;
    };
    country?: string;
  };
  statistics?: {
    viewCount?: string;
    subscriberCount?: string;
    hiddenSubscriberCount?: boolean;
    videoCount?: string;
  };
}

async function fetchChannelData(identifier: string, type: 'id' | 'handle' = 'id') {
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    key: YOUTUBE_API_KEY || '',
  });

  if (type === 'handle') {
    params.append('forHandle', identifier.startsWith('@') ? identifier : `@${identifier}`);
  } else {
    params.append('id', identifier);
  }

  const response = await fetch(`${YOUTUBE_API_URL}/channels?${params}`);

  if (!response.ok) {
    console.error('YouTube API Response:', await response.text());
    throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.items?.length) {
    throw new Error('YouTube channel not found');
  }

  return data.items[0] as YoutubeChannelData;
}

function extractChannelIdentifier(url: string): { identifier: string; type: 'id' | 'handle' } {
  const patterns = {
    channelId: /youtube\.com\/channel\/([^\/\?\&]+)/,
    handle: /youtube\.com\/@([^\/\?\&]+)/,
    customUrl: /youtube\.com\/c\/([^\/\?\&]+)/,
    username: /youtube\.com\/user\/([^\/\?\&]+)/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return {
        identifier: match[1],
        type: type === 'handle' ? 'handle' : 'id',
      };
    }
  }

  // If no pattern matches, assume it's a handle
  const cleanUrl = url.replace(/^@/, '').trim();
  return { identifier: cleanUrl, type: 'handle' };
}

export async function fetchYoutubeArtistData(url: string) {
  try {
    const { identifier, type } = extractChannelIdentifier(url);

    const channel = await fetchChannelData(identifier, type);

    const normalizedData: ExternalPlatformArtistData = {
      name: channel?.snippet?.title,
      platformId: channel?.id,
      avatar: channel?.snippet?.thumbnails?.high?.url,
      links: {
        youtube: `https://youtube.com/channel/${channel?.id}`,
      },
      audience: {
        youtube: {
          subscribers: parseInt(channel.statistics?.subscriberCount || '0') || 0,
          totalViews: parseInt(channel.statistics?.viewCount || '0') || 0,
          videosCount: parseInt(channel.statistics?.videoCount || '0') || 0,
        },
      },
      metadata: {
        description: channel.snippet?.description,
      },
    };

    return normalizedData;
  } catch (error) {
    console.error('Error fetching YouTube artist data:', error);
    throw error;
  }
}

export async function searchYoutubeArtist(query: string) {
  try {
    const searchResponse = await fetch(
      `${YOUTUBE_API_URL}/search?` +
        new URLSearchParams({
          part: 'snippet',
          type: 'channel',
          sort: 'relevance',
          q: query,
          maxResults: '8',
          key: YOUTUBE_API_KEY || '',
        }),
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search YouTube channels');
    }

    const searchData = await searchResponse.json();

    const channels = await Promise.all(
      searchData.items.map(async (item: { snippet: { channelId: string } }) => {
        const channelData = await fetchChannelData(item.snippet.channelId);
        return channelData;
      }),
    );

    return channels;
  } catch (error) {
    console.error('Error searching YouTube channels:', error);
    throw error;
  }
}
