'use client';

import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { musicGenres } from './constants';

export function GenreSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const selectedGenres = (() => {
    const genreParam = searchParams.get('genres');
    if (!genreParam) return [];
    const genreIds = genreParam.split(',');
    return musicGenres.filter((genre) => genreIds.includes(genre.id));
  })();

  const filteredGenres = musicGenres.filter(
    (genre) =>
      genre.label.toLowerCase().includes(query.toLowerCase()) || genre.description.toLowerCase().includes(query.toLowerCase()) || !query,
  );

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

  // Group genres by category
  const genresByCategory = filteredGenres.reduce(
    (acc, genre) => {
      const category = genre.id.includes('electronic')
        ? 'Electronic'
        : genre.id.includes('rock') || genre.id.includes('metal')
          ? 'Rock & Metal'
          : genre.id.includes('hip-hop') || genre.id.includes('rap')
            ? 'Hip-Hop & Rap'
            : genre.id.includes('folk')
              ? 'Folk & Acoustic'
              : genre.id.includes('jazz') || genre.id.includes('classical')
                ? 'Jazz & Classical'
                : genre.id.includes('pop') || genre.id.includes('r&b')
                  ? 'Pop & R&B'
                  : 'Other';

      if (!acc[category]) acc[category] = [];
      acc[category].push(genre);
      return acc;
    },
    {} as Record<string, typeof musicGenres>,
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
              'border dark:border-gray-800',
              open || selectedGenres.length > 0
                ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700',
            )}
          >
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
            <Icons.ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
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
                {Object.entries(genresByCategory).map(([category, genres]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400">{category}</div>
                    <div className="space-y-0.5">
                      {genres.map((genre) => (
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
                          <span className="text-xs text-gray-500 dark:text-gray-400">{genre.description}</span>
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
