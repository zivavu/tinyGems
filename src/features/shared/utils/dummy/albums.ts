import { Album, AlbumType } from '@/features/albums/types';
import { languages, musicGenres } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { faker } from '@faker-js/faker';
import { createArtistSnapshot, dummyArtists } from './artists';
import { dummyGems } from './gems';

faker.seed(123);

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
    const albumGemsCount = faker.number.int({ min: 3, max: 12 });

    const albumGems = faker.helpers.arrayElements(
      dummyGems.filter((gem) => gem.artist?.id === randomArtist.id && !gem.properties.isSingle),
      Math.min(albumGemsCount, dummyGems.filter((gem) => gem.artist?.id === randomArtist.id && !gem.properties.isSingle).length),
    );

    const albumType: AlbumType = faker.helpers.arrayElement(['album', 'ep', 'mixtape', 'compilation']);

    const album: Album = {
      id: faker.string.uuid(),
      type: albumType,
      title: faker.music.songName(),
      artist: createArtistSnapshot(randomArtist),
      createdAt: faker.date.past().toISOString(),

      metadata: {
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
        platforms: albumGems[0]?.properties.platforms || [],
        releaseDate: faker.date.past().toISOString(),
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
  });
}

export const dummyAlbums = generateDummyAlbums();
