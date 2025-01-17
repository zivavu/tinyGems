import { faker } from '@faker-js/faker';
import { MusicGem } from '../types/gems';
import { dummyArtists } from './artists';

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
  const randomArtist = faker.helpers.arrayElement(dummyArtists);
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
      id: randomArtist.id,
      name: randomArtist.name,
      location: randomArtist.location,
      avatar: randomArtist.avatar,
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

export const dummyGems: MusicGem[] = [
  {
      "id": "5f6d3509-c3cb-4367-afab-414ccc64755c",
      "type": "music",
      "title": "Another Night",
      "description": "Conor toties appositus nam impedit cultura corroboro.",
      "category": "music",
      "artist": {
          "id": "d76704ee-de1c-49b0-8785-bc28e50a0dd3",
          "name": "Viola Experience",
          "avatar": "https://i.pravatar.cc/300?u=fc94cb23-bc52-4621-92b8-9258a2f52925"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/traho-ocer",
      "albumArt": "https://picsum.photos/seed/ac9c8f3b-f1ae-4cad-98bc-98624046130f/300/300",
      "duration": "2:38",
      "releaseDate": "2024-12-05T07:19:15.726Z",
      "genres": [
          "darkwave"
      ],
      "tags": [
          "darkwave",
          "indie",
          "alternative"
      ],
      "createdAt": "2024-12-25T07:41:24.291Z",
      "updatedAt": "2025-01-05T05:08:40.862Z",
      "likes": 124,
      "saves": 5
  },
  {
      "id": "79220dfa-6f0f-4c98-aaf3-0527321e5afe",
      "type": "music",
      "title": "Peg o' My Heart",
      "description": "Apud sui atrocitas verbera administratio supra apto officiis.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/succedo-arceo",
      "albumArt": "https://picsum.photos/seed/ee9c875e-bad6-4504-b92d-7b399428e789/300/300",
      "duration": "2:47",
      "releaseDate": "2024-10-31T07:05:25.055Z",
      "genres": [
          "underground-hip-hop"
      ],
      "tags": [
          "underground-hip-hop",
          "underground",
          "diy"
      ],
      "createdAt": "2025-01-03T00:25:04.255Z",
      "updatedAt": "2025-01-04T03:24:54.183Z",
      "likes": 142,
      "saves": 118
  },
  {
      "id": "cb77e7de-4e19-47f3-b97f-0dc463c4fe9a",
      "type": "music",
      "title": "Band of Gold",
      "description": "Decerno textus acceptus assumenda arguo vomica arcesso antepono.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/creptio-debilito",
      "albumArt": "https://picsum.photos/seed/efa3771f-9d1f-4aaf-a967-5006d34940de/300/300",
      "duration": "5:50",
      "releaseDate": "2024-10-27T09:44:33.140Z",
      "genres": [
          "bedroom-pop",
          "industrial"
      ],
      "tags": [
          "bedroom-pop",
          "industrial",
          "diy",
          "indie"
      ],
      "createdAt": "2024-12-26T00:03:35.056Z",
      "updatedAt": "2025-01-10T06:28:30.176Z",
      "likes": 260,
      "saves": 44,
      "curator": {
          "name": "Nelson_Abbott",
          "avatar": "https://i.pravatar.cc/150?u=7fd7bd5d-3024-4dd3-bc4d-e5db5e96e8c8"
      }
  },
  {
      "id": "52607364-1cc4-4c35-8154-4e8d2f606558",
      "type": "music",
      "title": "Hey Baby",
      "description": "Coniecto tersus adversus tergo ustilo cenaculum.",
      "category": "music",
      "artist": {
          "id": "7598a385-4a14-4e05-97ca-00d589ef99a6",
          "name": "Enos Experience",
          "avatar": "https://i.pravatar.cc/300?u=29067a80-48f1-41db-a485-2ea8d39493af"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/cimentarius-vito",
      "albumArt": "https://picsum.photos/seed/c326bf58-3e64-47d5-9332-f96e033d96b8/300/300",
      "duration": "7:39",
      "releaseDate": "2024-12-07T10:15:37.328Z",
      "genres": [
          "underground-hip-hop",
          "bedroom-pop"
      ],
      "tags": [
          "underground-hip-hop",
          "bedroom-pop",
          "indie"
      ],
      "createdAt": "2025-01-12T06:28:25.082Z",
      "updatedAt": "2025-01-16T13:15:22.936Z",
      "likes": 122,
      "saves": 37
  },
  {
      "id": "7cf6f40e-0c30-49f8-a550-383778f1fdac",
      "type": "music",
      "title": "Loving You",
      "description": "Desipio ago centum dedico valetudo velociter.",
      "category": "music",
      "artist": {
          "id": "cc182c68-930d-4dd0-9c96-614fcb99f409",
          "name": "Cleveland ",
          "avatar": "https://i.pravatar.cc/300?u=4f517834-e128-4b3e-8702-b70cd1814791"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/cotidie-pauper",
      "albumArt": "https://picsum.photos/seed/663f10ee-c93d-4d3f-83b9-3f3580687ed0/300/300",
      "duration": "4:29",
      "releaseDate": "2024-10-28T04:17:29.162Z",
      "genres": [
          "lo-fi"
      ],
      "tags": [
          "lo-fi",
          "diy",
          "alternative"
      ],
      "createdAt": "2024-12-23T01:08:12.608Z",
      "updatedAt": "2025-01-10T00:19:33.761Z",
      "likes": 56,
      "saves": 186
  },
  {
      "id": "0212d5c6-fbcf-42e0-9a6c-0fafa54a216d",
      "type": "music",
      "title": "You Can't Hurry Love",
      "description": "Acer error tui textor adopto.",
      "category": "music",
      "artist": {
          "id": "8bdea961-f110-421f-8acb-a6812bdb614b",
          "name": "Lester Collective"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/cuius-vigor",
      "albumArt": "https://picsum.photos/seed/c162ff4f-c573-44eb-b136-17d8262e09c5/300/300",
      "duration": "6:58",
      "releaseDate": "2024-11-18T13:03:24.504Z",
      "genres": [
          "lo-fi",
          "electronic"
      ],
      "tags": [
          "lo-fi",
          "electronic",
          "diy",
          "alternative"
      ],
      "createdAt": "2024-12-19T12:52:44.305Z",
      "updatedAt": "2025-01-12T06:31:19.122Z",
      "likes": 151,
      "saves": 34
  },
  {
      "id": "60475406-62c5-4d14-8578-5be676898ada",
      "type": "music",
      "title": "I'll Take You There",
      "description": "Coniecto totus amaritudo totus tametsi sollicito arceo tot summopere deserunt.",
      "category": "music",
      "artist": {
          "id": "104ebab4-865c-4b13-a34a-e84c8b7fcc12",
          "name": "Torey "
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/benevolentia-cogito",
      "albumArt": "https://picsum.photos/seed/21ef5488-744a-4900-a283-ed5b6daf6aea/300/300",
      "duration": "4:54",
      "releaseDate": "2024-11-13T00:39:50.300Z",
      "genres": [
          "lo-fi",
          "indie-folk"
      ],
      "tags": [
          "lo-fi",
          "indie-folk",
          "alternative",
          "diy"
      ],
      "createdAt": "2025-01-09T01:46:26.910Z",
      "updatedAt": "2025-01-09T18:10:38.383Z",
      "likes": 232,
      "saves": 196
  },
  {
      "id": "69cdf06f-1d71-427b-9346-4a36ef4beca0",
      "type": "music",
      "title": "School's Out",
      "description": "Ab abduco conscendo cauda cilicium recusandae pauci acidus comparo.",
      "category": "music",
      "artist": {
          "id": "ed13a02a-370f-46c8-bb74-17944cac5229",
          "name": "Cary Project",
          "avatar": "https://i.pravatar.cc/300?u=6b29505b-228f-484f-accf-a471e76dc7bd"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/defleo-numquam",
      "albumArt": "https://picsum.photos/seed/1a81f1c1-6c7b-4902-a30a-c604de32499d/300/300",
      "duration": "7:24",
      "releaseDate": "2024-12-05T13:22:14.849Z",
      "genres": [
          "punk"
      ],
      "tags": [
          "punk",
          "indie",
          "alternative"
      ],
      "createdAt": "2024-12-22T16:40:13.491Z",
      "updatedAt": "2025-01-11T09:24:04.395Z",
      "likes": 209,
      "saves": 19
  },
  {
      "id": "b5706b90-72a5-4e5c-a71f-daf79a4abc01",
      "type": "music",
      "title": "I Will Always Love You",
      "description": "Colligo voveo admoneo coadunatio vel curis aegrus campana.",
      "category": "music",
      "artist": {
          "id": "3fba64fa-09a1-4428-9fdf-17e6d492dc52",
          "name": "Peyton Experience",
          "avatar": "https://i.pravatar.cc/300?u=b6585972-d441-4477-8f67-8e7eb44cd587"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/quo-celebrer",
      "albumArt": "https://picsum.photos/seed/d86f380a-258f-4565-9052-04184aa2e0d3/300/300",
      "duration": "7:27",
      "releaseDate": "2024-12-19T21:36:06.636Z",
      "genres": [
          "noise-rock",
          "post-rock",
          "underground-hip-hop"
      ],
      "tags": [
          "noise-rock",
          "post-rock",
          "underground-hip-hop",
          "alternative"
      ],
      "createdAt": "2025-01-05T22:44:19.840Z",
      "updatedAt": "2025-01-04T09:51:29.809Z",
      "likes": 386,
      "saves": 79,
      "curator": {
          "name": "Briana_Feeney",
          "avatar": "https://i.pravatar.cc/150?u=67c464b7-c4e4-4cb2-ad27-576fc14fe6b9"
      }
  },
  {
      "id": "0bdb6410-a9c9-4592-b64f-ab6ffa838096",
      "type": "music",
      "title": "All My Lovin' (You're Never Gonna Get It)",
      "description": "Aetas surculus spes uterque.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/adiuvo-vinitor",
      "albumArt": "https://picsum.photos/seed/5707cd0a-8afa-4180-935d-5ec1d9772b68/300/300",
      "duration": "3:27",
      "releaseDate": "2024-12-27T04:16:32.977Z",
      "genres": [
          "synthwave",
          "underground-hip-hop"
      ],
      "tags": [
          "synthwave",
          "underground-hip-hop",
          "indie"
      ],
      "createdAt": "2025-01-15T08:16:16.752Z",
      "updatedAt": "2025-01-10T14:57:31.682Z",
      "likes": 342,
      "saves": 173
  },
  {
      "id": "4bf16829-51fa-4b9b-8bb8-f6ae6e17b97e",
      "type": "music",
      "title": "Smooth",
      "description": "Depromo curriculum utroque cohibeo magnam congregatio degusto decipio coerceo aestivus.",
      "category": "music",
      "artist": {
          "id": "43d2f933-d494-448b-84cf-006e28a6318a",
          "name": "Davin Experience"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/tertius-sub",
      "albumArt": "https://picsum.photos/seed/667e5943-fe78-406d-b7bf-d715d1374edb/300/300",
      "duration": "7:55",
      "releaseDate": "2024-11-21T13:23:31.466Z",
      "genres": [
          "experimental",
          "industrial",
          "indie-folk"
      ],
      "tags": [
          "experimental",
          "industrial",
          "indie-folk",
          "underground"
      ],
      "createdAt": "2024-12-22T23:35:43.752Z",
      "updatedAt": "2025-01-12T22:50:33.067Z",
      "likes": 480,
      "saves": 189
  },
  {
      "id": "20f24062-c019-4e53-adb8-891277f26180",
      "type": "music",
      "title": "Arthur's Theme (Best That You Can Do)",
      "description": "Comitatus alias arca vociferor supplanto tunc.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/tergo-pectus",
      "albumArt": "https://picsum.photos/seed/f1c0cf6b-123a-43e7-97df-155710c320cf/300/300",
      "duration": "7:46",
      "releaseDate": "2024-11-21T15:42:15.361Z",
      "genres": [
          "noise-rock"
      ],
      "tags": [
          "noise-rock",
          "underground",
          "indie"
      ],
      "createdAt": "2024-12-28T09:26:52.449Z",
      "updatedAt": "2025-01-14T02:17:35.276Z",
      "likes": 461,
      "saves": 152
  },
  {
      "id": "511a21cb-16a9-4414-883f-db79e9cf76c2",
      "type": "music",
      "title": "Chattanoogie Shoe-Shine Boy",
      "description": "Neque sublime ocer umerus confugo cubicularis.",
      "category": "music",
      "artist": {
          "id": "104ebab4-865c-4b13-a34a-e84c8b7fcc12",
          "name": "Torey "
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/adsum-suspendo",
      "albumArt": "https://picsum.photos/seed/eb2b43d0-06a5-4d37-9b43-e2f0a43981de/300/300",
      "duration": "4:16",
      "releaseDate": "2024-10-25T10:37:42.904Z",
      "genres": [
          "industrial"
      ],
      "tags": [
          "industrial",
          "underground",
          "alternative"
      ],
      "createdAt": "2025-01-14T18:06:14.125Z",
      "updatedAt": "2025-01-08T15:10:51.841Z",
      "likes": 69,
      "saves": 109,
      "curator": {
          "name": "Maybelle65",
          "avatar": "https://i.pravatar.cc/150?u=e082fcab-93be-4acb-9e45-a2c77dad63cb"
      }
  },
  {
      "id": "85ca08fa-749f-4f44-b52b-5f6d60862805",
      "type": "music",
      "title": "Higher Love",
      "description": "Ratione decerno adflicto tabella agnosco thymum trucido cumque.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/succurro-abeo",
      "albumArt": "https://picsum.photos/seed/83adacb8-86df-449b-84e9-a20c5fd0f9e0/300/300",
      "duration": "5:10",
      "releaseDate": "2024-11-01T10:23:26.438Z",
      "genres": [
          "drone",
          "ambient"
      ],
      "tags": [
          "drone",
          "ambient",
          "alternative"
      ],
      "createdAt": "2024-12-30T12:04:48.345Z",
      "updatedAt": "2025-01-06T05:25:55.805Z",
      "likes": 453,
      "saves": 74
  },
  {
      "id": "7fcd803c-6c3a-4dc0-9444-c47d8643e439",
      "type": "music",
      "title": "Don't Let the Stars Get in Your Eyes",
      "description": "Valeo conspergo ait sed thymum decumbo communis vulgo.",
      "category": "music",
      "artist": {
          "id": "acc82b5f-403b-4049-b715-e52c9675522e",
          "name": "Rhea ",
          "avatar": "https://i.pravatar.cc/300?u=bbfd4ddd-46d3-4897-a170-b89ae14f6b11"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/triduana-facere",
      "duration": "4:52",
      "releaseDate": "2024-12-17T14:54:22.932Z",
      "genres": [
          "noise-rock",
          "underground-hip-hop",
          "darkwave"
      ],
      "tags": [
          "noise-rock",
          "underground-hip-hop",
          "darkwave",
          "underground",
          "indie"
      ],
      "createdAt": "2025-01-05T20:53:05.064Z",
      "updatedAt": "2025-01-08T17:01:46.466Z",
      "likes": 96,
      "saves": 98
  },
  {
      "id": "f25055d3-d28d-4325-929f-06fbda965c82",
      "type": "music",
      "title": "Come Together",
      "description": "Cauda nulla cupio xiphias triduana theca.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/comis-aveho",
      "albumArt": "https://picsum.photos/seed/e907dcb4-d214-4fd3-b825-07311b446006/300/300",
      "duration": "2:47",
      "releaseDate": "2025-01-10T00:06:55.325Z",
      "genres": [
          "lo-fi",
          "indie-folk"
      ],
      "tags": [
          "lo-fi",
          "indie-folk",
          "indie"
      ],
      "createdAt": "2024-12-29T16:08:31.837Z",
      "updatedAt": "2025-01-10T04:31:33.442Z",
      "likes": 431,
      "saves": 157,
      "curator": {
          "name": "Fabiola.Greenholt70",
          "avatar": "https://i.pravatar.cc/150?u=169f530b-ccfd-4b2d-8792-1f49abffa2f1"
      }
  },
  {
      "id": "0ee0a70a-3067-4bc4-b624-2e2ea8a91e81",
      "type": "music",
      "title": "Moonlight Cocktail",
      "description": "Caritas canto vaco assumenda ventus vitium adflicto.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/sono-beatus",
      "albumArt": "https://picsum.photos/seed/7042a51e-2d07-4cfa-b150-017f3fa71c9b/300/300",
      "duration": "4:52",
      "releaseDate": "2024-11-23T21:52:56.779Z",
      "genres": [
          "industrial",
          "experimental"
      ],
      "tags": [
          "industrial",
          "experimental",
          "underground"
      ],
      "createdAt": "2025-01-04T12:34:44.674Z",
      "updatedAt": "2025-01-06T02:47:12.777Z",
      "likes": 127,
      "saves": 139
  },
  {
      "id": "a6dfd7e1-b20a-4dfa-9ed0-d884d2fc39eb",
      "type": "music",
      "title": "Cars",
      "description": "Iusto autus adflicto casus vomito administratio.",
      "category": "music",
      "artist": {
          "id": "525de72e-2d44-40db-af12-020a7be55612",
          "name": "Watson Experience",
          "location": "Port Marlenemouth, Wallis and Futuna"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/similique-thermae",
      "albumArt": "https://picsum.photos/seed/6d9bd871-3cc0-4a3e-95b1-99028ea9ed76/300/300",
      "duration": "7:49",
      "releaseDate": "2025-01-09T11:00:19.673Z",
      "genres": [
          "underground-hip-hop"
      ],
      "tags": [
          "underground-hip-hop",
          "indie",
          "alternative"
      ],
      "createdAt": "2024-12-21T12:46:29.601Z",
      "updatedAt": "2025-01-11T20:24:05.586Z",
      "likes": 447,
      "saves": 164
  },
  {
      "id": "e3d98f86-c208-4f43-9f02-77dc45314be0",
      "type": "music",
      "title": "Your Cheatin' Heart",
      "description": "Cultellus pectus barba vespillo.",
      "category": "music",
      "artist": {
          "id": "d76704ee-de1c-49b0-8785-bc28e50a0dd3",
          "name": "Viola Experience",
          "avatar": "https://i.pravatar.cc/300?u=fc94cb23-bc52-4621-92b8-9258a2f52925"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/coadunatio-carmen",
      "albumArt": "https://picsum.photos/seed/993f5b65-16e3-428f-afe2-a12e831e617a/300/300",
      "duration": "7:35",
      "releaseDate": "2024-10-23T00:58:55.688Z",
      "genres": [
          "experimental",
          "synthwave",
          "indie-folk"
      ],
      "tags": [
          "experimental",
          "synthwave",
          "indie-folk",
          "alternative"
      ],
      "createdAt": "2025-01-09T01:07:44.411Z",
      "updatedAt": "2025-01-15T07:36:59.736Z",
      "likes": 107,
      "saves": 118,
      "curator": {
          "name": "Dedrick41",
          "avatar": "https://i.pravatar.cc/150?u=95904de1-ebc1-48c5-8549-d7939ab7f63a"
      }
  },
  {
      "id": "5f1c8014-417a-4dbf-9269-ec40481392f9",
      "type": "music",
      "title": "Let's Get it On",
      "description": "Fugit suppono sum ullam surgo acerbitas.",
      "category": "music",
      "artist": {
          "id": "104ebab4-865c-4b13-a34a-e84c8b7fcc12",
          "name": "Torey "
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/laborum-corona",
      "albumArt": "https://picsum.photos/seed/3f6395b3-1504-422c-b0a8-38b932b3e4ce/300/300",
      "duration": "5:34",
      "releaseDate": "2024-12-07T03:32:47.620Z",
      "genres": [
          "lo-fi",
          "experimental",
          "industrial"
      ],
      "tags": [
          "lo-fi",
          "experimental",
          "industrial",
          "indie"
      ],
      "createdAt": "2024-12-22T07:13:55.002Z",
      "updatedAt": "2025-01-12T21:23:47.801Z",
      "likes": 492,
      "saves": 139
  },
  {
      "id": "f1f4dd57-a993-4013-80ed-5f1b2e3fa195",
      "type": "music",
      "title": "Mrs Brown You've Got a Lovely Daughter",
      "description": "Inflammatio venustas statim aperiam arceo cicuta basium.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/vix-cognatus",
      "albumArt": "https://picsum.photos/seed/c4af9c7d-59c9-4a29-a737-9a2f8adbb3d6/300/300",
      "duration": "8:19",
      "releaseDate": "2024-12-24T19:11:44.454Z",
      "genres": [
          "darkwave",
          "post-rock"
      ],
      "tags": [
          "darkwave",
          "post-rock",
          "diy",
          "indie"
      ],
      "createdAt": "2025-01-12T20:11:39.628Z",
      "updatedAt": "2025-01-03T04:10:00.666Z",
      "likes": 441,
      "saves": 157
  },
  {
      "id": "abffe37b-059b-45bf-95aa-dc2f10e3bc08",
      "type": "music",
      "title": "Twist & Shout",
      "description": "Coruscus vulariter adfero neque vomito urbanus vivo adopto.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/pax-adipisci",
      "albumArt": "https://picsum.photos/seed/ef912096-553e-4276-a655-ab7e6d67d004/300/300",
      "duration": "2:13",
      "releaseDate": "2025-01-05T09:42:38.984Z",
      "genres": [
          "post-rock",
          "synthwave",
          "electronic"
      ],
      "tags": [
          "post-rock",
          "synthwave",
          "electronic",
          "alternative",
          "diy"
      ],
      "createdAt": "2024-12-27T11:57:45.011Z",
      "updatedAt": "2025-01-04T14:38:17.333Z",
      "likes": 229,
      "saves": 74
  },
  {
      "id": "91baf00c-8e49-4899-81c7-ce9a7b8346fe",
      "type": "music",
      "title": "Whole Lotta Love",
      "description": "Uredo aegre delinquo autus sit at abundans ter clarus beneficium.",
      "category": "music",
      "artist": {
          "id": "d76704ee-de1c-49b0-8785-bc28e50a0dd3",
          "name": "Viola Experience",
          "avatar": "https://i.pravatar.cc/300?u=fc94cb23-bc52-4621-92b8-9258a2f52925"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/conturbo-adduco",
      "albumArt": "https://picsum.photos/seed/369bfb96-587d-4e6c-8e42-ad666ec13b88/300/300",
      "duration": "3:21",
      "releaseDate": "2025-01-04T06:11:06.460Z",
      "genres": [
          "indie-folk",
          "underground-hip-hop"
      ],
      "tags": [
          "indie-folk",
          "underground-hip-hop",
          "alternative",
          "diy"
      ],
      "createdAt": "2025-01-03T18:11:01.040Z",
      "updatedAt": "2025-01-11T16:02:36.050Z",
      "likes": 347,
      "saves": 82
  },
  {
      "id": "e4f9e6f5-14e1-44aa-8e57-ae32f225294d",
      "type": "music",
      "title": "Uncle Albert (Admiral Halsey)",
      "description": "Pax eligendi ipsam creo ipsum aggero defaeco.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/demonstro-summisse",
      "albumArt": "https://picsum.photos/seed/5d71554c-19a3-441e-949d-6e6357ab3160/300/300",
      "duration": "6:51",
      "releaseDate": "2024-12-22T00:37:26.927Z",
      "genres": [
          "synthwave",
          "noise-rock",
          "industrial"
      ],
      "tags": [
          "synthwave",
          "noise-rock",
          "industrial",
          "underground",
          "diy"
      ],
      "createdAt": "2024-12-30T15:10:01.030Z",
      "updatedAt": "2025-01-04T15:05:35.990Z",
      "likes": 390,
      "saves": 82
  },
  {
      "id": "c58b5c4e-3de1-4bcc-9deb-deec375dccf6",
      "type": "music",
      "title": "Wake Me Up Before You Go Go",
      "description": "Clementia conqueror tego et canonicus aliqua demo spiritus articulus.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/adfero-uxor",
      "albumArt": "https://picsum.photos/seed/90cc2daf-97e8-4bac-a95b-34a251f31a4a/300/300",
      "duration": "7:39",
      "releaseDate": "2024-10-29T01:23:43.360Z",
      "genres": [
          "synthwave",
          "bedroom-pop"
      ],
      "tags": [
          "synthwave",
          "bedroom-pop",
          "alternative",
          "indie"
      ],
      "createdAt": "2024-12-26T02:30:30.854Z",
      "updatedAt": "2025-01-11T16:37:07.626Z",
      "likes": 109,
      "saves": 101
  },
  {
      "id": "ad4cdf2f-346c-4299-ae9f-e0f7f1446765",
      "type": "music",
      "title": "Higher Love",
      "description": "Arca numquam velum solus voco.",
      "category": "music",
      "artist": {
          "id": "cc182c68-930d-4dd0-9c96-614fcb99f409",
          "name": "Cleveland ",
          "avatar": "https://i.pravatar.cc/300?u=4f517834-e128-4b3e-8702-b70cd1814791"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/voluptatum-caste",
      "albumArt": "https://picsum.photos/seed/7b0ebfa9-b5ed-4bb1-8ed8-b7b17170dd91/300/300",
      "duration": "8:29",
      "releaseDate": "2024-12-30T17:56:20.126Z",
      "genres": [
          "underground-hip-hop",
          "noise-rock",
          "bedroom-pop"
      ],
      "tags": [
          "underground-hip-hop",
          "noise-rock",
          "bedroom-pop",
          "underground",
          "alternative"
      ],
      "createdAt": "2024-12-27T03:53:55.326Z",
      "updatedAt": "2025-01-11T02:16:49.151Z",
      "likes": 373,
      "saves": 80,
      "curator": {
          "name": "Juana_Marvin75",
          "avatar": "https://i.pravatar.cc/150?u=cfb59185-c109-4502-b237-d0c878a7b727"
      }
  },
  {
      "id": "01ade7c4-904e-4d74-bfd4-8358abff140b",
      "type": "music",
      "title": "We Got The Beat",
      "description": "Via ut vel admiratio.",
      "category": "music",
      "artist": {
          "id": "3fba64fa-09a1-4428-9fdf-17e6d492dc52",
          "name": "Peyton Experience",
          "avatar": "https://i.pravatar.cc/300?u=b6585972-d441-4477-8f67-8e7eb44cd587"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/arma-suggero",
      "albumArt": "https://picsum.photos/seed/f6ff6bb9-60ef-4735-af87-019824f3be9a/300/300",
      "duration": "2:47",
      "releaseDate": "2024-12-15T09:02:22.965Z",
      "genres": [
          "indie-folk",
          "lo-fi"
      ],
      "tags": [
          "indie-folk",
          "lo-fi",
          "diy",
          "indie"
      ],
      "createdAt": "2024-12-28T10:28:05.141Z",
      "updatedAt": "2025-01-10T20:32:07.768Z",
      "likes": 237,
      "saves": 161
  },
  {
      "id": "b6dff4b2-7ca4-421b-8f09-668621830f0e",
      "type": "music",
      "title": "Up Up & Away",
      "description": "Id currus verbum versus cribro vicissitudo comprehendo aqua.",
      "category": "music",
      "artist": {
          "id": "7598a385-4a14-4e05-97ca-00d589ef99a6",
          "name": "Enos Experience",
          "avatar": "https://i.pravatar.cc/300?u=29067a80-48f1-41db-a485-2ea8d39493af"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/clarus-canto",
      "duration": "2:17",
      "releaseDate": "2024-12-14T20:15:48.171Z",
      "genres": [
          "ambient"
      ],
      "tags": [
          "ambient",
          "underground",
          "alternative"
      ],
      "createdAt": "2024-12-28T16:55:58.583Z",
      "updatedAt": "2025-01-13T13:39:30.306Z",
      "likes": 452,
      "saves": 198
  },
  {
      "id": "fefa1886-f8a5-4172-b668-8040592401a9",
      "type": "music",
      "title": "Woman",
      "description": "Numquam succurro desolo.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/cenaculum-necessitatibus",
      "albumArt": "https://picsum.photos/seed/55f3540c-9482-4735-b664-f0c8400e1206/300/300",
      "duration": "3:55",
      "releaseDate": "2024-12-12T19:14:33.911Z",
      "genres": [
          "synthwave",
          "indie-folk"
      ],
      "tags": [
          "synthwave",
          "indie-folk",
          "alternative"
      ],
      "createdAt": "2024-12-26T06:49:56.095Z",
      "updatedAt": "2025-01-05T08:35:30.065Z",
      "likes": 67,
      "saves": 64
  },
  {
      "id": "0f7c25a1-f0d3-4ffd-84d8-a48673384c08",
      "type": "music",
      "title": "Cars",
      "description": "Deleniti conforto odio nobis.",
      "category": "music",
      "artist": {
          "id": "7598a385-4a14-4e05-97ca-00d589ef99a6",
          "name": "Enos Experience",
          "avatar": "https://i.pravatar.cc/300?u=29067a80-48f1-41db-a485-2ea8d39493af"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/earum-subiungo",
      "albumArt": "https://picsum.photos/seed/094b360a-763f-45c6-9b27-a00e2122bcd5/300/300",
      "duration": "7:15",
      "releaseDate": "2024-12-04T07:58:36.732Z",
      "genres": [
          "darkwave"
      ],
      "tags": [
          "darkwave",
          "alternative"
      ],
      "createdAt": "2025-01-08T13:17:40.314Z",
      "updatedAt": "2025-01-13T18:36:28.400Z",
      "likes": 113,
      "saves": 20
  },
  {
      "id": "87ec20b7-3ccf-4438-bda9-51430867541d",
      "type": "music",
      "title": "The Tracks of My Tears",
      "description": "Animadverto sustineo attonbitus exercitationem.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/caveo-bellicus",
      "albumArt": "https://picsum.photos/seed/db3ad4a8-8f3c-4b86-a195-5ef37d1c0880/300/300",
      "duration": "6:29",
      "releaseDate": "2024-12-19T04:45:39.094Z",
      "genres": [
          "industrial",
          "darkwave",
          "noise-rock"
      ],
      "tags": [
          "industrial",
          "darkwave",
          "noise-rock",
          "alternative"
      ],
      "createdAt": "2025-01-01T11:07:28.123Z",
      "updatedAt": "2025-01-09T10:43:13.205Z",
      "likes": 313,
      "saves": 96
  },
  {
      "id": "12fb6e18-3a51-49b9-9265-a6adcc61e3b2",
      "type": "music",
      "title": "My Girl",
      "description": "Tolero occaecati alioqui aspernatur conturbo temporibus.",
      "category": "music",
      "artist": {
          "id": "cc182c68-930d-4dd0-9c96-614fcb99f409",
          "name": "Cleveland ",
          "avatar": "https://i.pravatar.cc/300?u=4f517834-e128-4b3e-8702-b70cd1814791"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/suspendo-tardus",
      "albumArt": "https://picsum.photos/seed/7deee7cb-3bb1-4fc6-b1e1-846652917fa3/300/300",
      "duration": "6:41",
      "releaseDate": "2024-12-04T00:50:14.550Z",
      "genres": [
          "indie-folk"
      ],
      "tags": [
          "indie-folk",
          "underground"
      ],
      "createdAt": "2025-01-02T16:45:51.867Z",
      "updatedAt": "2025-01-10T16:33:30.765Z",
      "likes": 4,
      "saves": 200,
      "curator": {
          "name": "Rosendo_Dooley",
          "avatar": "https://i.pravatar.cc/150?u=ea2b2f92-0441-421e-a725-c9cc46f9b519"
      }
  },
  {
      "id": "0a226723-7fff-42c9-a91e-ab7d51b2476d",
      "type": "music",
      "title": "In the Year 2525 (Exordium & Terminus)",
      "description": "Conduco minima vomica quibusdam comedo patior.",
      "category": "music",
      "artist": {
          "id": "c75170ab-10c0-4914-b22c-a78eadc8719f",
          "name": "Lucas Collective",
          "avatar": "https://i.pravatar.cc/300?u=0862adfb-5df8-44ad-a02b-d694cea8c02f"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/numquam-curtus",
      "albumArt": "https://picsum.photos/seed/e5958a02-6f15-4ba4-9f18-1af06f17d9a5/300/300",
      "duration": "2:25",
      "releaseDate": "2025-01-17T13:18:48.904Z",
      "genres": [
          "lo-fi"
      ],
      "tags": [
          "lo-fi",
          "underground",
          "alternative"
      ],
      "createdAt": "2024-12-27T07:35:37.827Z",
      "updatedAt": "2025-01-08T16:26:31.705Z",
      "likes": 282,
      "saves": 116
  },
  {
      "id": "143706c6-d033-4220-b13a-d0c3144895ff",
      "type": "music",
      "title": "Be Bop a Lula",
      "description": "Claustrum quas sopor aegrus quaerat explicabo saepe quia adsum amicitia.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/odit-velit",
      "albumArt": "https://picsum.photos/seed/90a3e2dd-e606-455b-b2cc-777d55bdd017/300/300",
      "duration": "2:53",
      "releaseDate": "2024-10-26T06:34:32.799Z",
      "genres": [
          "drone",
          "lo-fi",
          "electronic"
      ],
      "tags": [
          "drone",
          "lo-fi",
          "electronic",
          "alternative"
      ],
      "createdAt": "2025-01-15T08:04:20.235Z",
      "updatedAt": "2025-01-05T21:39:06.845Z",
      "likes": 426,
      "saves": 183
  },
  {
      "id": "4db57650-25c2-432f-8eb5-86c0362944d9",
      "type": "music",
      "title": "Suspicious Minds",
      "description": "Chirographum patria curiositas suppono minus decens cometes infit admitto.",
      "category": "music",
      "artist": {
          "id": "ed13a02a-370f-46c8-bb74-17944cac5229",
          "name": "Cary Project",
          "avatar": "https://i.pravatar.cc/300?u=6b29505b-228f-484f-accf-a471e76dc7bd"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/amicitia-triduana",
      "albumArt": "https://picsum.photos/seed/f51db9e1-81cb-4f99-b32d-99f2f53bc081/300/300",
      "duration": "8:46",
      "releaseDate": "2024-11-30T20:50:25.547Z",
      "genres": [
          "darkwave"
      ],
      "tags": [
          "darkwave",
          "alternative"
      ],
      "createdAt": "2025-01-10T17:07:47.940Z",
      "updatedAt": "2025-01-05T03:11:13.561Z",
      "likes": 248,
      "saves": 140,
      "curator": {
          "name": "Irma.Brown30",
          "avatar": "https://i.pravatar.cc/150?u=d21d367f-b3a2-4515-8b87-18bdcf091a73"
      }
  },
  {
      "id": "f0d7fe09-af5c-45f2-a61b-ead53e75b8e7",
      "type": "music",
      "title": "Lean On Me",
      "description": "Creber amoveo utor adopto capillus alias torrens vergo.",
      "category": "music",
      "artist": {
          "id": "ed13a02a-370f-46c8-bb74-17944cac5229",
          "name": "Cary Project",
          "avatar": "https://i.pravatar.cc/300?u=6b29505b-228f-484f-accf-a471e76dc7bd"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/suadeo-vilitas",
      "albumArt": "https://picsum.photos/seed/5fb403ce-76b1-459a-bf92-a9e7701a93f5/300/300",
      "duration": "8:21",
      "releaseDate": "2024-12-08T11:57:24.909Z",
      "genres": [
          "post-rock",
          "bedroom-pop",
          "experimental"
      ],
      "tags": [
          "post-rock",
          "bedroom-pop",
          "experimental",
          "diy",
          "underground"
      ],
      "createdAt": "2024-12-29T15:17:18.749Z",
      "updatedAt": "2025-01-09T19:18:35.003Z",
      "likes": 147,
      "saves": 187
  },
  {
      "id": "ad9ae42b-e7bf-4c38-9b7f-574d26ebc5ee",
      "type": "music",
      "title": "Rolling In The Deep",
      "description": "Curiositas recusandae sordeo utrum degenero tardus suspendo vulgo.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/una-quaerat",
      "albumArt": "https://picsum.photos/seed/ad2da7fa-3f13-46cf-b775-400cba6a879c/300/300",
      "duration": "8:44",
      "releaseDate": "2025-01-13T23:55:20.379Z",
      "genres": [
          "drone",
          "ambient"
      ],
      "tags": [
          "drone",
          "ambient",
          "alternative"
      ],
      "createdAt": "2025-01-15T04:48:30.798Z",
      "updatedAt": "2025-01-13T04:40:16.315Z",
      "likes": 18,
      "saves": 42
  },
  {
      "id": "82a1d90a-96ef-4181-a0d5-5f84d703e4a5",
      "type": "music",
      "title": "It's Now Or Never",
      "description": "Totus cenaculum sono.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/crapula-tutis",
      "albumArt": "https://picsum.photos/seed/7cab247a-0923-4469-8bb0-ccbd096d666c/300/300",
      "duration": "6:27",
      "releaseDate": "2024-10-23T16:48:36.100Z",
      "genres": [
          "electronic",
          "experimental",
          "ambient"
      ],
      "tags": [
          "electronic",
          "experimental",
          "ambient",
          "diy"
      ],
      "createdAt": "2025-01-07T03:04:02.255Z",
      "updatedAt": "2025-01-03T00:21:13.951Z",
      "likes": 250,
      "saves": 28,
      "curator": {
          "name": "Malachi7",
          "avatar": "https://i.pravatar.cc/150?u=4c295a32-f3a1-4967-b381-52e5261fa270"
      }
  },
  {
      "id": "71d0dcad-153b-4901-8305-5d1815852405",
      "type": "music",
      "title": "Take My Breath Away",
      "description": "Tergo totus voluptatum abbas tempus recusandae comis tubineus.",
      "category": "music",
      "artist": {
          "id": "7598a385-4a14-4e05-97ca-00d589ef99a6",
          "name": "Enos Experience",
          "avatar": "https://i.pravatar.cc/300?u=29067a80-48f1-41db-a485-2ea8d39493af"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/adsum-collum",
      "albumArt": "https://picsum.photos/seed/45259969-d464-4cb5-8a64-f8d004bbb68e/300/300",
      "duration": "2:15",
      "releaseDate": "2024-11-01T18:44:03.974Z",
      "genres": [
          "indie-folk",
          "post-rock",
          "electronic"
      ],
      "tags": [
          "indie-folk",
          "post-rock",
          "electronic",
          "indie"
      ],
      "createdAt": "2024-12-25T14:01:17.695Z",
      "updatedAt": "2025-01-11T14:32:50.529Z",
      "likes": 335,
      "saves": 137,
      "curator": {
          "name": "Frederic14",
          "avatar": "https://i.pravatar.cc/150?u=00f8357e-c365-4be9-ba30-4ea92bc2ec5c"
      }
  },
  {
      "id": "bce9d72c-f14c-4fe8-b566-aac563aa9dd4",
      "type": "music",
      "title": "Get Off of My Cloud",
      "description": "Aurum suscipio coniecto tondeo absconditus aspernatur molestias adaugeo.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/pecco-terror",
      "duration": "6:21",
      "releaseDate": "2025-01-07T12:17:36.373Z",
      "genres": [
          "synthwave"
      ],
      "tags": [
          "synthwave",
          "underground"
      ],
      "createdAt": "2024-12-24T14:01:54.031Z",
      "updatedAt": "2025-01-07T23:31:39.826Z",
      "likes": 317,
      "saves": 136
  },
  {
      "id": "4c870c84-58a6-4b86-a4ca-8c49c3928f7c",
      "type": "music",
      "title": "Dancing Queen",
      "description": "Absconditus aperiam ducimus.",
      "category": "music",
      "artist": {
          "id": "8d68d524-b726-448c-8453-61551f530c7a",
          "name": "Freda Project",
          "location": "North Freddy, Ireland",
          "avatar": "https://i.pravatar.cc/300?u=ef007e2e-909a-4cd7-8f86-d3fc2109ba4e"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/vorago-vestigium",
      "albumArt": "https://picsum.photos/seed/3bef1a4d-faad-4298-ab63-29ca84d9bca5/300/300",
      "duration": "6:10",
      "releaseDate": "2025-01-15T13:04:44.389Z",
      "genres": [
          "industrial"
      ],
      "tags": [
          "industrial",
          "indie",
          "diy"
      ],
      "createdAt": "2025-01-13T09:05:55.152Z",
      "updatedAt": "2025-01-08T04:49:20.083Z",
      "likes": 475,
      "saves": 33
  },
  {
      "id": "a068e94c-d033-47a1-9d38-7f0855e87b06",
      "type": "music",
      "title": "One of Us",
      "description": "Deripio urbs deserunt.",
      "category": "music",
      "artist": {
          "id": "1cc0219b-5f15-442d-bb5b-1f1624a37b29",
          "name": "Marie ",
          "location": "Reynoldsberg, Guinea-Bissau",
          "avatar": "https://i.pravatar.cc/300?u=075c031a-a623-4b26-aa17-d2694aafbb51"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/utrum-brevis",
      "albumArt": "https://picsum.photos/seed/10201993-618b-49d9-9582-9b353dd9991d/300/300",
      "duration": "5:58",
      "releaseDate": "2024-11-15T08:00:22.038Z",
      "genres": [
          "bedroom-pop"
      ],
      "tags": [
          "bedroom-pop",
          "diy",
          "indie"
      ],
      "createdAt": "2024-12-20T13:09:29.061Z",
      "updatedAt": "2025-01-02T22:33:38.555Z",
      "likes": 358,
      "saves": 198,
      "curator": {
          "name": "Demarcus.Beier",
          "avatar": "https://i.pravatar.cc/150?u=66f5604d-e002-4572-9293-0de4e9fb3f90"
      }
  },
  {
      "id": "79b8e67a-844e-45ac-a062-c729d1a12916",
      "type": "music",
      "title": "Let Me Call You Sweetheart",
      "description": "Speculum vulariter perspiciatis.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/carpo-charisma",
      "albumArt": "https://picsum.photos/seed/07a305fb-b7bc-40a7-8b3a-84259275dc29/300/300",
      "duration": "3:44",
      "releaseDate": "2025-01-07T11:05:35.121Z",
      "genres": [
          "bedroom-pop",
          "post-rock"
      ],
      "tags": [
          "bedroom-pop",
          "post-rock",
          "alternative",
          "indie"
      ],
      "createdAt": "2025-01-11T19:07:37.801Z",
      "updatedAt": "2025-01-15T17:56:22.794Z",
      "likes": 209,
      "saves": 132
  },
  {
      "id": "cda96742-8319-43cc-a272-e3866ab9d884",
      "type": "music",
      "title": "Time of the Season",
      "description": "Paulatim viriliter pariatur depopulo vulariter amitto audentia somniculosus absconditus.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/thesaurus-terga",
      "albumArt": "https://picsum.photos/seed/6900548c-f5a5-4511-a1fb-4b52a0227f15/300/300",
      "duration": "7:31",
      "releaseDate": "2025-01-11T18:35:08.907Z",
      "genres": [
          "lo-fi"
      ],
      "tags": [
          "lo-fi",
          "diy"
      ],
      "createdAt": "2024-12-20T05:26:52.084Z",
      "updatedAt": "2025-01-14T10:17:48.079Z",
      "likes": 488,
      "saves": 150
  },
  {
      "id": "0869d6ac-58d9-4d9c-8c3c-3c2f3d4f2816",
      "type": "music",
      "title": "Dreamlover",
      "description": "Voluptatum arbustum creber cruentus.",
      "category": "music",
      "artist": {
          "id": "acc82b5f-403b-4049-b715-e52c9675522e",
          "name": "Rhea ",
          "avatar": "https://i.pravatar.cc/300?u=bbfd4ddd-46d3-4897-a170-b89ae14f6b11"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/arx-adhaero",
      "albumArt": "https://picsum.photos/seed/b7504629-71df-4ce2-887e-d99d87866b26/300/300",
      "duration": "7:13",
      "releaseDate": "2024-12-25T05:33:44.364Z",
      "genres": [
          "indie-folk"
      ],
      "tags": [
          "indie-folk",
          "underground",
          "alternative"
      ],
      "createdAt": "2025-01-02T03:00:48.563Z",
      "updatedAt": "2025-01-15T12:51:23.077Z",
      "likes": 197,
      "saves": 181
  },
  {
      "id": "77e0db34-3d7e-4046-93e8-7370d9136fec",
      "type": "music",
      "title": "There goes my baby",
      "description": "Victus advoco sto aggredior nisi constans aggredior.",
      "category": "music",
      "artist": {
          "id": "b0ccc1f5-c8f2-417e-8a1b-316810f2b237",
          "name": "Adelia Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/vinculum-universe",
      "albumArt": "https://picsum.photos/seed/38b66c1c-f629-4720-815b-26588a2b83ae/300/300",
      "duration": "8:13",
      "releaseDate": "2024-11-06T00:23:42.871Z",
      "genres": [
          "synthwave",
          "punk",
          "post-rock"
      ],
      "tags": [
          "synthwave",
          "punk",
          "post-rock",
          "indie",
          "underground"
      ],
      "createdAt": "2025-01-02T15:09:03.196Z",
      "updatedAt": "2025-01-04T06:25:32.736Z",
      "likes": 343,
      "saves": 154
  },
  {
      "id": "d070b39b-4d21-4492-ba20-fec017fdc813",
      "type": "music",
      "title": "Honky Tonk Woman",
      "description": "Harum cogito vilicus titulus cura victoria charisma decipio.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/consequuntur-centum",
      "albumArt": "https://picsum.photos/seed/a60862d8-741d-430b-9ae6-adf98ea2a1d6/300/300",
      "duration": "2:35",
      "releaseDate": "2025-01-11T13:33:25.895Z",
      "genres": [
          "indie-folk"
      ],
      "tags": [
          "indie-folk",
          "alternative",
          "indie"
      ],
      "createdAt": "2025-01-03T14:49:21.672Z",
      "updatedAt": "2025-01-04T23:34:24.591Z",
      "likes": 147,
      "saves": 147,
      "curator": {
          "name": "Dorcas.Lakin",
          "avatar": "https://i.pravatar.cc/150?u=d635b67a-c758-4364-a0e7-bb2aca610135"
      }
  },
  {
      "id": "787ff170-8a42-4066-bb5c-12c45055888f",
      "type": "music",
      "title": "Stagger Lee",
      "description": "Vel uterque rerum sustineo vesper validus crepusculum ulciscor cinis.",
      "category": "music",
      "artist": {
          "id": "104ebab4-865c-4b13-a34a-e84c8b7fcc12",
          "name": "Torey "
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/autem-curto",
      "albumArt": "https://picsum.photos/seed/9f291ba4-1937-4b6e-b72f-306377f6d9d8/300/300",
      "duration": "4:11",
      "releaseDate": "2024-10-22T23:31:26.670Z",
      "genres": [
          "darkwave",
          "experimental",
          "industrial"
      ],
      "tags": [
          "darkwave",
          "experimental",
          "industrial",
          "underground"
      ],
      "createdAt": "2024-12-25T18:48:08.822Z",
      "updatedAt": "2025-01-14T13:08:03.913Z",
      "likes": 196,
      "saves": 89,
      "curator": {
          "name": "Leatha.Grady80",
          "avatar": "https://i.pravatar.cc/150?u=07788bd6-9d77-448d-b3fd-5120057e64d5"
      }
  },
  {
      "id": "894a2569-83fc-4ca3-b5c5-8cb4b6c2be14",
      "type": "music",
      "title": "I Can Help",
      "description": "Sulum aptus demitto atque cernuus teres aliquid crapula somniculosus.",
      "category": "music",
      "artist": {
          "id": "43d2f933-d494-448b-84cf-006e28a6318a",
          "name": "Davin Experience"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/denique-spiritus",
      "albumArt": "https://picsum.photos/seed/8a467977-1340-45e7-94a9-a6b026fdb527/300/300",
      "duration": "8:49",
      "releaseDate": "2024-11-01T15:22:40.236Z",
      "genres": [
          "darkwave"
      ],
      "tags": [
          "darkwave",
          "underground",
          "indie"
      ],
      "createdAt": "2024-12-19T02:30:09.078Z",
      "updatedAt": "2025-01-03T11:34:26.802Z",
      "likes": 359,
      "saves": 165,
      "curator": {
          "name": "Alejandrin_OHara",
          "avatar": "https://i.pravatar.cc/150?u=3c2f9785-21c8-4e02-87ac-32c57d966a4b"
      }
  },
  {
      "id": "85d33a13-feec-4a01-9588-fc41e8aa3d8f",
      "type": "music",
      "title": "Honky Tonk",
      "description": "Canonicus cervus surgo tam totidem aestus laborum.",
      "category": "music",
      "artist": {
          "id": "3fba64fa-09a1-4428-9fdf-17e6d492dc52",
          "name": "Peyton Experience",
          "avatar": "https://i.pravatar.cc/300?u=b6585972-d441-4477-8f67-8e7eb44cd587"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/utor-autem",
      "albumArt": "https://picsum.photos/seed/e8e90e64-d37d-415d-a3d3-9f34d809a94f/300/300",
      "duration": "6:51",
      "releaseDate": "2024-10-31T18:33:48.521Z",
      "genres": [
          "industrial",
          "indie-folk",
          "bedroom-pop"
      ],
      "tags": [
          "industrial",
          "indie-folk",
          "bedroom-pop",
          "underground",
          "diy"
      ],
      "createdAt": "2024-12-21T23:32:36.966Z",
      "updatedAt": "2025-01-04T06:51:46.961Z",
      "likes": 267,
      "saves": 151
  },
  {
      "id": "c1939381-5901-4f29-8f5f-aff88479a61e",
      "type": "music",
      "title": "Sexyback",
      "description": "Tabesco cupiditas non pel tribuo decor terebro volutabrum utpote.",
      "category": "music",
      "artist": {
          "id": "532e6c15-95d6-46e0-94b3-2b6046a031ff",
          "name": "Isobel Collective",
          "location": "Boehmhaven, Haiti"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/eius-vinum",
      "albumArt": "https://picsum.photos/seed/b77e43a5-dda0-474d-8dd7-40200f46ef4e/300/300",
      "duration": "7:43",
      "releaseDate": "2024-12-30T09:58:56.148Z",
      "genres": [
          "punk"
      ],
      "tags": [
          "punk",
          "indie"
      ],
      "createdAt": "2024-12-23T07:08:44.821Z",
      "updatedAt": "2025-01-16T21:30:31.756Z",
      "likes": 1,
      "saves": 125
  },
  {
      "id": "581b6ca2-8b64-45e2-926c-827786106d0a",
      "type": "music",
      "title": "I Swear",
      "description": "Vester substantia surgo virgo.",
      "category": "music",
      "artist": {
          "id": "c75170ab-10c0-4914-b22c-a78eadc8719f",
          "name": "Lucas Collective",
          "avatar": "https://i.pravatar.cc/300?u=0862adfb-5df8-44ad-a02b-d694cea8c02f"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/amplexus-ars",
      "albumArt": "https://picsum.photos/seed/a7f4950e-1b0e-4475-a31d-73bfb172cd82/300/300",
      "duration": "6:49",
      "releaseDate": "2024-11-18T19:38:26.911Z",
      "genres": [
          "ambient",
          "lo-fi"
      ],
      "tags": [
          "ambient",
          "lo-fi",
          "diy",
          "underground"
      ],
      "createdAt": "2025-01-06T00:32:32.242Z",
      "updatedAt": "2025-01-17T05:37:37.682Z",
      "likes": 453,
      "saves": 177
  },
  {
      "id": "1443d56f-b9e4-4d63-97b3-baaf897ecd9f",
      "type": "music",
      "title": "I Can See Clearly Now",
      "description": "Civitas adstringo consuasor cumque capillus cedo curo totidem ceno arguo.",
      "category": "music",
      "artist": {
          "id": "104ebab4-865c-4b13-a34a-e84c8b7fcc12",
          "name": "Torey "
      },
      "source": "soundcloud",
      "sourceUrl": "https://soundcloud.com/soleo-ademptio",
      "albumArt": "https://picsum.photos/seed/0fe53715-646f-45f3-9c13-4dcd32a977cc/300/300",
      "duration": "3:55",
      "releaseDate": "2024-11-15T11:15:53.623Z",
      "genres": [
          "experimental"
      ],
      "tags": [
          "experimental",
          "alternative"
      ],
      "createdAt": "2024-12-26T23:58:42.055Z",
      "updatedAt": "2025-01-11T04:05:06.372Z",
      "likes": 484,
      "saves": 76,
      "curator": {
          "name": "Roxanne.Torp58",
          "avatar": "https://i.pravatar.cc/150?u=5d90bfc3-4a10-440d-827f-c70f45066491"
      }
  },
  {
      "id": "d08d9d25-b853-45a1-b9e8-dd5823ceb556",
      "type": "music",
      "title": "Superstition",
      "description": "Sequi auditor tabula cruentus subnecto adversus.",
      "category": "music",
      "artist": {
          "id": "7598a385-4a14-4e05-97ca-00d589ef99a6",
          "name": "Enos Experience",
          "avatar": "https://i.pravatar.cc/300?u=29067a80-48f1-41db-a485-2ea8d39493af"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/adipiscor-cursus",
      "albumArt": "https://picsum.photos/seed/3a78f2aa-d20b-4b16-9dca-83372a82bdbe/300/300",
      "duration": "2:44",
      "releaseDate": "2024-11-24T05:04:05.499Z",
      "genres": [
          "ambient"
      ],
      "tags": [
          "ambient",
          "diy",
          "alternative"
      ],
      "createdAt": "2025-01-15T02:34:22.170Z",
      "updatedAt": "2025-01-09T08:22:16.941Z",
      "likes": 450,
      "saves": 184
  },
  {
      "id": "d6c515cb-6143-478b-9569-85a254a23da1",
      "type": "music",
      "title": "Good Vibrations",
      "description": "Succedo uberrime surgo somniculosus valeo.",
      "category": "music",
      "artist": {
          "id": "0f7fde9d-f32e-4106-8605-f2fd576cf061",
          "name": "Sylvester ",
          "avatar": "https://i.pravatar.cc/300?u=528c8713-e219-4a9a-9678-351858b5ac6a"
      },
      "source": "bandcamp",
      "sourceUrl": "https://bandcamp.com/odit-adnuo",
      "albumArt": "https://picsum.photos/seed/f04a85be-090e-490b-a249-db75aef4a835/300/300",
      "duration": "4:23",
      "releaseDate": "2024-10-30T23:22:50.123Z",
      "genres": [
          "electronic"
      ],
      "tags": [
          "electronic",
          "indie",
          "alternative"
      ],
      "createdAt": "2024-12-20T07:35:08.323Z",
      "updatedAt": "2025-01-10T22:17:27.219Z",
      "likes": 245,
      "saves": 177
  },
  {
      "id": "12045e65-039e-4ec8-ab94-e0a47eaaf9f8",
      "type": "music",
      "title": "All Night Long (All Night)",
      "description": "Balbus adnuo voluntarius temperantia admiratio comburo decumbo tabgo laudantium cito.",
      "category": "music",
      "artist": {
          "id": "8bdea961-f110-421f-8acb-a6812bdb614b",
          "name": "Lester Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/peccatus-color",
      "duration": "7:26",
      "releaseDate": "2024-12-22T18:36:01.314Z",
      "genres": [
          "electronic"
      ],
      "tags": [
          "electronic",
          "underground"
      ],
      "createdAt": "2025-01-07T21:32:47.120Z",
      "updatedAt": "2025-01-07T17:52:54.379Z",
      "likes": 237,
      "saves": 8
  },
  {
      "id": "ab43f475-8c40-470d-aae6-c222be551ed5",
      "type": "music",
      "title": "Soldier Boy",
      "description": "Aiunt vesco dolorum.",
      "category": "music",
      "artist": {
          "id": "126a78cf-e164-43b1-9105-7ac814b9d92a",
          "name": "Nora ",
          "location": "South Vena, Colombia",
          "avatar": "https://i.pravatar.cc/300?u=e2b87809-1bfe-41a4-a1ff-9bb1d15587cd"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/vulgivagus-cervus",
      "albumArt": "https://picsum.photos/seed/f1f4a2a3-01cf-4e50-a038-c21e95f68006/300/300",
      "duration": "6:22",
      "releaseDate": "2025-01-03T09:28:32.994Z",
      "genres": [
          "lo-fi",
          "drone",
          "ambient"
      ],
      "tags": [
          "lo-fi",
          "drone",
          "ambient",
          "indie"
      ],
      "createdAt": "2024-12-24T10:20:03.564Z",
      "updatedAt": "2025-01-05T10:28:44.083Z",
      "likes": 179,
      "saves": 160
  },
  {
      "id": "f284d3b2-ec5b-4873-a6dc-bd24838f87b7",
      "type": "music",
      "title": "96 Tears",
      "description": "Eveniet talus contra alii ascisco.",
      "category": "music",
      "artist": {
          "id": "8bdea961-f110-421f-8acb-a6812bdb614b",
          "name": "Lester Collective"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/supellex-summisse",
      "albumArt": "https://picsum.photos/seed/95a9ac9f-4d9f-4b12-b722-9615a59a51ca/300/300",
      "duration": "7:25",
      "releaseDate": "2024-12-03T18:35:00.599Z",
      "genres": [
          "electronic"
      ],
      "tags": [
          "electronic",
          "alternative",
          "underground"
      ],
      "createdAt": "2024-12-22T19:02:53.912Z",
      "updatedAt": "2025-01-05T20:07:05.706Z",
      "likes": 354,
      "saves": 192
  },
  {
      "id": "9746125c-a25b-4ca1-a2b7-27751cc249fa",
      "type": "music",
      "title": "Nature Boy",
      "description": "Infit nam similique.",
      "category": "music",
      "artist": {
          "id": "20e56051-4b7f-440a-8f67-71daab972f26",
          "name": "Lori Experience",
          "location": "Cristobalview, Libyan Arab Jamahiriya",
          "avatar": "https://i.pravatar.cc/300?u=b0e53a3d-a832-4ade-81d3-27e3600f467a"
      },
      "source": "spotify",
      "sourceUrl": "https://spotify.com/soluta-ullus",
      "albumArt": "https://picsum.photos/seed/99f2f51d-14f7-46bc-9933-b5e312b83f93/300/300",
      "duration": "6:24",
      "releaseDate": "2024-12-27T02:00:10.930Z",
      "genres": [
          "experimental",
          "noise-rock",
          "industrial"
      ],
      "tags": [
          "experimental",
          "noise-rock",
          "industrial",
          "underground",
          "indie"
      ],
      "createdAt": "2024-12-21T03:05:24.692Z",
      "updatedAt": "2025-01-04T15:45:15.013Z",
      "likes": 95,
      "saves": 120
  },
  {
      "id": "b615d96a-b152-4c9b-b11d-7d9c8f351cd2",
      "type": "music",
      "title": "I Get Around",
      "description": "Vomica audentia compello vos audacia cavus abundans est.",
      "category": "music",
      "artist": {
          "id": "d315f01a-983e-440b-9562-cddc15105bad",
          "name": "Jennings Collective",
          "location": "Topeka, Andorra",
          "avatar": "https://i.pravatar.cc/300?u=c1fd8dcc-2b19-480d-8311-2be7ee39b3a7"
      },
      "source": "youtube",
      "sourceUrl": "https://youtube.com/cenaculum-deripio",
      "albumArt": "https://picsum.photos/seed/3fc7e99b-6c42-41f4-8045-935d132c5a63/300/300",
      "duration": "2:53",
      "releaseDate": "2024-11-21T19:47:38.451Z",
      "genres": [
          "drone"
      ],
      "tags": [
          "drone",
          "diy"
      ],
      "createdAt": "2025-01-13T09:15:54.164Z",
      "updatedAt": "2025-01-12T21:52:01.580Z",
      "likes": 461,
      "saves": 2,
      "curator": {
          "name": "Laney.Parisian43",
          "avatar": "https://i.pravatar.cc/150?u=9cf855aa-3d13-4a24-838d-404e7476fd87"
      }
  }
]



// You can also export the generator function if you need it elsewhere
export { generateMusicGem };

