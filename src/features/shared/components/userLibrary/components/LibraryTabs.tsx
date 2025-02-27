'use client';

import { Icons } from '@/features/shared/components/Icons';
import { cn } from '@/features/shared/utils/cn';
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
      <div className="border-b border-border dark:border-border-strong">
        <TabList className="flex -mb-px">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                cn(
                  'group relative min-w-[180px] py-4 px-6 flex items-center justify-center gap-2.5',
                  'focus:outline-none',
                  selected
                    ? 'text-accent-600 dark:text-accent-400'
                    : 'text-text-muted dark:text-text-muted hover:text-text dark:hover:text-text-inverted',
                  'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5',
                  selected
                    ? 'before:bg-accent-600 dark:before:bg-accent-400'
                    : 'before:bg-transparent hover:before:bg-border-strong dark:hover:before:bg-border-strong',
                  'before:transition-all before:duration-300',
                )
              }
            >
              <tab.icon className={cn('w-5 h-5 transition-transform duration-300', 'group-hover:scale-110')} />
              <span className="font-medium">{tab.name}</span>
              {tab.count > 0 && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs rounded-full',
                    'bg-background-muted dark:bg-background-muted',
                    'text-text-muted dark:text-text-muted',
                  )}
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
