import {
  languages,
  lyricsTopicOptions,
  moodOptions,
  musicGenres,
  platformOptions,
} from '@/features/gems/components/FiltersInputBar/filterOptions';
import { MusicGem, Platform, PlatformType } from '@/features/gems/types';
import { faker } from '@faker-js/faker';
import { createArtistSnapshot, dummyArtists } from './artists';

faker.seed(333);

const SAMPLE_SINGLES_URLS = {
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
  ],
} as const;

function generatePlatformUrl(platform: string): string {
  if (platform === 'other') {
    return `https://music.example.com/${faker.helpers.slugify(faker.lorem.words(2))}`;
  }
  return faker.helpers.arrayElement(SAMPLE_SINGLES_URLS[platform as keyof typeof SAMPLE_SINGLES_URLS] || []);
}

function generateGem() {
  const randomArtist = faker.helpers.arrayElement(dummyArtists);
  const platformCount = faker.number.int({ min: 1, max: 3 });
  const selectedPlatforms = faker.helpers.arrayElements(
    platformOptions.map((p) => p.id),
    platformCount,
  );

  const platforms: Platform[] = selectedPlatforms.map((platformName) => ({
    name: platformName as PlatformType,
    url: generatePlatformUrl(platformName),
  }));

  const mediaInfo = {};

  return {
    id: faker.string.uuid(),
    category: 'music',
    title: faker.lorem.words({ min: 2, max: 4 }),
    artist: createArtistSnapshot(randomArtist),

    metadata: {
      releaseDate: faker.date.past().toISOString(),
      submittedByUserId: faker.string.uuid(),
      status: faker.helpers.arrayElement(['active', 'deleted', 'hidden']),
    },

    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    stats: {
      likes: faker.number.int({ min: 0, max: 500 }),
      saves: faker.number.int({ min: 0, max: 200 }),
      views: faker.number.int({ min: 0, max: 1000 }),
    },

    tags: faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative'], { min: 1, max: 3 }),

    properties: {
      media: {
        coverImage: mediaInfo.coverImage || `https://picsum.photos/seed/${faker.string.uuid()}/800/800`,
      },
      isSingle: faker.datatype.boolean({ probability: 0.2 }),
      platforms,
      releaseDate: faker.date.past().toISOString(),
      duration: `${faker.number.int({ min: 1, max: 10 })}:${faker.number.int({ min: 10, max: 59 })}`,
      genres: faker.helpers.arrayElements(
        musicGenres.flatMap((group) => group.options.map((option) => option.id)),
        { min: 1, max: 3 },
      ),
      lyricsTopics: faker.helpers.arrayElements(
        lyricsTopicOptions.map((topic) => topic.id),
        { min: 1, max: 3 },
      ),
      languages: faker.helpers.arrayElements(
        languages.map((lang) => lang.id),
        { min: 1, max: 2 },
      ),
      moods: faker.helpers.arrayElements(
        moodOptions.map((mood) => mood.id),
        { min: 1, max: 3 },
      ),
      features: {
        hasMusicVideo: faker.datatype.boolean(),
        hasLyrics: faker.datatype.boolean(),
      },
    },
  };
}

export function generateDummyGems(count = 1000) {
  const gemsPerArtist = Math.ceil(count / dummyArtists.length);
  const gems: MusicGem[] = [];

  for (const artist of dummyArtists) {
    const artistGems = Array.from({ length: gemsPerArtist }, () => {
      const gem = generateGem();
      gem.artist = createArtistSnapshot(artist);
      return gem;
    });
    gems.push(...artistGems);
  }

  return gems.slice(0, count);
}

export const dummyGems = generateDummyGems();
