'use client';

import { Album } from '@/features/albums/types';
import { Artist } from '@/features/artists/types';
import { MusicGem } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { dummyAlbums } from '@/features/shared/utils/dummy/albums';
import { dummyArtists } from '@/features/shared/utils/dummy/artists';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';

type SearchResult = {
  type: 'artist' | 'album' | 'gem';
  item: Artist | Album | MusicGem;
  href: string;
};

export function SearchBar() {
  const [query, setQuery] = useState('');
  const results = query === '' ? [] : searchAll(query);

  return (
    <div className="w-full">
      <Combobox>
        <div className="relative">
          <div className="relative w-full">
            <ComboboxInput
              className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 dark:bg-gray-800/50 dark:border-gray-700 dark:focus:border-rose-500 dark:focus:ring-rose-900/30"
              placeholder="Search artists, albums, songs..."
              onChange={(event) => setQuery(event.target.value)}
              displayValue={() => ''}
            />
            <Icons.Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <ComboboxOptions className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-white/10">
              {results.length === 0 && query !== '' ? (
                <div className="px-4 py-2">
                  <Typography variant="small" className="text-gray-500">
                    No results found
                  </Typography>
                </div>
              ) : (
                results.map((result) => (
                  <ComboboxOption key={`${result.type}-${result.item.id}`} value={result} className={`relative select-none`}>
                    {({ selected }) => (
                      <NextLink href={result.href}>
                        <div className={`flex items-center gap-3 px-4 py-2 ${selected ? 'bg-rose-50 dark:bg-rose-900/30' : ''}`}>
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            {getItemImage(result)}
                          </div>

                          <div>
                            <Typography
                              variant="small"
                              className={`font-medium ${selected ? 'text-rose-800 dark:text-rose-200' : 'text-gray-900 dark:text-gray-100'}`}
                            >
                              {getItemTitle(result)}
                            </Typography>
                            <Typography variant="small" className="text-gray-500">
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </Typography>
                          </div>
                        </div>
                      </NextLink>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

function searchAll(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase();

  const artistResults: SearchResult[] = dummyArtists
    .filter((artist) => artist.name.toLowerCase().includes(normalizedQuery))
    .map((artist) => ({
      type: 'artist',
      item: artist,
      href: `/artist/${artist.id}`,
    }));

  const albumResults: SearchResult[] = dummyAlbums
    .filter((album) => album.title.toLowerCase().includes(normalizedQuery))
    .map((album) => ({
      type: 'album',
      item: album,
      href: `/gem/album/${album.id}`,
    }));

  const gemResults: SearchResult[] = dummyGems
    .filter((gem) => gem.title.toLowerCase().includes(normalizedQuery))
    .map((gem) => ({
      type: 'gem',
      item: gem,
      href: `/gem/song/${gem.id}`,
    }));

  return [...artistResults, ...albumResults, ...gemResults].slice(0, 8);
}

function getItemTitle(result: SearchResult): string {
  switch (result.type) {
    case 'artist':
      return (result.item as Artist).name;
    case 'album':
      return (result.item as Album).title;
    case 'gem':
      return (result.item as MusicGem).title;
  }
}

function getItemImage(result: SearchResult) {
  let imageSrc = '';

  switch (result.type) {
    case 'artist':
      imageSrc = (result.item as Artist).avatar || '';
      break;
    case 'album':
      imageSrc = (result.item as Album).properties.media.coverImage || '';
      break;
    case 'gem':
      imageSrc = (result.item as MusicGem).properties.media.coverImage || '';
      break;
  }

  if (!imageSrc) {
    return <Icons.Music className="h-5 w-5 m-auto text-gray-400" />;
  }

  return <Image src={imageSrc} alt="" fill className="object-cover" />;
}
