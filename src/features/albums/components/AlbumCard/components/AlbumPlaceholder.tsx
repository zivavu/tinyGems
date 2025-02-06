import { Icons } from '@/features/shared/components/Icons';

export function AlbumPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <Icons.Disc className="w-16 h-16 text-gray-400 dark:text-gray-600" />
    </div>
  );
}
