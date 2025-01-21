import { faker } from '@faker-js/faker';
import { BaseGemProperties, Gem, GemType, MusicGemProperties } from '../../../gems/types/gems';
import { dummyArtists } from './artists';
import { Category } from './categories';

faker.seed(42);

const MUSIC_SOURCES = ['bandcamp', 'spotify', 'soundcloud', 'youtube'] as const;
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
] as const;

// Generate base gem properties
function generateBaseGem(type: GemType): Omit<Gem, 'properties'> {
  const randomArtist = faker.helpers.arrayElement(dummyArtists);

  return {
    id: faker.string.uuid(),
    type,
    title: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.sentence(),
    category: type as unknown as Category,
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

function generateBaseGemProperties(): BaseGemProperties {
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
  return {
    ...generateBaseGemProperties(),
    source: faker.helpers.arrayElement(MUSIC_SOURCES),
    sourceUrl: `https://${faker.helpers.arrayElement(MUSIC_SOURCES)}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    duration: `${faker.number.int({ min: 1, max: 10 })}:${faker.number.int({ min: 10, max: 59 })}`,
    releaseDate: faker.date.past().toISOString(),
    genres: faker.helpers.arrayElements(MUSIC_GENRES, { min: 1, max: 3 }),
  };
}

function generateGem(type: GemType): Gem {
  const baseGem = generateBaseGem(type);
  let properties;

  switch (type) {
    case 'music':
      properties = generateMusicProperties();
      break;
    default:
      throw new Error(`Unsupported gem type: ${type}`);
  }

  return {
    ...baseGem,
    properties,
  };
}

export function generateDummyGems(count = 100): Gem[] {
  return Array.from({ length: count }, (_, index) => {
    faker.seed(42 + index);
    return generateGem('music');
  });
}

export const dummyGems = generateDummyGems();
