import { NextResponse } from 'next/server';

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YouTubeResponse {
  items: Array<{
    snippet: {
      title: string;
      thumbnails: {
        default: YouTubeThumbnail;
        medium: YouTubeThumbnail;
        high: YouTubeThumbnail;
        standard?: YouTubeThumbnail;
        maxres?: YouTubeThumbnail;
      };
    };
    contentDetails: {
      duration: string; // ISO 8601 duration
    };
  }>;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return NextResponse.json({ error: 'Missing video URL' }, { status: 400 });
    }

    // Extract video ID from URL
    const match = videoUrl.match(/(?:v=|\/)([\w-]{11})(?:\?|$)/);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Fetch video data from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data: YouTubeResponse = await response.json();

    if (!data.items?.[0]) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = data.items[0];
    const thumbnails = video.snippet.thumbnails;

    return NextResponse.json({
      coverImage: thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium.url,
      images: Object.values(thumbnails)
        .map((thumb) => thumb.url)
        .filter(Boolean),
      duration: video.contentDetails.duration, // ISO 8601 duration
      title: video.snippet.title,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 });
  }
}
