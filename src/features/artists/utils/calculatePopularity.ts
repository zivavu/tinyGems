import { AudiencePerPlatform } from '../types';

/**
 * Calculates a combined popularity score from multiple platform metrics
 * Returns a score from 0-100 representing the artist's overall popularity
 */
export function calculateCombinedPopularity(audienceData: AudiencePerPlatform): number {
  // If no data, return 0
  if (!audienceData || Object.keys(audienceData).length === 0) {
    return 0;
  }

  // For Spotify only, just use their popularity score (already 0-100)
  if (Object.keys(audienceData).length === 1 && audienceData.spotify?.popularity) {
    return audienceData.spotify.popularity;
  }

  // Base weights for different platforms
  const platformWeights = {
    spotify: 1.0,
    soundcloud: 0.8,
    youtube: 0.9,
    bandcamp: 0.7,
    appleMusic: 0.9,
  };

  let totalScore = 0;
  let totalWeight = 0;

  // Calculate Spotify score
  if (audienceData.spotify) {
    let spotifyScore = 0;
    const scoreWeight = platformWeights.spotify;

    // Direct popularity score if available (0-100)
    if (audienceData.spotify.popularity) {
      spotifyScore = audienceData.spotify.popularity;
    }
    // Otherwise calculate from followers
    else if (audienceData.spotify.followers) {
      // Logarithmic scale for followers (max ~100k followers = 100 score)
      const followerScore = Math.min(100, Math.log10(audienceData.spotify.followers) * 20);
      spotifyScore = followerScore;
    }

    if (spotifyScore > 0) {
      totalScore += spotifyScore * scoreWeight;
      totalWeight += scoreWeight;
    }
  }

  // Calculate SoundCloud score
  if (audienceData.soundcloud) {
    let soundcloudScore = 0;
    const scoreWeight = platformWeights.soundcloud;

    // Calculate based on followers and plays
    if (audienceData.soundcloud.followers) {
      // Logarithmic scale (max ~50k followers = 85 score)
      const followerScore = Math.min(85, Math.log10(audienceData.soundcloud.followers) * 17);
      soundcloudScore = Math.max(soundcloudScore, followerScore);
    }

    if (audienceData.soundcloud.trackPlays) {
      // Logarithmic scale (max ~1M plays = 90 score)
      const playsScore = Math.min(90, Math.log10(audienceData.soundcloud.trackPlays) * 15);
      soundcloudScore = Math.max(soundcloudScore, playsScore);
    }

    if (audienceData.soundcloud.likes) {
      // Logarithmic scale (max ~50k likes = 80 score)
      const likesScore = Math.min(80, Math.log10(audienceData.soundcloud.likes) * 16);
      soundcloudScore = Math.max(soundcloudScore, likesScore);
    }

    if (soundcloudScore > 0) {
      totalScore += soundcloudScore * scoreWeight;
      totalWeight += scoreWeight;
    }
  }

  // Calculate YouTube score
  if (audienceData.youtube) {
    let youtubeScore = 0;
    const scoreWeight = platformWeights.youtube;

    if (audienceData.youtube.subscribers) {
      // Logarithmic scale (max ~100k subscribers = 90 score)
      const subscriberScore = Math.min(90, Math.log10(audienceData.youtube.subscribers) * 18);
      youtubeScore = Math.max(youtubeScore, subscriberScore);
    }

    if (audienceData.youtube.totalViews) {
      // Logarithmic scale (max ~10M views = 95 score)
      const viewsScore = Math.min(95, Math.log10(audienceData.youtube.totalViews) * 12);
      youtubeScore = Math.max(youtubeScore, viewsScore);
    }

    if (youtubeScore > 0) {
      totalScore += youtubeScore * scoreWeight;
      totalWeight += scoreWeight;
    }
  }

  // Calculate Bandcamp score
  if (audienceData.bandcamp) {
    let bandcampScore = 0;
    const scoreWeight = platformWeights.bandcamp;

    if (audienceData.bandcamp.followers) {
      // Logarithmic scale (max ~10k followers = 80 score)
      const followerScore = Math.min(80, Math.log10(audienceData.bandcamp.followers) * 20);
      bandcampScore = Math.max(bandcampScore, followerScore);
    }

    if (audienceData.bandcamp.supporterCount) {
      // Supporters are more valuable than followers
      const supporterScore = Math.min(85, Math.log10(audienceData.bandcamp.supporterCount) * 21);
      bandcampScore = Math.max(bandcampScore, supporterScore);
    }

    if (audienceData.bandcamp.albumsSold) {
      // Album sales are very valuable indicators
      const albumScore = Math.min(90, Math.log10(audienceData.bandcamp.albumsSold) * 22);
      bandcampScore = Math.max(bandcampScore, albumScore);
    }

    if (bandcampScore > 0) {
      totalScore += bandcampScore * scoreWeight;
      totalWeight += scoreWeight;
    }
  }

  // Calculate Apple Music score
  if (audienceData.appleMusic) {
    let appleMusicScore = 0;
    const scoreWeight = platformWeights.appleMusic;

    if (audienceData.appleMusic.popularity) {
      appleMusicScore = audienceData.appleMusic.popularity;
    } else if (audienceData.appleMusic.followers) {
      // Logarithmic scale (max ~50k followers = 85 score)
      const followerScore = Math.min(85, Math.log10(audienceData.appleMusic.followers) * 17);
      appleMusicScore = Math.max(appleMusicScore, followerScore);
    }

    if (appleMusicScore > 0) {
      totalScore += appleMusicScore * scoreWeight;
      totalWeight += scoreWeight;
    }
  }

  // If we have no scores at all, return 0
  if (totalWeight === 0) {
    return 0;
  }

  // Return weighted average rounded to nearest integer
  return Math.round(totalScore / totalWeight);
}
