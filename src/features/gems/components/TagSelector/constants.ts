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
import { GemFilter } from './comps/types';

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
  { id: 'en', label: 'English', Icon: languageFlags.en },
  { id: 'es', label: 'Español', Icon: languageFlags.es },
  { id: 'ja', label: '日本語', Icon: languageFlags.ja },
  { id: 'ko', label: '한국어', Icon: languageFlags.ko },
  { id: 'fr', label: 'Français', Icon: languageFlags.fr },
  { id: 'de', label: 'Deutsch', Icon: languageFlags.de },
  { id: 'it', label: 'Italiano', Icon: languageFlags.it },
  { id: 'pt', label: 'Português', Icon: languageFlags.pt },
  { id: 'pt-br', label: 'Português (Brasil)', Icon: languageFlags['pt-br'] },
  { id: 'zh', label: '中文', Icon: languageFlags.zh },
  { id: 'ru', label: 'Русский', Icon: languageFlags.ru },
  { id: 'hi', label: 'हिन्दी', Icon: languageFlags.hi },
  { id: 'ar', label: 'العربية', Icon: languageFlags.ar },
  { id: 'th', label: 'ไทย', Icon: languageFlags.th },
  { id: 'vi', label: 'Tiếng Việt', Icon: languageFlags.vi },
  { id: 'id', label: 'Bahasa Indonesia', Icon: languageFlags.id },
  { id: 'tl', label: 'Tagalog', Icon: languageFlags.tl },
  { id: 'tr', label: 'Türkçe', Icon: languageFlags.tr },
  { id: 'pl', label: 'Polski', Icon: languageFlags.pl },
  { id: 'uk', label: 'Українська', Icon: languageFlags.uk },
  { id: 'nl', label: 'Nederlands', Icon: languageFlags.nl },
  { id: 'es-mx', label: 'Español (México)', Icon: languageFlags['es-mx'] },
  { id: 'en-ca', label: 'English (Canada)', Icon: languageFlags['en-ca'] },
  { id: 'en-au', label: 'English (Australia)', Icon: languageFlags['en-au'] },
  { id: 'sv', label: 'Svenska', Icon: languageFlags.sv },
  { id: 'no', label: 'Norsk', Icon: languageFlags.no },
  { id: 'da', label: 'Dansk', Icon: languageFlags.da },
  { id: 'fi', label: 'Suomi', Icon: languageFlags.fi },
  { id: 'el', label: 'Ελληνικά', Icon: languageFlags.el },
  { id: 'he', label: 'עברית', Icon: languageFlags.he },
].sort((a, b) => a.label.localeCompare(b.label));

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

export type MusicGenre = FilterOption & {
  id: string;
  label: string;
  description: string;
};

export type GenreCategory = {
  id: string;
  name: string;
  options: MusicGenre[];
};

