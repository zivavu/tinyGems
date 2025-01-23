import { faker } from '@faker-js/faker';
import { Artist } from '../../../artists/types/artistTypes';

// Set a consistent seed for reproducible data
faker.seed(42);

export function generateDummyArtists(count = 100): Artist[] {
  const artistsArray: Artist[] = [];

  for (let i = 0; i < count; i++) {
    faker.seed(42 + i);

    const name = faker.person.firstName() + ' ' + faker.helpers.arrayElement(['Project', 'Collective', 'Experience', '']);
    const hasAvatar = faker.datatype.boolean(0.9);
    const hasBanner = faker.datatype.boolean(0.7);

    const artist: Artist = {
      id: faker.string.uuid(),
      primaryCategory: 'music',
      tags: [],
      name,
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
      stats: {
        followers: faker.number.int({ min: 0, max: 1000 }),
        following: faker.number.int({ min: 0, max: 200 }),
        gems: faker.number.int({ min: 1, max: 50 }),
      },
    };

    artistsArray.push(artist);
  }

  return artistsArray;
}

// Export a constant set of dummy artists
export const dummyArtists = generateDummyArtists();
