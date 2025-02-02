import { Icons } from '@/features/shared/components/Icons';

export function ArtistPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <Icons.User className="w-8 h-8 text-gray-400 dark:text-gray-600" />
    </div>
  );
}
