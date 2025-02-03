import { Album, AlbumType } from '@/features/albums/types';
import { languages, musicGenres } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { faker } from '@faker-js/faker';
import { createArtistSnapshot, dummyArtists } from './artists';
import { dummyGems } from './gems';

faker.seed(123);

export const SAMPLE_ALBUMS_URLS = {
  bandcamp: [
    {
      url: 'https://newworldofmine.bandcamp.com/album/after-ovid',
      albumId: '1282391830',
    },
    {
      url: 'https://fine-sir-1584660650.bandcamp.com/album/1584660650',
      albumId: '3533779838',
    },
  ],
  spotify: [
    'https://open.spotify.com/album/4V2oTrdyhyZ3fBNPL3TNMS',
    'https://open.spotify.com/album/1aVKHYdh9Qqv0lKulUturf',
    'https://open.spotify.com/album/5JuoWId7VBeIeVKVwGUi0g',
  ],
};

function calculateAlbumDuration(gems: typeof dummyGems): string {
  const totalSeconds = gems.reduce((acc, gem) => {
    const [minutes, seconds] = gem.properties.duration.split(':').map(Number);
    return acc + (minutes * 60 + seconds);
  }, 0);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function generateDummyAlbums(count = 20): Album[] {
  return Array.from({ length: count }, () => {
    const randomArtist = faker.helpers.arrayElement(dummyArtists);
    const artistGems = dummyGems.filter((gem) => gem.artist?.id === randomArtist.id && !gem.properties.isSingle);

    if (artistGems.length === 0) {
      return null;
    }

    const maxTracks = Math.min(12, artistGems.length);
    const minTracks = Math.min(7, maxTracks);
    const albumGemsCount = faker.number.int({ min: minTracks, max: maxTracks });
    const albumGems = faker.helpers.arrayElements(artistGems, albumGemsCount);

    const albumType: AlbumType = albumGemsCount <= 4 ? 'ep' : albumGemsCount <= 6 ? faker.helpers.arrayElement(['ep', 'album']) : 'album';

    const platform = faker.helpers.arrayElement(['spotify', 'bandcamp']);

    const album: Album = {
      id: faker.string.uuid(),
      type: albumType,
      title: faker.music.songName(),
      artist: createArtistSnapshot(randomArtist),
      createdAt: faker.date.past().toISOString(),

      metadata: {
        releaseDate: faker.date.past().toISOString(),
        submittedByUserId: faker.string.uuid(),
        status: faker.helpers.arrayElement(['active', 'hidden', 'deleted']),
      },

      stats: {
        likes: faker.number.int({ min: 0, max: 1000 }),
        saves: faker.number.int({ min: 0, max: 500 }),
        views: faker.number.int({ min: 0, max: 2000 }),
      },

      tracks: albumGems.map((gem, index) => ({
        gemId: gem.id,
        order: index + 1,
      })),

      tags: faker.helpers.arrayElements(['underground', 'diy', 'indie', 'alternative', 'experimental'], { min: 1, max: 3 }),

      properties: {
        media: {
          coverImage: faker.helpers.maybe(() => `https://picsum.photos/seed/${faker.string.uuid()}/800/800`, { probability: 0.9 }),
        },
        platforms: [
          {
            name: platform,
            url: faker.helpers.arrayElement(platform === 'spotify' ? SAMPLE_ALBUMS_URLS.spotify : SAMPLE_ALBUMS_URLS.bandcamp),
          },
        ],

        duration: calculateAlbumDuration(albumGems),
        genres: faker.helpers.arrayElements(
          musicGenres.flatMap((group) => group.options.map((option) => option.id)),
          { min: 1, max: 3 },
        ),
        language: faker.helpers.arrayElements(
          languages.map((lang) => lang.id),
          { min: 1, max: 2 },
        ),
        totalTracks: albumGems.length,
      },
    };

    return album;
  }).filter((album): album is Album => album !== null);
}

export const dummyAlbums = generateDummyAlbums(30);
