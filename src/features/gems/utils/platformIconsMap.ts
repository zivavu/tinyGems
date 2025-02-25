import { faLink, faMusic } from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faApple, faBandcamp, faGithub, faSoundcloud, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { PlatformType } from '../types';

export const platformIconsMap: Record<PlatformType | 'github', IconProp> = {
  bandcamp: faBandcamp,
  soundcloud: faSoundcloud,
  spotify: faSpotify,
  youtube: faYoutube,
  github: faGithub,
  appleMusic: faApple,
  tidal: faMusic,
  other: faLink,
} as const;
