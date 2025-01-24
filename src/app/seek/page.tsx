import { FiltersInputBar } from '@/features/gems/components/FiltersInputBar';
import { GemGrid } from '@/features/gems/components/GemGrid';
import { Icons } from '@/features/shared/components/Icons';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { Button } from '@headlessui/react';
import { Suspense } from 'react';

export default async function SeekPage() {
  const sortedGems = [...dummyGems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex flex-col pb-16 space-y-16">
      <Suspense
        fallback={
          <div className="w-full h-12 bg-gray-200 animate-pulse rounded-full dark:bg-gray-700">
            <span className="sr-only">Loading filters...</span>
          </div>
        }
      >
        <FiltersInputBar />
      </Suspense>

      <main className="container flex px-4 mx-auto" role="main" aria-label="Search gems">
        <section aria-label="Gems grid">
          <GemGrid gems={sortedGems} />
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
