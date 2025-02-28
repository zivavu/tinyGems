import { describe, expect, it } from 'vitest';
import { AudiencePerPlatform } from '../types';
import { calculateCombinedPopularity } from './calculatePopularity';

describe('calculateCombinedPopularity', () => {
  it('calculates popularity correctly with spotify data only', () => {
    const audienceData: AudiencePerPlatform = {
      spotify: {
        followers: 5000,
        popularity: 60,
      },
    };

    const result = calculateCombinedPopularity(audienceData);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
    expect(result).toBe(60); // Should just use Spotify's popularity score when only Spotify is available
  });

  it('calculates popularity correctly with multiple platforms', () => {
    const audienceData: AudiencePerPlatform = {
      spotify: {
        followers: 5000,
        popularity: 60,
      },
      soundcloud: {
        followers: 3000,
        trackPlays: 50000,
      },
      youtube: {
        subscribers: 10000,
        totalViews: 500000,
      },
    };

    const result = calculateCombinedPopularity(audienceData);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
    // The result should be weighted by platform importance
    expect(result).not.toBe(60); // Should not just be Spotify's score
  });

  it('returns 0 when no audience data is provided', () => {
    const result = calculateCombinedPopularity({});
    expect(result).toBe(0);
  });

  it('handles missing popularity metrics within platforms', () => {
    const audienceData: AudiencePerPlatform = {
      spotify: {
        followers: 5000,
        // popularity is missing
      },
      soundcloud: {
        followers: 3000,
        // trackPlays is missing
      },
    };

    const result = calculateCombinedPopularity(audienceData);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('weighs larger audience metrics more heavily', () => {
    const smallAudience: AudiencePerPlatform = {
      spotify: {
        followers: 1000,
        popularity: 40,
      },
      youtube: {
        subscribers: 2000,
        totalViews: 20000,
      },
    };

    const largeAudience: AudiencePerPlatform = {
      spotify: {
        followers: 10000,
        popularity: 40,
      },
      youtube: {
        subscribers: 50000,
        totalViews: 2000000,
      },
    };

    const smallResult = calculateCombinedPopularity(smallAudience);
    const largeResult = calculateCombinedPopularity(largeAudience);

    // The formula should give higher score to artists with larger audience
    expect(largeResult).toBeGreaterThan(smallResult);
  });
});
