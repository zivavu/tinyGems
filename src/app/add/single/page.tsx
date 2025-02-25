import { Typography } from '@/features/shared/components/Typography';

export default function AddSinglePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Typography variant="h2">Add Single</Typography>
          <Typography variant="muted">
            Share an underground track with the community. Start by pasting a link from any major platform.
          </Typography>
        </div>

        {/* TODO: Create and implement AddSingleForm component */}
        <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <Typography variant="muted" className="text-center">
            Single track submission form coming soon
          </Typography>
        </div>
      </div>
    </main>
  );
}
