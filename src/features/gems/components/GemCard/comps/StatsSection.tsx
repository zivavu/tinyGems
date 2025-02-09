import { Icons } from '@/features/shared/components/Icons';

interface StatsSectionProps {
  likes: number;
}

export function StatsSection({ likes }: StatsSectionProps) {
  if (!likes) return null;

  return (
    <div className="flex justify-between items-center mt-4 text-sm" aria-label="Engagement stats">
      <div className="flex gap-4 items-center">
        <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500" aria-label={`Like this gem (${likes} likes)`}>
          <Icons.Heart className="w-4 h-4" aria-hidden="true" />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
