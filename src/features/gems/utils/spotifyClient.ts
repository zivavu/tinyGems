interface SpotifyTrackInfo {
  coverImage?: string;
  images?: string[];
  duration: number;
  name: string;
  artist: string;
  album: string;
  releaseDate: string;
}

export async function getSpotifyTrackInfo(url: string): Promise<SpotifyTrackInfo | null> {
  try {
    const response = await fetch(`/api/spotify?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch track info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
    return null;
  }
}
