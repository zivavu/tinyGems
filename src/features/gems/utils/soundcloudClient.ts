interface SoundCloudTrackInfo {
  coverImage?: string;
  images?: string[];
  duration: number;
  title: string;
  artist: string;
}

export async function getSoundCloudTrackInfo(url: string): Promise<SoundCloudTrackInfo | null> {
  try {
    const response = await fetch(`/api/soundcloud?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch track info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching SoundCloud track:', error);
    return null;
  }
}
