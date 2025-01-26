import { Icons } from '@/features/shared/components/Icons';

interface StatsSectionProps {
  likes: number;
  saves: number;
}

export function StatsSection({ likes, saves }: StatsSectionProps) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm" aria-label="Engagement stats">
      <div className="flex gap-4 items-center">
        <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500" aria-label={`Like this gem (${likes} likes)`}>
          <Icons.Heart className="w-4 h-4" aria-hidden="true" />
          <span>{likes}</span>
        </button>
        <button className="flex gap-1 items-center text-gray-500 hover:text-rose-500" aria-label={`Save this gem (${saves} saves)`}>
          <Icons.Bookmark className="w-4 h-4" aria-hidden="true" />
          <span>{saves}</span>
        </button>
      </div>
    </div>
  );
}
