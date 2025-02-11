'use client';

import { Icons } from '@/features/shared/components/Icons';
import { cn } from '@/features/shared/utils/utils';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { LibraryContent } from './LibraryContent';

const tabs = [
  { name: 'Songs', icon: Icons.Music, count: 0 },
  { name: 'Albums', icon: Icons.Disc, count: 0 },
  { name: 'Artists', icon: Icons.Users, count: 0 },
];

export function LibraryTabs() {
  return (
    <TabGroup>
      <div className="border-b border-stone-200 dark:border-stone-800">
        <TabList className="flex -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                cn(
                  'group relative min-w-[180px] py-4 px-6 flex items-center justify-center gap-2.5',
                  'focus:outline-none',
                  selected
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200',
                  'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5',
                  selected
                    ? 'before:bg-rose-600 dark:before:bg-rose-400'
                    : 'before:bg-transparent hover:before:bg-stone-200 dark:hover:before:bg-stone-700',
                  'before:transition-all before:duration-300',
                )
              }
            >
              <tab.icon className={cn('w-5 h-5 transition-transform duration-300', 'group-hover:scale-110')} />
              <span className="font-medium">{tab.name}</span>
              {tab.count > 0 && (
                <span
                  className={cn('px-2 py-0.5 text-xs rounded-full', 'bg-stone-100 dark:bg-stone-800', 'text-stone-600 dark:text-stone-400')}
                >
                  {tab.count}
                </span>
              )}
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels className="mt-8">
        <TabPanel>
          <LibraryContent type="song" />
        </TabPanel>
        <TabPanel>
          <LibraryContent type="album" />
        </TabPanel>
        <TabPanel>
          <LibraryContent type="artist" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
