import { faker } from '@faker-js/faker';
import { GemBase, GemCategory, GemPlatform, GemPlatformName, GemProperties, MusicGemProperties } from '../../../gems/types/gemsTypes';
import { dummyArtists } from './artists';

faker.seed(42);

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
const MUSIC_GENRES = [
  'synthwave',
  'punk',
  'indie-folk',
  'experimental',
  'ambient',
  'lo-fi',
  'electronic',
  'underground-hip-hop',
  'post-rock',
  'darkwave',
  'bedroom-pop',
  'noise-rock',
  'drone',
  'industrial',
] as const; // Generate base gem properties
function generateBaseGem(type: GemCategory): Omit<GemBase, 'properties'> {
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
      aspectRatio: faker.helpers.arrayElement(['1:1', '16:9', '4:3', '3:2']),
    },
  };
}

function generateMusicProperties(): MusicGemProperties {
  const platformCount = faker.number.int({ min: 1, max: 3 });
  const platforms: GemPlatform[] = Array.from({ length: platformCount }, () => {
    const platformName = faker.helpers.arrayElement(MUSIC_PLATFORMS) as GemPlatformName;
    return {
      name: platformName,
      url: `https://${platformName}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    };
  });

  return {
    ...generateBaseGemProperties(),
    platforms,
    duration: `${faker.number.int({ min: 1, max: 10 })}:${faker.number.int({ min: 10, max: 59 })}`,
    releaseDate: faker.date.past().toISOString(),
    genres: faker.helpers.arrayElements(MUSIC_GENRES, { min: 1, max: 3 }),
    languages: faker.helpers.arrayElements(MUSIC_LANGUAGES, { min: 1, max: 2 }),
    moods: faker.helpers.arrayElements(MUSIC_MOODS, { min: 1, max: 3 }),
    lyrics: faker.helpers.arrayElements(LYRICS_TYPES, { min: 1, max: 2 }),
  };
}

function generateGem(type: GemCategory): GemBase {
  const baseGem = generateBaseGem(type);
  const properties = generateMusicProperties();

  return {
    ...baseGem,
    properties,
  };
}

export function generateDummyGems(count = 100): GemBase[] {
  return Array.from({ length: count }, (_, index) => {
    faker.seed(42 + index);
    return generateGem('music');
  });
}

export const dummyGems = generateDummyGems();
