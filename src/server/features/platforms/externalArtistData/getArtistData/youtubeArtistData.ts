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

interface YoutubeVideoData {
  kind: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    tags?: string[];
    categoryId?: string;
  };
  contentDetails?: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
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

export async function fetchYoutubeArtistTracks(channelId: string, limit: number = 10) {
  try {
    // First, get the uploads playlist ID for the channel
    const channelResponse = await fetch(
      `${YOUTUBE_API_URL}/channels?` +
        new URLSearchParams({
          part: 'contentDetails',
          id: channelId,
          key: YOUTUBE_API_KEY || '',
        }),
    );

    if (!channelResponse.ok) {
      throw new Error(`Failed to fetch YouTube channel data: ${await channelResponse.text()}`);
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist for this channel');
    }

    // Now get the videos from the uploads playlist
    const videosResponse = await fetch(
      `${YOUTUBE_API_URL}/playlistItems?` +
        new URLSearchParams({
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults: limit.toString(),
          key: YOUTUBE_API_KEY || '',
        }),
    );

    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch YouTube videos: ${await videosResponse.text()}`);
    }

    const playlistData = await videosResponse.json();
    const videoIds = playlistData.items
      .map((item: any) => item.contentDetails?.videoId)
      .filter(Boolean)
      .join(',');

    // Get additional video details
    const videoDetailsResponse = await fetch(
      `${YOUTUBE_API_URL}/videos?` +
        new URLSearchParams({
          part: 'snippet,contentDetails,statistics',
          id: videoIds,
          key: YOUTUBE_API_KEY || '',
        }),
    );

    if (!videoDetailsResponse.ok) {
      throw new Error(`Failed to fetch YouTube video details: ${await videoDetailsResponse.text()}`);
    }

    const videoDetails = await videoDetailsResponse.json();
    const videos = videoDetails.items as YoutubeVideoData[];

    // Parse ISO 8601 duration to milliseconds
    function parseYoutubeDuration(duration: string): number {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = (parseInt(match?.[1] || '0') || 0) * 3600;
      const minutes = (parseInt(match?.[2] || '0') || 0) * 60;
      const seconds = parseInt(match?.[3] || '0') || 0;
      return (hours + minutes + seconds) * 1000; // Convert to milliseconds
    }

    return videos.map((video) => ({
      id: video.id,
      name: video.snippet.title,
      duration: video.contentDetails?.duration ? parseYoutubeDuration(video.contentDetails.duration) : undefined,
      previewUrl: null,
      externalUrl: `https://www.youtube.com/watch?v=${video.id}`,
      popularity: video.statistics?.viewCount ? parseInt(video.statistics.viewCount) : undefined,
      image: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
      publishedAt: video.snippet.publishedAt,
      likes: video.statistics?.likeCount ? parseInt(video.statistics.likeCount) : undefined,
      views: video.statistics?.viewCount ? parseInt(video.statistics.viewCount) : undefined,
    }));
  } catch (error) {
    console.error('Error fetching YouTube artist tracks:', error);
    throw error;
  }
}
