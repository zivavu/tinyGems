'use client';

import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { languages } from './constants';

export function LanguageSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const selectedLanguages = (() => {
    const langParam = searchParams.get('languages');
    if (!langParam) return [];
    const langCodes = langParam.split(',');
    return languages.filter((lang) => langCodes.includes(lang.code));
  })();

  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(query.toLowerCase()) || language.code.toLowerCase().includes(query.toLowerCase()) || !query,
  );

  const toggleLanguage = (languageCode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentLangs = params.get('languages')?.split(',').filter(Boolean) || [];

    const newLangs = currentLangs.includes(languageCode)
      ? currentLangs.filter((code) => code !== languageCode)
      : [...currentLangs, languageCode];

    if (newLangs.length) {
      params.set('languages', newLangs.join(','));
    } else {
      params.delete('languages');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover className="flex relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
              'border dark:border-gray-800',
              open || selectedLanguages.length > 0
                ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700',
            )}
          >
            <div className="flex gap-2 items-center">
              {selectedLanguages.length > 0 ? (
                <>
                  <div className="flex -space-x-1">
                    {selectedLanguages.slice(0, 2).map((lang) => (
                      <lang.Flag key={lang.code} className="w-4 h-3 first:z-10" />
                    ))}
                  </div>
                  <span>
                    {selectedLanguages.length}
                    {selectedLanguages.length === 1 ? ' Language' : ' Languages'}
                  </span>
                </>
              ) : (
                'Languages'
              )}
            </div>
            <Icons.ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-2 w-72 bg-white rounded-lg border shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3">
              {/* Search and selected languages */}
              <div className="space-y-2">
                <div className="relative">
                  <Icons.Search className="absolute left-2 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search languages..."
                    className="py-2 pr-3 pl-8 w-full text-sm bg-gray-50 rounded-lg border-0 dark:bg-gray-700 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* Selected languages chips */}
                {selectedLanguages.length > 0 && (
                  <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                    {selectedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => toggleLanguage(lang.code)}
                        className="flex gap-1 items-center px-2 py-1 text-xs bg-white rounded-full border shadow-sm dark:bg-gray-800 dark:border-gray-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      >
                        <lang.Flag className="w-3 h-2" />
                        <span>{lang.name}</span>
                        <Icons.X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language list */}
              <div className="overflow-auto mt-2 max-h-60 divide-y dark:divide-gray-700">
                {filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => toggleLanguage(language.code)}
                    className={cn(
                      'flex items-center w-full gap-2 px-2 py-1.5 text-sm transition-colors',
                      selectedLanguages.some((l) => l.code === language.code)
                        ? 'text-rose-500 dark:text-rose-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                    )}
                  >
                    <language.Flag className="w-5 h-4" />
                    <span className="flex-1 text-left">{language.name}</span>
                    {selectedLanguages.some((l) => l.code === language.code) && <Icons.Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
