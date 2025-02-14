import { PlatformStatuses } from './types';

export function ProgressIndicator({ platformStatuses }: { platformStatuses: PlatformStatuses }) {
  const isSearching = Object.values(platformStatuses).some((status) => status.status === 'searching');

  return (
    <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
      {isSearching && (
        <div className="absolute inset-0">
          <div
            className="absolute h-full bg-amber-500/20 w-full"
            style={{
              animation: 'indeterminate 1s ease-in-out infinite',
              animationName: 'indeterminate',
              animationDuration: '1s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
          <div
            className="absolute h-full bg-amber-500 w-1/3"
            style={{
              animation: 'indeterminate-short 1s ease-in-out infinite',
              animationName: 'indeterminate-short',
              animationDuration: '1s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
        </div>
      )}
    </div>
  );
}
