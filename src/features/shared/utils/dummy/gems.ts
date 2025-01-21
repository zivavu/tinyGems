import { faker } from '@faker-js/faker';
import {
  ArtGemProperties,
  BaseGemProperties,
  ContentGemProperties,
  CraftGemProperties,
  Gem,
  GemType,
  MusicGemProperties,
} from '../../../gems/types/gems';
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

function generateArtProperties(): ArtGemProperties {
  return {
    ...generateBaseGemProperties(),
    medium: faker.helpers.arrayElements(ART_MEDIUMS, { min: 1, max: 3 }),
    dimensions: faker.datatype.boolean(0.7)
      ? `${faker.number.int({ min: 20, max: 200 })}x${faker.number.int({ min: 20, max: 200 })}cm`
      : undefined,
    materials: faker.datatype.boolean(0.8) ? faker.helpers.arrayElements(CRAFT_MATERIALS, { min: 1, max: 3 }) : undefined,
  };
}

function generateCraftProperties(): CraftGemProperties {
  return {
    ...generateBaseGemProperties(),
    materials: faker.helpers.arrayElements(CRAFT_MATERIALS, { min: 1, max: 4 }),
    dimensions: faker.datatype.boolean(0.6)
      ? `${faker.number.int({ min: 10, max: 100 })}x${faker.number.int({ min: 10, max: 100 })}cm`
      : undefined,
    timeToMake: faker.datatype.boolean(0.7) ? `${faker.number.int({ min: 1, max: 100 })} hours` : undefined,
  };
}

function generateContentProperties(): ContentGemProperties {
  return {
    ...generateBaseGemProperties(),
    platform: faker.helpers.arrayElement(CONTENT_PLATFORMS),
    url: `https://${faker.helpers.arrayElement(CONTENT_PLATFORMS)}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    readTime: faker.datatype.boolean(0.8) ? `${faker.number.int({ min: 3, max: 30 })} min read` : undefined,
  };
}

function generateWordsProperties(): ContentGemProperties {
  return {
    ...generateBaseGemProperties(),
    platform: 'blog',
    url: `https://${faker.helpers.arrayElement(CONTENT_PLATFORMS)}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    readTime: faker.datatype.boolean(0.8) ? `${faker.number.int({ min: 3, max: 30 })} min read` : undefined,
  };
}

function generateVideoProperties(): ContentGemProperties {
  return {
    ...generateBaseGemProperties(),
    platform: 'blog',
    url: `https://youtube.com/watch?v=${faker.string.alphanumeric(11)}`,
    readTime: faker.datatype.boolean(0.8) ? `${faker.number.int({ min: 2, max: 20 })} min` : undefined,
  };
}

function generatePhotographyProperties(): ArtGemProperties {
  return {
    ...generateBaseGemProperties(),
    medium: ['photography'],
    dimensions: faker.datatype.boolean(0.9)
      ? `${faker.number.int({ min: 2000, max: 6000 })}x${faker.number.int({ min: 1500, max: 4000 })}px`
      : undefined,
    materials: faker.datatype.boolean(0.6)
      ? faker.helpers.arrayElements(['digital', 'film', '35mm', 'medium format'], { min: 1, max: 2 })
      : undefined,
  };
}

function generateMixedMediaProperties(): ArtGemProperties {
  return {
    ...generateBaseGemProperties(),
    medium: faker.helpers.arrayElements([...ART_MEDIUMS, 'photography', 'digital', 'video'], { min: 2, max: 4 }),
    dimensions: faker.datatype.boolean(0.6)
      ? `${faker.number.int({ min: 20, max: 200 })}x${faker.number.int({ min: 20, max: 200 })}cm`
      : undefined,
    materials: faker.helpers.arrayElements([...CRAFT_MATERIALS, 'digital media', 'found objects'], { min: 2, max: 5 }),
  };
}

function generateOtherProperties(): ContentGemProperties {
  return {
    ...generateBaseGemProperties(),
    platform: 'other',
    url: `https://${faker.internet.domainName()}/${faker.helpers.slugify(faker.lorem.words(2))}`,
    readTime: undefined,
  };
}

function generateDigitalArtProperties(): ArtGemProperties {
  return {
    ...generateBaseGemProperties(),
    medium: ['digital', 'video', 'photography'],
    dimensions: faker.datatype.boolean(0.9)
      ? `${faker.number.int({ min: 2000, max: 6000 })}x${faker.number.int({ min: 1500, max: 4000 })}px`
      : undefined,
  };
}

function generateFiberArtsProperties(): CraftGemProperties {
  return {
    ...generateBaseGemProperties(),
    materials: faker.helpers.arrayElements(['yarn', 'wool', 'cotton', 'silk', 'linen', 'thread', 'embroidery floss', 'felt', 'fabric'], {
      min: 1,
      max: 4,
    }),
    dimensions: faker.datatype.boolean(0.7)
      ? `${faker.number.int({ min: 20, max: 200 })}x${faker.number.int({ min: 20, max: 200 })}cm`
      : undefined,
    timeToMake: faker.datatype.boolean(0.6) ? `${faker.number.int({ min: 2, max: 100 })} hours` : undefined,
  };
}

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
    case 'content-creation':
      properties = generateContentProperties();
      break;
    case 'words':
      properties = generateWordsProperties();
      break;
    case 'video':
      properties = generateVideoProperties();
      break;
    case 'photography':
      properties = generatePhotographyProperties();
      break;
    case 'mixed-media':
      properties = generateMixedMediaProperties();
      break;
    case 'other':
      properties = generateOtherProperties();
      break;
    case 'fiber-arts':
      properties = generateFiberArtsProperties();
      break;
    case 'digital-art':
      properties = generateDigitalArtProperties();
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

    const type = faker.helpers.arrayElement([
      'music',
      'art',
      'craft',
      'content-creation',
      'words',
      'video',
      'photography',
      'mixed-media',
      'other',
      'fiber-arts',
      'digital-art',
    ] as const);
    return generateGem(type);
  });
}

export const dummyGems = generateDummyGems();
