import { Typography } from '@/features/shared/components/Typography';
import { LibraryTabs } from '@/features/shared/components/userLibrary/components/LibraryTabs';

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

        <LibraryTabs />
      </div>
    </main>
  );
}
