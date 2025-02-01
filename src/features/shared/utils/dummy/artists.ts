import { audienceSizes, genderOptions, languages, musicGenres } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { faker } from '@faker-js/faker';
import { Artist, ArtistGender, ArtistSnapshot, AudienceSize, VerificationType } from '../../../artists/types';

faker.seed(42);

const generateGender = (): ArtistGender => {
  return faker.helpers.arrayElement(genderOptions).id as ArtistGender;
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
      (audienceSizes.find((size) => {
        const [min, max] = size.description?.split(' - ').map((str) => {
          return parseInt(str.replace(/[^0-9]/g, '')) || 0;
        }) || [0, 0];
        return followers >= min && followers <= max;
      })?.id as AudienceSize) || 'microscopic';

    const artist: Artist = {
      id: faker.string.uuid(),
      name,
      genres: faker.helpers.arrayElements(
        musicGenres.flatMap((group) => group.options.map((option) => option.id)),
        { min: 1, max: 3 },
      ),
      gender: generateGender(),
      audienceSize,

      ...(hasAvatar && {
        avatar: `https://i.pravatar.cc/300?u=${faker.string.uuid()}`,
      }),
      ...(hasBanner && {
        banner: `https://picsum.photos/seed/${faker.string.uuid()}/1200/400`,
      }),

      location: {
        city: faker.helpers.maybe(() => faker.location.city()),
        country: faker.helpers.maybe(() => faker.location.country()),
      },
      language: faker.helpers.arrayElements(
        languages.map((lang) => lang.id),
        { min: 1, max: 3 },
      ),

      links: {
        ...(faker.datatype.boolean(0.3) && { website: `https://${faker.internet.domainName()}` }),
        ...(faker.datatype.boolean(0.5) && { bandcamp: 'https://bandcamp.com' }),
        ...(faker.datatype.boolean(0.4) && { soundcloud: 'https://soundcloud.com' }),
        ...(faker.datatype.boolean(0.3) && { spotify: 'https://spotify.com' }),
        ...(faker.datatype.boolean(0.4) && { youtube: 'https://youtube.com' }),
        ...(faker.datatype.boolean(0.6) && { instagram: 'https://instagram.com' }),
        ...(faker.datatype.boolean(0.4) && { twitter: 'https://twitter.com' }),
      },

      stats: {
        followers,
        monthlyListeners: faker.number.int({ min: 0, max: followers }),
        lastSongDate: faker.date.past().toISOString(),
      },

      metadata: {
        verificationType: faker.helpers.arrayElement(['platform_verified', 'claimed']) as VerificationType,
        status: faker.helpers.arrayElement(['active']),
      },

      tags: faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative', 'experimental', 'emerging'], { min: 1, max: 4 }),

      revisionHistory: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
        timestamp: faker.date.past().toISOString(),
        editorId: faker.string.uuid(),
        type: faker.helpers.arrayElement(['create', 'update', 'verify', 'claim']),
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
