'use client';

import { AlbumCard } from '@/features/albums/components/AlbumCard/AlbumCard';
import { Album } from '@/features/albums/types';
import { ArtistCard } from '@/features/artists/components/ArtistCard/ArtistCard';
import { Artist } from '@/features/artists/types';
import { FiltersInputBar } from '@/features/gems/components/FiltersInputBar/FiltersInputBar';
import { useParamFilters } from '@/features/gems/components/FiltersInputBar/hooks';
import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { MusicGem } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { useFilteredContent } from '@/features/shared/hooks/useFilteredContent';
import { dummyAlbums } from '@/features/shared/utils/dummy/albums';
import { dummyArtists } from '@/features/shared/utils/dummy/artists';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { Button } from '@headlessui/react';
import { Suspense } from 'react';

function SeekContent() {
  const { getContentType } = useParamFilters();
  const contentType = getContentType();

  const contentMap = {
    singles: dummyGems,
    albums: dummyAlbums,
    artists: dummyArtists,
  } as const;

  const filteredContent = useFilteredContent(contentMap[contentType], contentType);

  return (
    <>
      <main className="container mx-auto px-4" role="main" aria-label={`Search ${contentType}`}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4" aria-label={`${contentType} grid`}>
          {filteredContent.slice(0, 20).map((item, index) => {
            switch (contentType) {
              case 'singles':
                return <GemCard key={item.id} gem={item as MusicGem} index={index} />;
              case 'albums':
                return <AlbumCard key={item.id} album={item as Album} index={index} />;
              case 'artists':
                return <ArtistCard key={item.id} artist={item as Artist} index={index} />;
            }
          })}
        </section>
      </main>

      <div className="flex items-center justify-center flex-row gap-6">
        <Button
          as="button"
          className="flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-rose-500 rounded-full shadow-xl hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          aria-label={`Add ${contentType.slice(0, -1)}`}
        >
          <Icons.Plus className="w-6 h-6" />
          <span>Add {contentType.slice(0, -1)}</span>
        </Button>

        <Button
          as="button"
          className="flex items-center gap-3 px-8 py-4 text-lg font-medium text-gray-700 bg-white rounded-full shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label="Edit filters"
        >
          <Icons.Filter className="w-6 h-6" />
          <span>Edit filters</span>
        </Button>
      </div>
    </>
  );
}

export default function SeekPage() {
  return (
    <div className="flex flex-col pb-16 space-y-16">
      <Suspense
        fallback={
          <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Icons.Loader className="w-5 h-5 animate-spin" />
              <span className="text-gray-600 dark:text-gray-300">Loading filters...</span>
            </div>
          </div>
        }
      >
        <FiltersInputBar />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <SeekContent />
      </Suspense>
    </div>
  );
}
