import { PlatformType } from '@/features/gems/types';

const platformArtistUrlPatterns: Record<PlatformType, RegExp> = {
  spotify: /^https?:\/\/(?:open\.)?spotify\.com\/artist\/[a-zA-Z0-9]+(?:\?.*)?$/,
  soundcloud: /^https?:\/\/(?:www\.)?soundcloud\.com\/[a-zA-Z0-9-_]+(?:\/)?$/,
  youtube: /^https?:\/\/(?:www\.)?youtube\.com\/(?:c\/|channel\/|@)?[a-zA-Z0-9-_]+(?:\/)?$/,
  tidal: /^https?:\/\/(?:listen\.)?tidal\.com\/(?:artist|browse\/artist)\/\d+(?:\?.*)?$/,
  bandcamp: /^https?:\/\/[a-zA-Z0-9-]+\.bandcamp\.com(?:\/)?$/,
  appleMusic: /^https?:\/\/music\.apple\.com\/(?:[a-z]{2}\/)?artist\/[a-zA-Z0-9-]+\/\d+(?:\?.*)?$/,
  other: /^https?:\/\/.+/,
};

const artistValidationErrorMessages: Record<PlatformType, string> = {
  spotify: "Invalid Spotify artist URL. Example: 'https://open.spotify.com/artist/...'",
  soundcloud: "Invalid SoundCloud profile URL. Example: 'https://soundcloud.com/artist-name'",
  youtube: "Invalid YouTube channel URL. Example: 'https://youtube.com/@channel-name'",
  tidal: "Invalid Tidal artist URL. Example: 'https://listen.tidal.com/artist/...'",
  bandcamp: "Invalid Bandcamp profile URL. Example: 'https://artist-name.bandcamp.com'",
  appleMusic: "Invalid Apple Music artist URL. Example: 'https://music.apple.com/artist/...'",
  other: "Please enter a valid URL starting with 'http://' or 'https://'",
};

export function validatePlatformArtistUrl(url: string, platform: PlatformType): { isValid: boolean; error?: string } {
  if (!url) return { isValid: false, error: 'URL is required' };

  const pattern = platformArtistUrlPatterns[platform];
  const isValid = pattern.test(url);

  return {
    isValid,
    error: isValid ? undefined : artistValidationErrorMessages[platform],
  };
}
