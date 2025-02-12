'use client';

import { Album } from '@/features/albums/types';
import { Artist } from '@/features/artists/types';
import { MusicGem } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { PopoverTransition } from '@/features/shared/components/transitions/PopoverTransition';
import { Typography } from '@/features/shared/components/Typography';
import { dummyAlbums } from '@/features/shared/utils/dummy/albums';
import { dummyArtists } from '@/features/shared/utils/dummy/artists';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { cn } from '@/features/shared/utils/utils';
import { Input, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';

type SearchResult = {
  type: 'artist' | 'album' | 'gem';
  item: Artist | Album | MusicGem;
  href: string;
};

export function SearchPopperButton() {
  const [query, setQuery] = useState('');
  const results = searchAll(query);

  const groupedResults = {
    artists: results.filter((r) => r.type === 'artist'),
    albums: results.filter((r) => r.type === 'album'),
    gems: results.filter((r) => r.type === 'gem'),
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50/50 hover:bg-amber-100/80 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-all">
            <Icons.Search className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <Typography className="font-medium text-amber-900 dark:text-amber-100 hidden sm:block">Search</Typography>
          </PopoverButton>

          <PopoverTransition>
            <PopoverPanel className="absolute left-1/2 mt-2 w-screen max-w-md -translate-x-1/2 transform" onBlur={() => close()}>
              <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-lg pb-2">
                <div className="p-2">
                  <Input
                    type="text"
                    className={cn(
                      'w-full h-10 px-4 pl-10 rounded-lg',
                      'bg-amber-50/50 dark:bg-amber-900/20',
                      'focus:outline-none focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900',
                      'placeholder:text-amber-600/50 dark:placeholder:text-amber-400/50',
                    )}
                    placeholder="Search artists, albums, songs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <Icons.Search className="absolute left-5 top-5 h-5 w-5 text-amber-600/50 dark:text-amber-400/50" />
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {query === '' ? (
                    <div className="px-4 py-3">
                      <Typography variant="small" className="text-gray-500">
                        Start typing to search...
                      </Typography>
                    </div>
                  ) : Object.entries(groupedResults).every(([, items]) => items.length === 0) ? (
                    <div className="px-4 py-3">
                      <Typography variant="small" className="text-gray-500">
                        No results found
                      </Typography>
                    </div>
                  ) : (
                    Object.entries(groupedResults).map(
                      ([type, items]) =>
                        items.length > 0 && (
                          <div key={type} className="px-2">
                            <div className="px-2 py-1.5">
                              <Typography variant="small" className="text-amber-600 dark:text-amber-400 font-medium">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Typography>
                            </div>
                            {items.map((result) => (
                              <NextLink key={result.href} href={result.href} className="block">
                                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-900/30 transition-colors">
                                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-amber-50/50 dark:bg-amber-900/20">
                                    {getItemImage(result)}
                                  </div>
                                  <div>
                                    <Typography variant="small" className="font-medium text-gray-900 dark:text-gray-100">
                                      {getItemTitle(result)}
                                    </Typography>
                                    <Typography variant="small" className="text-gray-500">
                                      {getItemSubtitle(result)}
                                    </Typography>
                                  </div>
                                </div>
                              </NextLink>
                            ))}
                          </div>
                        ),
                    )
                  )}
                </div>
              </div>
            </PopoverPanel>
          </PopoverTransition>
        </>
      )}
    </Popover>
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

function getItemSubtitle(result: SearchResult): string {
  switch (result.type) {
    case 'artist':
      return `${(result.item as Artist).audienceSize?.toLocaleString()} followers`;
    case 'album':
      return (result.item as Album).artist.name;
    case 'gem':
      return (result.item as MusicGem).artist.name;
  }
}
