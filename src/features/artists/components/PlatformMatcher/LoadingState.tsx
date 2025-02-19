export function LoadingState() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse opacity-60" />
      <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse opacity-30" />
    </div>
  );
}
