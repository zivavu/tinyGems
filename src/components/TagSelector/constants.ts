import {
  AU,
  BR,
  CA,
  CN,
  DE,
  DK,
  ES,
  FI,
  FR,
  GB,
  GR,
  ID,
  IL,
  IN,
  IT,
  JP,
  KR,
  MX,
  NL,
  NO,
  PH,
  PL,
  PT,
  RU,
  SA,
  SE,
  TH,
  TR,
  UA,
  VN,
} from 'country-flag-icons/react/3x2';

export const languageFlags = {
  en: GB,
  es: ES,
  ja: JP,
  ko: KR,
  fr: FR,
  de: DE,
  it: IT,
  pt: PT,
  'pt-br': BR,
  zh: CN,
  ru: RU,
  hi: IN,
  ar: SA,
  th: TH,
  vi: VN,
  id: ID,
  tl: PH,
  tr: TR,
  pl: PL,
  uk: UA,
  nl: NL,
  'es-mx': MX,
  'en-ca': CA,
  'en-au': AU,
  sv: SE,
  no: NO,
  da: DK,
  fi: FI,
  el: GR,
  he: IL,
} as const;

export const languages = [
  { code: 'en', name: 'English', Flag: languageFlags.en },
  { code: 'es', name: 'Español', Flag: languageFlags.es },
  { code: 'ja', name: '日本語', Flag: languageFlags.ja },
  { code: 'ko', name: '한국어', Flag: languageFlags.ko },
  { code: 'fr', name: 'Français', Flag: languageFlags.fr },
  { code: 'de', name: 'Deutsch', Flag: languageFlags.de },
  { code: 'it', name: 'Italiano', Flag: languageFlags.it },
  { code: 'pt', name: 'Português', Flag: languageFlags.pt },
  { code: 'pt-br', name: 'Português (Brasil)', Flag: languageFlags['pt-br'] },
  { code: 'zh', name: '中文', Flag: languageFlags.zh },
  { code: 'ru', name: 'Русский', Flag: languageFlags.ru },
  { code: 'hi', name: 'हिन्दी', Flag: languageFlags.hi },
  { code: 'ar', name: 'العربية', Flag: languageFlags.ar },
  { code: 'th', name: 'ไทย', Flag: languageFlags.th },
  { code: 'vi', name: 'Tiếng Việt', Flag: languageFlags.vi },
  { code: 'id', name: 'Bahasa Indonesia', Flag: languageFlags.id },
  { code: 'tl', name: 'Tagalog', Flag: languageFlags.tl },
  { code: 'tr', name: 'Türkçe', Flag: languageFlags.tr },
  { code: 'pl', name: 'Polski', Flag: languageFlags.pl },
  { code: 'uk', name: 'Українська', Flag: languageFlags.uk },
  { code: 'nl', name: 'Nederlands', Flag: languageFlags.nl },
  { code: 'es-mx', name: 'Español (México)', Flag: languageFlags['es-mx'] },
  { code: 'en-ca', name: 'English (Canada)', Flag: languageFlags['en-ca'] },
  { code: 'en-au', name: 'English (Australia)', Flag: languageFlags['en-au'] },
  { code: 'sv', name: 'Svenska', Flag: languageFlags.sv },
  { code: 'no', name: 'Norsk', Flag: languageFlags.no },
  { code: 'da', name: 'Dansk', Flag: languageFlags.da },
  { code: 'fi', name: 'Suomi', Flag: languageFlags.fi },
  { code: 'el', name: 'Ελληνικά', Flag: languageFlags.el },
  { code: 'he', name: 'עברית', Flag: languageFlags.he },
].sort((a, b) => a.name.localeCompare(b.name));

export type FilterOption = {
  id: string;
  label: string;
  description: string;
};

export const artistSizes = [
  {
    id: 'microscopic',
    label: 'Microscopic',
    description: 'Less than 100 followers',
  },
  { id: 'tiny', label: 'Tiny', description: '100 - 1k followers' },
  { id: 'little', label: 'Little', description: '1k - 10k followers' },
  { id: 'small', label: 'Small', description: '10k - 50k followers' },
  {
    id: 'substantial',
    label: 'Substantial',
    description: '50k - 100k followers',
  },
  { id: 'giant', label: 'Giant', description: 'More than 100k followers' },
] as FilterOption[];

