import { faker } from '@faker-js/faker';
import { MusicGem } from '../types/gems';

const MUSIC_SOURCES = ['bandcamp', 'spotify', 'soundcloud', 'youtube'] as const;
const GENRES = [
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

function generateMusicGem(): MusicGem {
  const hasAvatar = faker.datatype.boolean(0.7); // 70% chance to have avatar
  const hasAlbumArt = faker.datatype.boolean(0.9); // 90% chance to have album art
  const genres = faker.helpers.arrayElements(GENRES, { min: 1, max: 3 });
  const source = faker.helpers.arrayElement(MUSIC_SOURCES);

  return {
    id: faker.string.uuid(),
    type: 'music',
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    category: 'music',
    artist: {
      name: faker.person.firstName() + ' ' + faker.helpers.arrayElement(['Project', 'Collective', 'Experience', '']),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      ...(hasAvatar && { avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}` }),
    },
    source,
    sourceUrl: `https://${source}.com/${faker.helpers.slugify(faker.lorem.words(2))}`,
    ...(hasAlbumArt && {
      albumArt: `https://picsum.photos/seed/${faker.string.uuid()}/300/300`,
    }),
    duration: `${faker.number.int({ min: 2, max: 8 })}:${faker.number.int({ min: 10, max: 59 })}`,
    releaseDate: faker.date.recent({ days: 90 }).toISOString(),
    genres,
    tags: [...genres, ...faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative'], { min: 1, max: 2 })],
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 15 }).toISOString(),
    likes: faker.number.int({ min: 0, max: 500 }),
    saves: faker.number.int({ min: 0, max: 200 }),
    curator: faker.datatype.boolean(0.3)
      ? {
          name: faker.internet.displayName(),
          avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
        }
      : undefined,
  };
}

export const dummyGems: MusicGem[] = Array.from({ length: 60 }, generateMusicGem);

// You can also export the generator function if you need it elsewhere
export { generateMusicGem };
