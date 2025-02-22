import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';

interface GemPlaceholderProps {
  className?: string;
}

export function GemPlaceholder({ className }: GemPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center w-full h-full',
        'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20',
        className,
      )}
      role="img"
      aria-label="No preview available"
    >
      <Icons.Sparkles size={120} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
      <Typography variant="small" className="mt-2 text-gray-500 dark:text-gray-400">
        No preview
      </Typography>
    </div>
  );
}
