'use client';

import { Icons } from '@/lib/Icons';
import { categories, Category } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategorySelectorProps {
  selectedCategory: Category;
}

export function CategorySelector({ selectedCategory }: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category.slug);
    router.push(`/seek?${params.toString()}`, { scroll: false });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all',
              'border-2 shadow-sm',
              open
                ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/20 shadow-rose-100 dark:shadow-rose-950/10'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
            )}
          >
            <div className="flex gap-2 items-center">
              <div
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  open ? 'bg-rose-100 dark:bg-rose-900/20' : 'bg-gray-100 dark:bg-gray-800',
                )}
              >
                <DynamicIcon className="w-4 h-4" name={selectedCategory.icon} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 dark:text-gray-400">Category</span>
                <span className="font-medium">{selectedCategory.title}</span>
              </div>
            </div>
            <Icons.ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-2 w-80 bg-white rounded-lg border shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-2">
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                      category.slug === selectedCategory.slug ? 'bg-rose-500 text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                    )}
                  >
                    <div
                      className={cn(
                        'p-1.5 rounded-md',
                        category.slug === selectedCategory.slug ? 'bg-rose-400/20' : 'bg-gray-100 dark:bg-gray-800',
                      )}
                    >
                      <DynamicIcon className="w-4 h-4" name={category.icon} />
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
        </>
      )}
    </Popover>
  );
}