export const artistStatus = [
  { id: 'active', label: 'Active', description: 'Released in last 6 months' },
  { id: 'rising', label: 'Rising', description: 'Growing rapidly' },
  { id: 'established', label: 'Established', description: 'Stable presence' },
  { id: 'hiatus', label: 'On Hiatus', description: 'No recent activity' },
] as FilterOption[];

export const genreStyles = [
  { id: 'purist', label: 'Genre Purist', description: 'Focuses on one genre' },
  {
    id: 'explorer',
    label: 'Genre Explorer',
    description: 'Experiments across genres',
  },
  {
    id: 'fusion',
    label: 'Genre Fusion',
    description: 'Blends multiple genres',
  },
  { id: 'evolving', label: 'Evolving Style', description: 'Changes over time' },
] as FilterOption[];

export const artistExperience = [
  { id: 'young', label: 'Young', description: 'Active for 0-3 years' },
  {
    id: 'full-grown',
    label: 'Full-grown',
    description: 'Active for 3-10 years',
  },
  { id: 'veteran', label: 'Veteran', description: 'Active for 10+ years' },
] as const;

export type MusicGenre = FilterOption & {
  id: string;
  label: string;
  description: string;
};

export type GenreCategory = {
  name: string;
  genres: MusicGenre[];
};

