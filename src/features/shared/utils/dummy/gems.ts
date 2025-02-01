import { getPlatformMediaInfo } from '@/features/gems/utils/platformMedia';
import { faker } from '@faker-js/faker';
import { GemCategory, GemPlatformName, GemProperties, MusicGem, MusicGemProperties, Platform } from '../../../gems/types';
import { createArtistSnapshot, dummyArtists } from './artists';

faker.seed(333);

export const MUSIC_PLATFORMS = ['bandcamp', 'spotify', 'soundcloud', 'youtube', 'other'];

export const MUSIC_LANGUAGES = ['english', 'spanish', 'french', 'japanese', 'korean', 'mandarin', 'instrumental'];

export const MUSIC_MOODS = [
  'happy',
  'sad',
  'energetic',
  'calm',
  'dark',
  'uplifting',
  'aggressive',
  'melancholic',
  'romantic',
  'peaceful',
  'nostalgic',
];

export const LYRICS_TYPES = ['explicit', 'clean', 'instrumental', 'abstract', 'narrative', 'political', 'personal', 'spiritual'];

// Real-world examples that actually work in embeds
const SAMPLE_PLATFORM_URLS = {
  youtube: [
    'https://www.youtube.com/watch?v=samdIzlNBv8',
    'https://www.youtube.com/watch?v=uPskJjSlUow&l',
    'https://www.youtube.com/watch?v=gz05MgcBLoM',
    'https://www.youtube.com/watch?v=su0zi_VxLU0',
  ],
  soundcloud: [
    'https://soundcloud.com/eteras/anihilacja-istot-nadwornych',
    'https://soundcloud.com/magikdyspozytor/ponyvoid-hellokitty-ladny-kotek-ale-w-sumie-szatan',
    'https://soundcloud.com/kezi782/niki-lauda-prod-kezi?in=kezi782/sets/corner-store-music',
  ],
  bandcamp: [
    'https://dmg96.bandcamp.com/album/ii-duch-martwego-gracza-2019',
    'https://fine-sir-1584660650.bandcamp.com/album/1584660650',
    'https://newworldofmine.bandcamp.com/album/after-ovid',
  ],
  spotify: [
    'https://open.spotify.com/track/1AmAFaRELIqcrtCI230csp',
    'https://open.spotify.com/track/2xnGXs6qDvQDiFthBOvhez',
    'https://open.spotify.com/track/2HzKBOH9XJkCKDXRKZMpAE',
    'https://open.spotify.com/track/2x9d65LWwkMT4StX1dOS0o',
  ],
} as const;

function generateBaseGem(type: GemCategory) {
  const randomArtist = faker.helpers.arrayElement(dummyArtists);

  return {
    id: faker.string.uuid(),
    type,
    title: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.sentence(),
    category: type,
    artist: {
      id: randomArtist.id,
      name: randomArtist.name,
      location: faker.datatype.boolean(0.7) ? randomArtist.location : undefined,
      avatar: faker.datatype.boolean(0.8) ? randomArtist.avatar : undefined,
    },
    tags: faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative'], { min: 1, max: 3 }),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 15 }).toISOString(),
    likes: faker.number.int({ min: 0, max: 500 }),
    saves: faker.number.int({ min: 0, max: 200 }),
    curator: faker.datatype.boolean(0.3)
      ? {
          name: faker.internet.username(),
          avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
        }
      : undefined,
  };
}

function generateBaseGemProperties(): GemProperties {
  return {
    media: {
      images: faker.datatype.boolean(0.8)
        ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => `https://picsum.photos/seed/${faker.string.uuid()}/800/600`)
        : undefined,
      coverImage: faker.datatype.boolean(0.6) ? `https://picsum.photos/seed/${faker.string.uuid()}/1200/630` : undefined,
    },
  };
}

function generatePlatformUrl(platform: GemPlatformName): string {
  if (platform === 'other') {
    return `https://music.example.com/${faker.helpers.slugify(faker.lorem.words(2))}`;
  }

  return faker.helpers.arrayElement(SAMPLE_PLATFORM_URLS[platform as keyof typeof SAMPLE_PLATFORM_URLS] || []);
}

async function generateMusicProperties(): Promise<MusicGemProperties> {
  const platformCount = faker.number.int({ min: 1, max: 3 });
  const selectedPlatforms = faker.helpers.arrayElements(MUSIC_PLATFORMS, platformCount) as GemPlatformName[];

  const platforms: Platform[] = selectedPlatforms.map((platformName) => ({
    name: platformName,
    url: generatePlatformUrl(platformName),
  }));

  // Get media info from platforms
  const mediaInfo = await getPlatformMediaInfo(platforms);

  return {
    ...generateBaseGemProperties(),
    platforms,
    duration: mediaInfo.duration || `${faker.number.int({ min: 1, max: 10 })}:${faker.number.int({ min: 10, max: 59 })}`,
    media: {
      coverImage: mediaInfo.coverImage || generateBaseGemProperties().media.coverImage,
      images: mediaInfo.images || generateBaseGemProperties().media.images,
    },
    releaseDate: faker.date.past().toISOString(),
    genre: faker.helpers.arrayElements(MUSIC_GENRES, { min: 1, max: 3 }),
    language: faker.helpers.arrayElements(MUSIC_LANGUAGES, { min: 1, max: 2 }),
    mood: faker.helpers.arrayElements(MUSIC_MOODS, { min: 1, max: 3 }),
    lyricsTopic: faker.helpers.arrayElements(LYRICS_TYPES, { min: 1, max: 2 }),
    lyrics: faker.lorem.sentences({ min: 5, max: 40 }),
    hasMusicVideo: faker.datatype.boolean(),
  };
}

async function generateGem(type: GemCategory) {
  const baseGem = generateBaseGem(type);
  const properties = await generateMusicProperties();
  const randomArtist = faker.helpers.arrayElement(dummyArtists);

  const musicGem: MusicGem = {
    ...baseGem,
    type: 'music',
    artist: createArtistSnapshot(randomArtist),
    properties,
  };

  return musicGem;
}

export async function generateDummyGems(count = 20) {
  const gems = await Promise.all(
    Array.from({ length: count }, async (_, index) => {
      faker.seed(144 + index);
      return generateGem('music');
    }),
  );
  return gems;
}

export const dummyGems = await generateDummyGems();
