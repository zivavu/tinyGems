import { faLink, faWaveSquare } from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faApple,
  faBandcamp,
  faGithub,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { PlatformType } from '../types';

export const platformIconsMap: Record<PlatformType | 'github', IconProp> = {
  bandcamp: faBandcamp,
  soundcloud: faSoundcloud,
  spotify: faSpotify,
  youtube: faYoutube,
  github: faGithub,
  appleMusic: faApple,
  instagram: faInstagram,
  xTwitter: faXTwitter,
  tidal: faWaveSquare,
  other: faLink,
} as const;
