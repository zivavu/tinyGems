import { faLink } from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBandcamp, faSoundcloud, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { GemPlatformName } from '../types/gemsTypes';

export const iconsMap: Record<GemPlatformName, IconProp> = {
  bandcamp: faBandcamp,
  soundcloud: faSoundcloud,
  spotify: faSpotify,
  youtube: faYoutube,
  other: faLink,
} as const;
