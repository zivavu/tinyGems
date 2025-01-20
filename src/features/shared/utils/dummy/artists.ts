import { faker } from '@faker-js/faker';
import { Artist } from '../../../artists/types/artist';
import { categories } from './categories';

// Set a consistent seed for reproducible data
faker.seed(42);

export function generateDummyArtists(count = 100): Artist[] {
  return Array.from({ length: count }, (_, index) => {
    // Use the index in the seed calculation to ensure each artist is unique but consistent
    faker.seed(42 + index);

    const name = faker.person.firstName() + ' ' + faker.helpers.arrayElement(['Project', 'Collective', 'Experience', '']);
    const hasAvatar = faker.datatype.boolean(0.8); // 80% chance to have avatar
    const hasBanner = faker.datatype.boolean(0.6); // 60% chance to have banner
    const primaryCategory = faker.helpers.arrayElement(categories.filter((c) => c.slug !== 'all')).slug;

    return {
      id: faker.string.uuid(),
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
      tags: faker.helpers.arrayElements(categories.find((c) => c.slug === primaryCategory)?.options || [], { min: 1, max: 4 }),
      primaryCategory,
    };
  });
}

// Export a constant set of dummy artists
export const dummyArtists = generateDummyArtists();
