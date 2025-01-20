'use client';

import { categories, Category } from '@/features/shared/utils/dummy/categories';
import { cn } from '@/features/shared/utils/dummy/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterButton } from '../../../../shared/components/buttons/FilterButton';
import { PopoverTransition } from '../../../../shared/components/transitions/PopoverTransition';

interface CategorySelectorProps {
  selectedCategory: Category;
}

export function CategorySelect({ selectedCategory }: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: Category) => {
    const params = new URLSearchParams();

    // Only preserve lang parameter and category
    const lang = searchParams.get('lang');
    if (lang) {
      params.set('lang', lang);
    }

    params.set('category', category.slug);

    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton as={FilterButton} aria-label={`Selected category: ${selectedCategory.title}`}>
            <div className="flex gap-2 items-center">
              <div
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  open ? 'bg-rose-100 dark:bg-rose-900/20' : 'bg-gray-100 dark:bg-gray-800',
                )}
              >
                <DynamicIcon className="w-4 h-4" name={selectedCategory.icon} aria-hidden="true" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 dark:text-gray-400">Category</span>
                <span className="font-medium">{selectedCategory.title}</span>
              </div>
            </div>
          </PopoverButton>

          <PopoverTransition show={open}>
            <PopoverPanel
              className="absolute z-10 mt-2 bg-white rounded-lg border shadow-lg w-fit min-w-[24rem] dark:bg-gray-800 dark:border-gray-700"
              aria-label="Category selection menu"
            >
              <div className="p-2">
                <div className="grid grid-cols-2 gap-1.5" role="listbox" aria-label="Available categories">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                        category.slug === selectedCategory.slug ? 'bg-rose-500 text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                      )}
                      role="option"
                      aria-selected={category.slug === selectedCategory.slug}
                      aria-label={`Select ${category.title} category`}
                    >
                      <div
                        className={cn(
                          'p-1.5 rounded-md',
                          category.slug === selectedCategory.slug ? 'bg-rose-400/20' : 'bg-gray-100 dark:bg-gray-800',
                        )}
                      >
                        <DynamicIcon className="w-4 h-4" name={category.icon} aria-hidden="true" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{category.title}</span>
                        <span
                          className={cn(
                            'text-xs',
                            category.slug === selectedCategory.slug ? 'text-rose-200' : 'text-gray-500 dark:text-gray-400',
                          )}
                        ></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  );
}
