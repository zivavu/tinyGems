'use client';

import { Typography } from '@/features/shared/components/Typography';
import { trpc } from '@/lib/trpc';

export default function TestPage() {
  const { data, isLoading, error } = trpc.test.testMongo.useQuery();

  return (
    <main className="p-8">
      <Typography variant="h2">MongoDB Connection Test</Typography>

      <div className="mt-4">
        {isLoading && <Typography variant="p">Testing connection...</Typography>}

        {error && (
          <Typography variant="p" className="text-red-500">
            Error: {error.message}
          </Typography>
        )}

        {data && (
          <div className="space-y-2">
            <Typography variant="p" className={data.success ? 'text-green-500' : 'text-red-500'}>
              {data.message}
            </Typography>
            {data.success && (
              <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto">{JSON.stringify(data.message, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
