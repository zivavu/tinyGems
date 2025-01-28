import { faker } from '@faker-js/faker';
import { Artist, ArtistGender, AudienceSize } from '../../../artists/types/artistTypes';
import { ArtistSnapshot } from '../../../gems/types/gemsTypes';

// Set a consistent seed for reproducible data
faker.seed(42);

const generateGender = (): ArtistGender => {
  const genders: ArtistGender[] = ['male', 'female', 'non-binary', 'other', 'group'];
  return faker.helpers.arrayElement(genders);
};

export function generateDummyArtists(count = 100): Artist[] {
  const artistsArray: Artist[] = [];

  for (let i = 0; i < count; i++) {
    faker.seed(42 + i);

    const name = faker.person.firstName() + ' ' + faker.helpers.arrayElement(['Project', 'Collective', 'Experience', '']);
    const hasAvatar = faker.datatype.boolean(0.9);
    const hasBanner = faker.datatype.boolean(0.7);
    const followers = faker.number.int({ min: 0, max: 150000 });
    const audienceSize: AudienceSize =
      followers < 100
        ? 'microscopic'
        : followers < 1000
          ? 'tiny'
          : followers < 10000
            ? 'little'
            : followers < 50000
              ? 'small'
              : followers < 100000
                ? 'substantial'
                : 'giant';

    const artist: Artist = {
      id: faker.string.uuid(),
      primaryCategory: 'music',
      name,
      gender: generateGender(),
      audienceSize,

      ...(hasAvatar && {
        avatar: `https://i.pravatar.cc/300?u=${faker.string.uuid()}`,
      }),
      ...(hasBanner && {
        banner: `https://picsum.photos/seed/${faker.string.uuid()}/1200/400`,
      }),

      location: faker.helpers.maybe(() => `${faker.location.city()}, ${faker.location.country()}`),
      bio: faker.helpers.maybe(() => faker.lorem.paragraph()),

      links: {
        ...(faker.datatype.boolean(0.3) && { website: `https://${faker.internet.domainName()}` }),
        ...(faker.datatype.boolean(0.5) && { bandcamp: 'https://bandcamp.com' }),
        ...(faker.datatype.boolean(0.4) && { soundcloud: 'https://soundcloud.com' }),
        ...(faker.datatype.boolean(0.3) && { spotify: 'https://spotify.com' }),
        ...(faker.datatype.boolean(0.4) && { youtube: 'https://youtube.com' }),
        ...(faker.datatype.boolean(0.6) && { instagram: 'https://instagram.com' }),
        ...(faker.datatype.boolean(0.4) && { twitter: 'https://twitter.com' }),
      },

      joinedAt: faker.date.past({ years: 2 }).toISOString(),
      lastUpdated: faker.date.recent().toISOString(),

      stats: {
        followers,
        following: faker.number.int({ min: 0, max: 200 }),
        gems: faker.number.int({ min: 1, max: 50 }),
      },

      tags: faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative', 'experimental', 'emerging'], { min: 1, max: 4 }),

      revisionHistory: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
        timestamp: faker.date.past().toISOString(),
        editorId: faker.string.uuid(),
        changes: {
          field: faker.helpers.arrayElement(['name', 'bio', 'location']),
          oldValue: faker.lorem.word(),
          newValue: faker.lorem.word(),
        },
      })),
    };

    artistsArray.push(artist);
  }

  return artistsArray;
}

// Helper function to create artist snapshot for gems
export function createArtistSnapshot(artist: Artist): ArtistSnapshot {
  return {
    id: artist.id,
    name: artist.name,
    location: artist.location,
    avatar: artist.avatar,
    gender: artist.gender,
    audienceSize: artist.audienceSize,
  };
}

// Export a constant set of dummy artists
export const dummyArtists = generateDummyArtists();
