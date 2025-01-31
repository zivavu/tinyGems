'use client';

import { trpc } from '@/utils/trpc';

export function TestTRPC() {
  const hello = trpc.test.hello.useQuery({ name: 'tinyGems' });
  const counter = trpc.test.counter.useQuery();

  if (hello.isLoading || counter.isLoading) return <div>Loading...</div>;
  if (hello.error || counter.error) return <div>Error occurred</div>;

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div>
        <h3 className="font-bold">Greeting Test:</h3>
        <p>{hello?.data?.greeting}</p>
        <p className="text-sm text-gray-500">Server time: {hello?.data?.time}</p>
      </div>

      <div>
        <h3 className="font-bold">Random Counter Test:</h3>
        <p>Count: {counter?.data?.count}</p>
      </div>
    </div>
  );
}