export const musicGenres: GenreCategory[] = [
  {
    name: 'Electronic',
    id: 'electronic',
    options: [
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
    id: 'hip-hop-and-rap',
    options: [
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
    id: 'rock-and-metal',
    options: [
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
    id: 'folk-and-acoustic',
    options: [
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
    id: 'jazz-and-classical',
    options: [
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
    id: 'pop-and-rb',
    options: [
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
    id: 'other',
    options: [
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
export const getAllGenres = () => musicGenres.flatMap((category) => category.options);

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

export const craftMaterials = [
  {
    id: 'mixed-materials',
    label: 'Mixed Materials',
    description: 'Combining multiple materials',
  },
  {
    id: 'wood',
    label: 'Wood',
    description: 'Woodworking and carpentry',
  },
  {
    id: 'metal',
    label: 'Metal',
    description: 'Metalworking and smithing',
  },
  {
    id: 'ceramic',
    label: 'Ceramic',
    description: 'Clay and pottery',
  },
  {
    id: 'glass',
    label: 'Glass',
    description: 'Glassblowing and forming',
  },
  {
    id: 'leather',
    label: 'Leather',
    description: 'Leatherworking and crafting',
  },
  {
    id: 'paper',
    label: 'Paper',
    description: 'Papercraft and origami',
  },
  {
    id: 'stone',
    label: 'Stone',
    description: 'Stone carving and sculpture',
  },
  {
    id: 'plastic',
    label: 'Plastic',
    description: 'Plastic molding and forming',
  },
  {
    id: 'resin',
    label: 'Resin',
    description: 'Resin casting and art',
  },
] as FilterOption[];

export const productionMethods = [
  {
    id: 'digital-fabrication',
    label: 'Digital Fabrication',
    description: '3D printing, CNC, laser cutting, digital design',
  },
  {
    id: 'hand-crafted',
    label: 'Hand Crafted',
    description: 'Traditional tools and manual techniques',
  },
  {
    id: 'molding-casting',
    label: 'Molding & Casting',
    description: 'Molds, casting, forming, and shaping',
  },
  {
    id: 'assembly',
    label: 'Assembly',
    description: 'Combining components and materials',
  },
] as FilterOption[];

export const artMediums = [
  {
    id: 'digital',
    label: 'Digital',
    description: 'Created using digital tools',
  },
  {
    id: 'traditional',
    label: 'Traditional',
    description: 'Physical media and techniques',
  },
  {
    id: 'mixed-media',
    label: 'Mixed Media',
    description: 'Combination of digital and traditional',
  },
] as FilterOption[];

export const artTechniques = [
  {
    id: 'painting',
    label: 'Painting',
    description: 'Using paint mediums',
  },
  {
    id: 'drawing',
    label: 'Drawing',
    description: 'Using drawing tools',
  },
  {
    id: 'illustration',
    label: 'Illustration',
    description: 'Detailed artwork',
  },
  {
    id: 'vector',
    label: 'Vector',
    description: 'Scalable graphics',
  },
  {
    id: 'pixel-art',
    label: 'Pixel Art',
    description: 'Digital pixel-based art',
  },
] as FilterOption[];

export const fiberTechniques: FilterOption[] = [
  {
    id: 'sewing',
    label: 'Sewing',
    description: 'Creating fabric with needles and thread',
  },
  {
    id: 'knitting',
    label: 'Knitting',
    description: 'Creating fabric with needles and yarn',
  },
  {
    id: 'crochet',
    label: 'Crochet',
    description: 'Hook and yarn techniques',
  },
  {
    id: 'weaving',
    label: 'Weaving',
    description: 'Interlacing threads on a loom',
  },
  {
    id: 'embroidery',
    label: 'Embroidery',
    description: 'Decorative needlework',
  },
  {
    id: 'quilting',
    label: 'Quilting',
    description: 'Multiple layers of fabric',
  },
  {
    id: 'macrame',
    label: 'Macramé',
    description: 'Knotting techniques',
  },
  {
    id: 'needle-felting',
    label: 'Needle Felting',
    description: 'Sculpting with wool',
  },
];

export const fiberMaterials: FilterOption[] = [
  {
    id: 'mixed',
    label: 'Mixed',
    description: 'A mix of materials',
  },
  {
    id: 'cotton',
    label: 'Cotton',
    description: 'Soft and breathable',
  },
  {
    id: 'wool',
    label: 'Wool',
    description: 'Warm and insulating natural',
  },
  {
    id: 'silk',
    label: 'Silk',
    description: 'Smooth and luxurious natural',
  },
  {
    id: 'linen',
    label: 'Linen',
    description: 'Durable and cooling natural',
  },
  {
    id: 'acrylic',
    label: 'Acrylic',
    description: 'Synthetic, with wool-like qualities',
  },
  {
    id: 'polyester',
    label: 'Polyester',
    description: 'Durable synthetic',
  },
  {
    id: 'bamboo',
    label: 'Bamboo',
    description: 'Sustainable and soft',
  },
  {
    id: 'hemp',
    label: 'Hemp',
    description: 'Strong and eco-friendly natural',
  },
  {
    id: 'cashmere',
    label: 'Cashmere',
    description: 'Ultra-soft luxury wool',
  },
];

export const clothingTypes: FilterOption[] = [
  {
    id: 'tops',
    label: 'Tops',
    description: 'Shirts, blouses, t-shirts',
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    description: 'Pants, skirts, shorts',
  },
  {
    id: 'dresses',
    label: 'Dresses',
    description: 'One-piece garments',
  },
  {
    id: 'outerwear',
    label: 'Outerwear',
    description: 'Coats, jackets, sweaters',
  },
  {
    id: 'formal',
    label: 'Formal Wear',
    description: 'Suits, gowns, tuxedos',
  },
  {
    id: 'lingerie',
    label: 'Lingerie',
    description: 'Undergarments and sleepwear',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    description: 'Scarves, belts, hats',
  },
  {
    id: 'swimwear',
    label: 'Swimwear',
    description: 'Bathing suits and beachwear',
  },
  {
    id: 'ethnic',
    label: 'Ethnic Wear',
    description: 'Traditional and cultural clothing',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other clothing types',
  },
];

export const fiberComplexity: FilterOption[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Basic techniques',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'More complex patterns',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'Intricate techniques',
  },
  {
    id: 'expert',
    label: 'Expert',
    description: 'Master-level complexity',
  },
];

export const photographyTypes: FilterOption[] = [
  {
    id: 'portrait',
    label: 'Portrait',
    description: 'People and faces',
  },
  {
    id: 'landscape',
    label: 'Landscape',
    description: 'Natural scenery',
  },
  {
    id: 'street',
    label: 'Street',
    description: 'Urban life and scenes',
  },
  {
    id: 'wildlife',
    label: 'Wildlife',
    description: 'Animals in nature',
  },
  {
    id: 'macro',
    label: 'Macro',
    description: 'Close-up photography',
  },
  {
    id: 'architectural',
    label: 'Architectural',
    description: 'Buildings and structures',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    description: 'Non-representational',
  },
];

export const photographyTechniques: FilterOption[] = [
  {
    id: 'digital',
    label: 'Digital',
    description: 'Modern digital cameras',
  },
  {
    id: 'film',
    label: 'Film',
    description: 'Analog photography',
  },
  {
    id: 'black-and-white',
    label: 'Black & White',
    description: 'Monochrome images',
  },
  {
    id: 'long-exposure',
    label: 'Long Exposure',
    description: 'Time-based effects',
  },
  {
    id: 'hdr',
    label: 'HDR',
    description: 'High dynamic range',
  },
];

export const photographySubjects: FilterOption[] = [
  {
    id: 'nature',
    label: 'Nature',
    description: 'Natural world',
  },
  {
    id: 'urban',
    label: 'Urban',
    description: 'City life',
  },
  {
    id: 'people',
    label: 'People',
    description: 'Human subjects',
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Special occasions',
  },
  {
    id: 'still-life',
    label: 'Still Life',
    description: 'Inanimate objects',
  },
];

export const writingTypes: FilterOption[] = [
  {
    id: 'poetry',
    label: 'Poetry',
    description: 'Verse and poetic forms',
  },
  {
    id: 'prose',
    label: 'Prose',
    description: 'Written narrative',
  },
  {
    id: 'essays',
    label: 'Essays',
    description: 'Non-fiction writing',
  },
  {
    id: 'short-stories',
    label: 'Short Stories',
    description: 'Brief narratives',
  },
  {
    id: 'novels',
    label: 'Novels',
    description: 'Long-form fiction',
  },
  {
    id: 'scripts',
    label: 'Scripts',
    description: 'Screenplays and plays',
  },
];

export const writingGenres: FilterOption[] = [
  {
    id: 'literary',
    label: 'Literary',
    description: 'Artistic merit focus',
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Imaginative worlds',
  },
  {
    id: 'science-fiction',
    label: 'Science Fiction',
    description: 'Future and technology',
  },
  {
    id: 'mystery',
    label: 'Mystery',
    description: 'Suspense and intrigue',
  },
  {
    id: 'romance',
    label: 'Romance',
    description: 'Love and relationships',
  },
  {
    id: 'horror',
    label: 'Horror',
    description: 'Fear and suspense',
  },
  {
    id: 'historical',
    label: 'Historical',
    description: 'Past-based narratives',
  },
  {
    id: 'contemporary',
    label: 'Contemporary',
    description: 'Modern settings',
  },
];

export const writingStyles: FilterOption[] = [
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Innovative approaches',
  },
  {
    id: 'traditional',
    label: 'Traditional',
    description: 'Classical forms',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    description: 'Spare and concise',
  },
  {
    id: 'stream-consciousness',
    label: 'Stream of Consciousness',
    description: 'Flow of thoughts',
  },
  {
    id: 'lyrical',
    label: 'Lyrical',
    description: 'Musical language',
  },
];

export const writingThemes: FilterOption[] = [
  {
    id: 'personal',
    label: 'Personal',
    description: 'Individual experiences',
  },
  {
    id: 'social',
    label: 'Social',
    description: 'Society and culture',
  },
  {
    id: 'political',
    label: 'Political',
    description: 'Power and governance',
  },
  {
    id: 'philosophical',
    label: 'Philosophical',
    description: 'Deep thinking',
  },
  {
    id: 'nature',
    label: 'Nature',
    description: 'Environmental focus',
  },
  {
    id: 'urban',
    label: 'Urban',
    description: 'City life',
  },
];

export const filmTypes: FilterOption[] = [
  {
    id: 'short-film',
    label: 'Short Film',
    description: 'Brief cinematic works',
  },
  {
    id: 'feature',
    label: 'Feature Film',
    description: 'Full-length movies',
  },
  {
    id: 'documentary',
    label: 'Documentary',
    description: 'Non-fiction films',
  },
  {
    id: 'animation',
    label: 'Animation',
    description: 'Animated content',
  },
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Avant-garde cinema',
  },
  {
    id: 'music-video',
    label: 'Music Video',
    description: 'Musical visuals',
  },
];

export const filmGenres: FilterOption[] = [
  {
    id: 'drama',
    label: 'Drama',
    description: 'Character-driven stories',
  },
  {
    id: 'comedy',
    label: 'Comedy',
    description: 'Humorous content',
  },
  {
    id: 'horror',
    label: 'Horror',
    description: 'Frightening content',
  },
  {
    id: 'sci-fi',
    label: 'Science Fiction',
    description: 'Future and technology',
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Imaginative worlds',
  },
  {
    id: 'thriller',
    label: 'Thriller',
    description: 'Suspenseful content',
  },
];

export const filmStyles: FilterOption[] = [
  {
    id: 'narrative',
    label: 'Narrative',
    description: 'Story-focused',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    description: 'Non-narrative approach',
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    description: 'Traditional film style',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    description: 'Simple, focused approach',
  },
  {
    id: 'surrealist',
    label: 'Surrealist',
    description: 'Dream-like qualities',
  },
];

export const filmTechniques: FilterOption[] = [
  {
    id: 'practical-effects',
    label: 'Practical Effects',
    description: 'Physical effects',
  },
  {
    id: 'digital-effects',
    label: 'Digital Effects',
    description: 'Computer-generated',
  },
  {
    id: 'stop-motion',
    label: 'Stop Motion',
    description: 'Frame-by-frame animation',
  },
  {
    id: 'hand-drawn',
    label: 'Hand Drawn',
    description: 'Traditional animation',
  },
  {
    id: '3d-animation',
    label: '3D Animation',
    description: 'Computer animation',
  },
];

export const digitalArtTypes: FilterOption[] = [
  {
    id: '3d-modeling',
    label: '3D Modeling',
    description: 'Three-dimensional digital objects',
  },
  {
    id: '3d-animation',
    label: '3D Animation',
    description: 'Animated 3D content',
  },
  {
    id: 'vfx',
    label: 'VFX',
    description: 'Visual effects',
  },
  {
    id: 'motion-graphics',
    label: 'Motion Graphics',
    description: 'Animated design elements',
  },
  {
    id: 'game-art',
    label: 'Game Art',
    description: 'Video game visuals',
  },
  {
    id: 'digital-sculpture',
    label: 'Digital Sculpture',
    description: '3D sculpting',
  },
];

export const digitalArtStyles: FilterOption[] = [
  {
    id: 'realistic',
    label: 'Realistic',
    description: 'True to life',
  },
  {
    id: 'stylized',
    label: 'Stylized',
    description: 'Artistic interpretation',
  },
  {
    id: 'low-poly',
    label: 'Low Poly',
    description: 'Simplified geometry',
  },
  {
    id: 'photorealistic',
    label: 'Photorealistic',
    description: 'Indistinguishable from reality',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    description: 'Non-representational',
  },
  {
    id: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Futuristic aesthetic',
  },
];

export const digitalArtSoftware: FilterOption[] = [
  {
    id: 'blender',
    label: 'Blender',
    description: 'Open-source 3D software',
  },
  {
    id: 'maya',
    label: 'Maya',
    description: 'Autodesk Maya',
  },
  {
    id: 'zbrush',
    label: 'ZBrush',
    description: 'Digital sculpting',
  },
  {
    id: 'unreal',
    label: 'Unreal Engine',
    description: 'Game engine',
  },
  {
    id: 'unity',
    label: 'Unity',
    description: 'Game engine',
  },
  {
    id: 'houdini',
    label: 'Houdini',
    description: 'Procedural generation',
  },
];

export const digitalArtCategories: FilterOption[] = [
  {
    id: 'characters',
    label: 'Characters',
    description: 'Character design and creation',
  },
  {
    id: 'environments',
    label: 'Environments',
    description: 'Digital landscapes and scenes',
  },
  {
    id: 'props',
    label: 'Props',
    description: 'Digital objects and items',
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    description: 'Transportation designs',
  },
  {
    id: 'architectural',
    label: 'Architectural',
    description: 'Building and structure design',
  },
  {
    id: 'creatures',
    label: 'Creatures',
    description: 'Creature design and creation',
  },
];

export const mixedMediaTypes: FilterOption[] = [
  {
    id: 'collage',
    label: 'Collage',
    description: 'Combined visual elements',
  },
  {
    id: 'assemblage',
    label: 'Assemblage',
    description: '3D mixed media sculptures',
  },
  {
    id: 'installation',
    label: 'Installation',
    description: 'Space-based artwork',
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Live artistic expression',
  },
  {
    id: 'interactive',
    label: 'Interactive',
    description: 'Audience participation',
  },
  {
    id: 'time-based',
    label: 'Time-based',
    description: 'Duration-dependent work',
  },
];

export const mixedMediaMaterials: FilterOption[] = [
  {
    id: 'physical-digital',
    label: 'Physical & Digital',
    description: 'Combining tangible and virtual',
  },
  {
    id: 'found-objects',
    label: 'Found Objects',
    description: 'Repurposed materials',
  },
  {
    id: 'multimedia',
    label: 'Multimedia',
    description: 'Multiple media types',
  },
  {
    id: 'sound-visual',
    label: 'Sound & Visual',
    description: 'Audio-visual combination',
  },
  {
    id: 'text-image',
    label: 'Text & Image',
    description: 'Combined words and visuals',
  },
];

export const mixedMediaApproaches: FilterOption[] = [
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Innovative combinations',
  },
  {
    id: 'conceptual',
    label: 'Conceptual',
    description: 'Idea-driven work',
  },
  {
    id: 'narrative',
    label: 'Narrative',
    description: 'Story-focused',
  },
  {
    id: 'abstract',
    label: 'Abstract',
    description: 'Non-representational',
  },
  {
    id: 'immersive',
    label: 'Immersive',
    description: 'Environment-creating',
  },
];

export const mixedMediaSpaces: FilterOption[] = [
  {
    id: 'gallery',
    label: 'Gallery',
    description: 'Traditional art spaces',
  },
  {
    id: 'public',
    label: 'Public Space',
    description: 'Outdoor/community locations',
  },
  {
    id: 'digital',
    label: 'Digital Space',
    description: 'Online/virtual platforms',
  },
  {
    id: 'site-specific',
    label: 'Site-specific',
    description: 'Location-dependent work',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    description: 'Physical-digital blend',
  },
];

export const contentTypes: FilterOption[] = [
  {
    id: 'podcast',
    label: 'Podcast',
    description: 'Audio content series',
  },
  {
    id: 'vlog',
    label: 'Vlog',
    description: 'Video blogs',
  },
  {
    id: 'educational',
    label: 'Educational',
    description: 'Learning content',
  },
  {
    id: 'documentary',
    label: 'Documentary',
    description: 'Investigative content',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    description: 'Game-related content',
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Analysis content',
  },
];

export const contentTopics: FilterOption[] = [
  {
    id: 'science',
    label: 'Science',
    description: 'Scientific topics',
  },
  {
    id: 'history',
    label: 'History',
    description: 'Historical content',
  },
  {
    id: 'technology',
    label: 'Technology',
    description: 'Tech-focused content',
  },
  {
    id: 'arts',
    label: 'Arts',
    description: 'Creative content',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'Daily life content',
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    description: 'Philosophical discussions',
  },
];

export const contentFormats: FilterOption[] = [
  {
    id: 'series',
    label: 'Series',
    description: 'Episodic content',
  },
  {
    id: 'long-form',
    label: 'Long-form',
    description: 'Extended content',
  },
  {
    id: 'short-form',
    label: 'Short-form',
    description: 'Brief content',
  },
  {
    id: 'live',
    label: 'Live',
    description: 'Real-time content',
  },
  {
    id: 'interactive',
    label: 'Interactive',
    description: 'Audience engagement',
  },
];

export const contentStyles: FilterOption[] = [
  {
    id: 'informative',
    label: 'Informative',
    description: 'Knowledge-focused',
  },
  {
    id: 'entertaining',
    label: 'Entertaining',
    description: 'Entertainment-focused',
  },
  {
    id: 'analytical',
    label: 'Analytical',
    description: 'Deep analysis',
  },
  {
    id: 'storytelling',
    label: 'Storytelling',
    description: 'Narrative approach',
  },
  {
    id: 'commentary',
    label: 'Commentary',
    description: 'Opinion-based',
  },
];

export const otherMediums: FilterOption[] = [
  {
    id: 'physical',
    label: 'Physical',
    description: 'Tangible creations',
  },
  {
    id: 'digital',
    label: 'Digital',
    description: 'Computer-based work',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    description: 'Mixed physical-digital',
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Live presentations',
  },
  {
    id: 'conceptual',
    label: 'Conceptual',
    description: 'Idea-based work',
  },
];

export const otherApproaches: FilterOption[] = [
  {
    id: 'traditional',
    label: 'Traditional',
    description: 'Classical methods',
  },
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Innovative approaches',
  },
  {
    id: 'collaborative',
    label: 'Collaborative',
    description: 'Group-based work',
  },
  {
    id: 'interactive',
    label: 'Interactive',
    description: 'Audience participation',
  },
  {
    id: 'research-based',
    label: 'Research-based',
    description: 'Study-driven work',
  },
];

export const otherThemes: FilterOption[] = [
  {
    id: 'nature',
    label: 'Nature',
    description: 'Environmental focus',
  },
  {
    id: 'technology',
    label: 'Technology',
    description: 'Tech-focused',
  },
  {
    id: 'social',
    label: 'Social',
    description: 'Community-oriented',
  },
  {
    id: 'scientific',
    label: 'Scientific',
    description: 'Science-based',
  },
  {
    id: 'cultural',
    label: 'Cultural',
    description: 'Culture-focused',
  },
  {
    id: 'educational',
    label: 'Educational',
    description: 'Learning-oriented',
  },
];

export const otherComplexity: FilterOption[] = [
  {
    id: 'simple',
    label: 'Simple',
    description: 'Straightforward work',
  },
  {
    id: 'moderate',
    label: 'Moderate',
    description: 'Medium complexity',
  },
  {
    id: 'complex',
    label: 'Complex',
    description: 'Intricate work',
  },
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Boundary-pushing',
  },
];

export const musicFilters: GemFilter[] = [
  {
    title: 'Genres',
    options: musicGenres,
    param: 'genres',
    icon: 'Music',
    grouped: true,
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Audience Size',
    options: artistSizes,
    param: 'audienceSize',
    icon: 'Users',
  },

  {
    title: 'Activity',
    options: releaseFrequency,
    param: 'releaseFrequency',
    icon: 'Clock',
  },
];

export const craftFilters: GemFilter[] = [
  {
    title: 'Materials',
    options: craftMaterials,
    param: 'materials',
    icon: 'BrickWall',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Production Method',
    options: productionMethods,
    param: 'productionMethod',
    icon: 'Anvil',
    searchable: true,
    showFilterChips: true,
  },
];

export const graphicArtFilters: GemFilter[] = [
  {
    title: 'Medium',
    options: artMediums,
    param: 'medium',
    icon: 'PenTool',
    searchable: true,
    showFilterChips: true,
  },

  {
    title: 'Technique',
    options: artTechniques,
    param: 'technique',
    icon: 'Brush',
    searchable: true,
  },
];

export const fiberArtFilters: GemFilter[] = [
  {
    title: 'Type',
    options: clothingTypes,
    param: 'type',
    icon: 'Shirt',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Technique',
    options: fiberTechniques,
    param: 'technique',
    icon: 'Scissors',
    searchable: true,
    showFilterChips: true,
  },

  {
    title: 'Complexity',
    options: fiberComplexity,
    param: 'complexity',
    icon: 'Stars',
    searchable: true,
  },
  {
    title: 'Materials',
    options: fiberMaterials,
    param: 'materials',
    icon: 'Hammer',
    searchable: true,
    showFilterChips: true,
  },
];

export const photographyFilters: GemFilter[] = [
  {
    title: 'Type',
    options: photographyTypes,
    param: 'photoType',
    icon: 'Camera',
    searchable: true,
    showFilterChips: true,
  },

  {
    title: 'Technique',
    options: photographyTechniques,
    param: 'technique',
    icon: 'Settings',
    searchable: true,
  },
  {
    title: 'Subject',
    options: photographySubjects,
    param: 'subject',
    icon: 'Focus',
    searchable: true,
  },
];

export const wordsFilters: GemFilter[] = [
  {
    title: 'Type',
    options: writingTypes,
    param: 'writingType',
    icon: 'BookOpen',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Genre',
    options: writingGenres,
    param: 'genre',
    icon: 'Library',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: writingStyles,
    param: 'style',
    icon: 'PenTool',
    searchable: true,
  },
  {
    title: 'Theme',
    options: writingThemes,
    param: 'theme',
    icon: 'Bookmark',
    searchable: true,
  },
];

export const movieFilters: GemFilter[] = [
  {
    title: 'Type',
    options: filmTypes,
    param: 'filmType',
    icon: 'Clapperboard',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Genre',
    options: filmGenres,
    param: 'genre',
    icon: 'Film',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: filmStyles,
    param: 'style',
    icon: 'Video',
    searchable: true,
  },
  {
    title: 'Technique',
    options: filmTechniques,
    param: 'technique',
    icon: 'Camera',
    searchable: true,
  },
];

export const digitalArtFilters: GemFilter[] = [
  {
    title: 'Type',
    options: digitalArtTypes,
    param: 'digitalType',
    icon: 'Box',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: digitalArtStyles,
    param: 'style',
    icon: 'Palette',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Software',
    options: digitalArtSoftware,
    param: 'software',
    icon: 'Monitor',
    searchable: true,
  },
  {
    title: 'Category',
    options: digitalArtCategories,
    param: 'category',
    icon: 'Layers',
    searchable: true,
  },
];

export const mixedMediaFilters: GemFilter[] = [
  {
    title: 'Type',
    options: mixedMediaTypes,
    param: 'mixedType',
    icon: 'Combine',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Materials',
    options: mixedMediaMaterials,
    param: 'materials',
    icon: 'Shapes',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Approach',
    options: mixedMediaApproaches,
    param: 'approach',
    icon: 'Lightbulb',
    searchable: true,
  },
  {
    title: 'Space',
    options: mixedMediaSpaces,
    param: 'space',
    icon: 'Box',
    searchable: true,
  },
];

export const contentCreationFilters: GemFilter[] = [
  {
    title: 'Type',
    options: contentTypes,
    param: 'contentType',
    icon: 'Radio',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Topic',
    options: contentTopics,
    param: 'topic',
    icon: 'BookOpen',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Format',
    options: contentFormats,
    param: 'format',
    icon: 'Layout',
    searchable: true,
  },
  {
    title: 'Style',
    options: contentStyles,
    param: 'style',
    icon: 'Sparkles',
    searchable: true,
  },
];

export const otherFilters: GemFilter[] = [
  {
    title: 'Medium',
    options: otherMediums,
    param: 'medium',
    icon: 'Box',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Approach',
    options: otherApproaches,
    param: 'approach',
    icon: 'Lightbulb',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Theme',
    options: otherThemes,
    param: 'theme',
    icon: 'Compass',
    searchable: true,
  },
  {
    title: 'Complexity',
    options: otherComplexity,
    param: 'complexity',
    icon: 'Network',
    searchable: true,
  },
];
