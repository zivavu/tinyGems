'use client';

import { FiltersInputBar } from '@/features/gems/components/FiltersInputBar/FiltersInputBar';
import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { useFilteredGems } from '@/features/gems/hooks/useFilteredGems';
import { Icons } from '@/features/shared/components/Icons';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { Button } from '@headlessui/react';
import { Suspense } from 'react';

export default function SeekPage() {
  const filteredGems = useFilteredGems(dummyGems);

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

      <main className="container flex px-4 mx-auto" role="main" aria-label="Search gems">
        <section aria-label="Gems grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {filteredGems.map((gem) => (
              <GemCard key={gem.id} gem={gem} />
            ))}
          </div>
        </section>
      </main>

      <div className="flex items-center justify-center flex-row gap-6">
        <Button
          as="button"
          className="flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-rose-500 rounded-full shadow-xl hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          aria-label="Add your gem"
        >
          <Icons.Plus className="w-6 h-6" />
          <span>Add your gem</span>
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
    </div>
  );
}
