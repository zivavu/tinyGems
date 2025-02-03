interface YouTubeVideoInfo {
  coverImage: string;
  images: string[];
  duration: string;
  title: string;
}

export async function getYouTubeVideoInfo(url: string): Promise<YouTubeVideoInfo | null> {
  return null;
  try {
    const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch video info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}
