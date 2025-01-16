'use client';

import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FilterButton } from '../ui/Buttons/FilterButton';
import { getAllGenres, musicGenres } from './constants';
export function GenreSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const allGenres = getAllGenres();

  const selectedGenres = (() => {
    const genreParam = searchParams.get('genres');
    if (!genreParam) return [];
    const genreIds = genreParam.split(',');
    return allGenres.filter((genre) => genreIds.includes(genre.id));
  })();

  const filteredCategories = musicGenres
    .map((category) => ({
      ...category,
      genres: category.genres.filter(
        (genre) =>
          genre.label.toLowerCase().includes(query.toLowerCase()) ||
          genre.description.toLowerCase().includes(query.toLowerCase()) ||
          !query,
      ),
    }))
    .filter((category) => category.genres.length > 0);

  const toggleGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentGenres = params.get('genres')?.split(',').filter(Boolean) || [];

    const newGenres = currentGenres.includes(genreId) ? currentGenres.filter((id) => id !== genreId) : [...currentGenres, genreId];

    if (newGenres.length) {
      params.set('genres', newGenres.join(','));
    } else {
      params.delete('genres');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton as={FilterButton}>
            <div className="flex gap-2 items-center">
              {selectedGenres.length > 0 ? (
                <>
                  <Icons.Music className="w-4 h-4" />
                  <span>
                    {selectedGenres.length}
                    {selectedGenres.length === 1 ? ' Genre' : ' Genres'}
                  </span>
                </>
              ) : (
                'Genres'
              )}
            </div>
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-2 w-80 bg-white rounded-lg border shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3">
              <div className="space-y-2">
                <div className="relative">
                  <Icons.Search className="absolute left-2 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search genres..."
                    className="py-2 pr-3 pl-8 w-full text-sm bg-gray-50 rounded-lg border-0 dark:bg-gray-700 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {selectedGenres.length > 0 && (
                  <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                    {selectedGenres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => toggleGenre(genre.id)}
                        className="flex gap-1 items-center px-2 py-1 text-xs bg-white rounded-full border shadow-sm dark:bg-gray-800 dark:border-gray-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      >
                        <span>{genre.label}</span>
                        <Icons.X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="overflow-auto mt-2 max-h-[400px] space-y-2">
                {filteredCategories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="sticky top-0 px-2 py-1 text-xs font-semibold text-gray-500 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 dark:text-gray-400">
                      {category.name}
                    </div>
                    <div className="space-y-0.5">
                      {category.genres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => toggleGenre(genre.id)}
                          className={cn(
                            'flex flex-col w-full gap-0.5 px-2 py-1.5 text-sm transition-colors rounded-lg',
                            selectedGenres.some((g) => g.id === genre.id)
                              ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                          )}
                        >
                          <span className="flex justify-between items-center">
                            <span>{genre.label}</span>
                          </span>
                          <span
                            className={cn(
                              'text-xs',
                              selectedGenres.some((g) => g.id === genre.id)
                                ? 'text-rose-400/70 dark:text-rose-400/50'
                                : 'text-gray-500 dark:text-gray-400',
                            )}
                          >
                            {genre.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