export const musicGenres: GenreCategory[] = [
  {
    name: 'Electronic',
    genres: [
      {
        id: 'electronic',
        label: 'Electronic',
        description: 'Electronic music',
      },
      {
        id: 'indie-electronic',
        label: 'Indie Electronic',
        description: 'Electronic with indie elements',
      },
      { id: 'synthpop', label: 'Synthpop', description: 'Synthetic pop music' },
      { id: 'lo-fi', label: 'Lo-Fi', description: 'Low fidelity production' },
      {
        id: 'ambient',
        label: 'Ambient',
        description: 'Atmospheric electronic',
      },
      {
        id: 'experimental',
        label: 'Experimental',
        description: 'Pushing boundaries',
      },
      {
        id: 'downtempo',
        label: 'Downtempo',
        description: 'Slow tempo electronic',
      },
      {
        id: 'drum-and-bass',
        label: 'Drum & Bass',
        description: 'Fast breakbeat',
      },
      { id: 'dubstep', label: 'Dubstep', description: 'Bass-heavy electronic' },
      { id: 'house', label: 'House', description: 'Four-on-the-floor beats' },
      { id: 'techno', label: 'Techno', description: 'Repetitive electronic' },
      { id: 'trance', label: 'Trance', description: 'Hypnotic electronic' },
      {
        id: 'hardstyle',
        label: 'Hardstyle',
        description: 'Hard-hitting electronic',
      },
      { id: 'hardcore', label: 'Hardcore', description: 'Extreme electronic' },
    ],
  },
  {
    name: 'Hip-Hop & Rap',
    genres: [
      { id: 'rap', label: 'Rap', description: 'Rhythmic poetry' },
      {
        id: 'underground-hip-hop',
        label: 'Underground Hip-Hop',
        description: 'Alternative rap',
      },
      {
        id: 'alternative-hip-hop',
        label: 'Alternative Hip-Hop',
        description: 'Non-mainstream rap',
      },
      {
        id: 'instrumental-hip-hop',
        label: 'Instrumental Hip-Hop',
        description: 'Beat-focused',
      },
      { id: 'trip-hop', label: 'Trip-Hop', description: 'Downtempo hip-hop' },
      { id: 'trap', label: 'Trap', description: 'Modern rap style' },
      { id: 'dark-trap', label: 'Dark Trap', description: 'Atmospheric trap' },
      { id: 'drill', label: 'Drill', description: 'Raw trap style' },
      { id: 'melodic-rap', label: 'Melodic Rap', description: 'Singing rap' },
      {
        id: 'conscious-rap',
        label: 'Conscious Rap',
        description: 'Thoughtful lyrics',
      },
    ],
  },
  {
    name: 'Rock & Metal',
    genres: [
      {
        id: 'indie-rock',
        label: 'Indie Rock',
        description: 'Independent rock',
      },
      { id: 'post-rock', label: 'Post-Rock', description: 'Atmospheric rock' },
      { id: 'art-rock', label: 'Art Rock', description: 'Experimental rock' },
      { id: 'noise-rock', label: 'Noise Rock', description: 'Dissonant rock' },
      {
        id: 'psychedelic',
        label: 'Psychedelic',
        description: 'Mind-expanding',
      },
      { id: 'garage-rock', label: 'Garage Rock', description: 'Raw rock' },
      { id: 'post-punk', label: 'Post-Punk', description: 'Experimental punk' },
      { id: 'shoegaze', label: 'Shoegaze', description: 'Wall of sound' },
      {
        id: 'industrial',
        label: 'Industrial',
        description: 'Mechanical sounds',
      },
      {
        id: 'post-metal',
        label: 'Post-Metal',
        description: 'Atmospheric metal',
      },
      { id: 'math-rock', label: 'Math Rock', description: 'Complex rhythms' },
    ],
  },
  {
    name: 'Folk & Acoustic',
    genres: [
      { id: 'indie-folk', label: 'Indie Folk', description: 'Modern folk' },
      {
        id: 'contemporary-folk',
        label: 'Contemporary Folk',
        description: 'Modern traditional',
      },
      { id: 'folk-punk', label: 'Folk Punk', description: 'Energetic folk' },
      { id: 'anti-folk', label: 'Anti-Folk', description: 'Subversive folk' },
      {
        id: 'freak-folk',
        label: 'Freak Folk',
        description: 'Experimental folk',
      },
      { id: 'spoken-word', label: 'Spoken Word', description: 'Poetic speech' },
    ],
  },
  {
    name: 'Jazz & Classical',
    genres: [
      { id: 'nu-jazz', label: 'Nu Jazz', description: 'Modern jazz' },
      { id: 'free-jazz', label: 'Free Jazz', description: 'Experimental jazz' },
      { id: 'jazz-fusion', label: 'Jazz Fusion', description: 'Mixed jazz' },
      {
        id: 'spiritual-jazz',
        label: 'Spiritual Jazz',
        description: 'Meditative jazz',
      },
      {
        id: 'neo-classical',
        label: 'Neo-Classical',
        description: 'Modern classical',
      },
      {
        id: 'contemporary-classical',
        label: 'Contemporary Classical',
        description: 'New classical',
      },
      { id: 'minimal', label: 'Minimal', description: 'Minimalist music' },
    ],
  },
  {
    name: 'Pop & R&B',
    genres: [
      { id: 'indie-pop', label: 'Indie Pop', description: 'Independent pop' },
      { id: 'dream-pop', label: 'Dream Pop', description: 'Ethereal pop' },
      { id: 'bedroom-pop', label: 'Bedroom Pop', description: 'DIY pop' },
      { id: 'hyperpop', label: 'Hyperpop', description: 'Exaggerated pop' },
      { id: 'art-pop', label: 'Art Pop', description: 'Experimental pop' },
      {
        id: 'alternative-r&b',
        label: 'Alternative R&B',
        description: 'Modern R&B',
      },
      { id: 'future-soul', label: 'Future Soul', description: 'Modern soul' },
    ],
  },
  {
    name: 'Other',
    genres: [
      { id: 'glitch', label: 'Glitch', description: 'Error music' },
      { id: 'idm', label: 'IDM', description: 'Intelligent Dance Music' },
      { id: 'breakcore', label: 'Breakcore', description: 'Chaotic breaks' },
      {
        id: 'vaporwave',
        label: 'Vaporwave',
        description: 'Nostalgic electronic',
      },
      {
        id: 'future-garage',
        label: 'Future Garage',
        description: 'Modern garage',
      },
      { id: 'darkwave', label: 'Darkwave', description: 'Dark electronic' },
    ],
  },
] as const;

// Helper function to get all genres flattened
export const getAllGenres = () => musicGenres.flatMap((category) => category.genres);

export const productionStyles = [
  {
    id: 'lo-fi',
    label: 'Lo-Fi',
    description: 'Raw, unpolished sound',
  },
  {
    id: 'hi-fi',
    label: 'Hi-Fi',
    description: 'Clean, polished production',
  },
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Unconventional techniques',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    description: 'Simple, stripped down',
  },
  {
    id: 'maximalist',
    label: 'Maximalist',
    description: 'Dense, layered production',
  },
] as FilterOption[];

export const releaseFrequency = [
  {
    id: 'prolific',
    label: 'Prolific',
    description: 'Life is a constant creation',
  },
  {
    id: 'consistent',
    label: 'Consistent',
    description: 'Regular creative output',
  },
  {
    id: 'measured',
    label: 'Measured',
    description: 'Takes time to perfect work',
  },
  {
    id: 'patient',
    label: 'Patient',
    description: 'Quality over quantity',
  },
  {
    id: 'elusive',
    label: 'Elusive',
    description: 'Rare but special releases',
  },
] as FilterOption[];
