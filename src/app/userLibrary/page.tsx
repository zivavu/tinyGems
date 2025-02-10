import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/utils';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { LibraryContent } from '../../features/shared/components/userLibrary/components/LibraryContent';

const tabs = [
  { name: 'Songs', icon: Icons.Music },
  { name: 'Albums', icon: Icons.Disc },
  { name: 'Artists', icon: Icons.Users },
];

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Typography variant="h2">Your Library</Typography>
          <Typography variant="p" className="text-stone-600 dark:text-stone-400">
            All your favorite underground gems in one place
          </Typography>
        </div>

        <TabGroup>
          <TabList className="flex gap-2 p-1 mb-8 max-w-md bg-white dark:bg-stone-900 rounded-lg">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  cn(
                    'flex items-center gap-2 w-full py-2.5 px-4 rounded-md text-sm font-medium leading-5 transition-colors',
                    selected
                      ? 'bg-rose-500 text-white shadow'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800',
                  )
                }
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
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
      </div>
    </main>
  );
}
