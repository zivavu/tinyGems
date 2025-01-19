import { faker } from '@faker-js/faker';
import { Category } from '../categories';
import { ArtGemProperties, ContentGemProperties, CraftGemProperties, Gem, GemType, MusicGemProperties } from '../types/gems';
import { dummyArtists } from './artists';

// Constants for different gem types
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
const ART_MEDIUMS = ['digital', 'oil', 'acrylic', 'watercolor', 'pencil', 'charcoal', 'mixed-media', 'sculpture'] as const;
const CRAFT_MATERIALS = ['wood', 'metal', 'fabric', 'clay', 'glass', 'paper', 'yarn', 'leather'] as const;
const CONTENT_PLATFORMS = ['blog', 'substack', 'medium', 'other'] as const;

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
          name: faker.internet.userName(),
          avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
        }
      : undefined,
  };
}

// Type-specific property generators
function generateMusicProperties(): MusicGemProperties {
  const source = faker.helpers.arrayElement(MUSIC_SOURCES);
  return {
    source,
    sourceUrl: `https://${source}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    albumArt: faker.datatype.boolean(0.9) ? `https://picsum.photos/seed/${faker.string.uuid()}/300/300` : undefined,
    duration: `${faker.number.int({ min: 2, max: 8 })}:${faker.number.int({ min: 10, max: 59 })}`,
    releaseDate: faker.date.recent({ days: 90 }).toISOString(),
    genres: faker.helpers.arrayElements(MUSIC_GENRES, { min: 1, max: 3 }),
  };
}

function generateArtProperties(): ArtGemProperties {
  return {
    medium: faker.helpers.arrayElements(ART_MEDIUMS, { min: 1, max: 3 }),
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => `https://picsum.photos/seed/${faker.string.uuid()}/800/600`),
    dimensions: faker.datatype.boolean(0.7)
      ? `${faker.number.int({ min: 20, max: 200 })}x${faker.number.int({ min: 20, max: 200 })}cm`
      : undefined,
    materials: faker.datatype.boolean(0.8) ? faker.helpers.arrayElements(CRAFT_MATERIALS, { min: 1, max: 3 }) : undefined,
  };
}

function generateCraftProperties(): CraftGemProperties {
  return {
    materials: faker.helpers.arrayElements(CRAFT_MATERIALS, { min: 1, max: 4 }),
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => `https://picsum.photos/seed/${faker.string.uuid()}/800/600`),
    dimensions: faker.datatype.boolean(0.6)
      ? `${faker.number.int({ min: 10, max: 100 })}x${faker.number.int({ min: 10, max: 100 })}cm`
      : undefined,
    timeToMake: faker.datatype.boolean(0.7) ? `${faker.number.int({ min: 1, max: 100 })} hours` : undefined,
  };
}

function generateContentProperties(): ContentGemProperties {
  const platform = faker.helpers.arrayElement(CONTENT_PLATFORMS);
  return {
    platform,
    url: `https://${platform}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    readTime: faker.datatype.boolean(0.8) ? `${faker.number.int({ min: 3, max: 30 })} min read` : undefined,
    coverImage: faker.datatype.boolean(0.6) ? `https://picsum.photos/seed/${faker.string.uuid()}/800/400` : undefined,
  };
}

// Main gem generator
function generateGem(type: GemType): Gem {
  const baseGem = generateBaseGem(type);
  let properties;

  switch (type) {
    case 'music':
      properties = generateMusicProperties();
      break;
    case 'art':
      properties = generateArtProperties();
      break;
    case 'craft':
      properties = generateCraftProperties();
      break;
    case 'content':
      properties = generateContentProperties();
      break;
    default:
      throw new Error(`Unsupported gem type: ${type}`);
  }

  return {
    ...baseGem,
    properties,
  };
}

// Generate a set of dummy gems
export function generateGems(count: number): Gem[] {
  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(['music', 'art', 'craft', 'content'] as const);
    return generateGem(type);
  });
}

export const dummyGems = generateGems(100);
