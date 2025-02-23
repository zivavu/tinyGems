import { PlatformType } from '@/features/gems/types';

const platformArtistUrlPatterns: Omit<Record<PlatformType, RegExp>, 'other'> = {
  spotify: /^https?:\/\/(?:open\.)?spotify\.com\/artist\/[a-zA-Z0-9]+(?:\?.*)?$/,
  soundcloud: /^https?:\/\/(?:www\.)?soundcloud\.com\/[a-zA-Z0-9-_]+(?:\/)?$/,
  youtube: /^https?:\/\/(?:www\.)?youtube\.com\/(?:c\/|channel\/|@)?[a-zA-Z0-9-_]+(?:\/)?$/,
  tidal: /^https?:\/\/(?:listen\.)?tidal\.com\/(?:artist|browse\/artist)\/\d+(?:\?.*)?$/,
  bandcamp: /^https?:\/\/[a-zA-Z0-9-]+\.bandcamp\.com(?:\/)?$/,
  appleMusic: /^https?:\/\/music\.apple\.com\/(?:[a-z]{2}\/)?artist\/[a-zA-Z0-9-]+\/\d+(?:\?.*)?$/,
};

const artistValidationErrorMessages: Record<PlatformType | 'generic', string> = {
  spotify: "Invalid Spotify artist URL. Example: 'https://open.spotify.com/artist/...'",
  soundcloud: "Invalid SoundCloud profile URL. Example: 'https://soundcloud.com/artist-name'",
  youtube: "Invalid YouTube channel URL. Example: 'https://youtube.com/@channel-name'",
  tidal: "Invalid Tidal artist URL. Example: 'https://listen.tidal.com/artist/...'",
  bandcamp: "Invalid Bandcamp profile URL. Example: 'https://artist-name.bandcamp.com'",
  appleMusic: "Invalid Apple Music artist URL. Example: 'https://music.apple.com/artist/...'",
  other: "Please enter a valid URL starting with 'http://' or 'https://'",
  generic: "Oops! That URL doesn't look right. Try pasting a link from Spotify, SoundCloud, YouTube, or Tidal.",
};

const artistDataFetchingSupportedPlatforms: PlatformType[] = ['spotify', 'soundcloud', 'youtube', 'tidal'];

export function validatePlatformArtistUrl(url: string) {
  if (!url) return { isValid: false, error: 'Please paste an artist URL' };

  const platform = Object.keys(platformArtistUrlPatterns).find((platform) => url.includes(platform));

  if (!artistDataFetchingSupportedPlatforms.includes(platform as PlatformType)) {
    return {
      isValid: false,
      error: "We don't support this platform yet. Please paste an artist URL from Spotify, SoundCloud, YouTube, or Tidal.",
    };
  }

  const isValid = Object.entries(platformArtistUrlPatterns).some(([, pattern]) => {
    return pattern.test(url);
  });
  return {
    isValid,
    error: isValid ? undefined : artistValidationErrorMessages[platform as PlatformType] || artistValidationErrorMessages.generic,
  };
}
