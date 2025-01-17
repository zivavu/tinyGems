import { Gem } from '@/lib/types/gems';
import { GemCard } from './GemCard';

interface GemGridProps {
  gems: Gem[];
  className?: string;
}

export function GemGrid({ gems, className }: GemGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {gems.map((gem) => (
        <GemCard key={gem.id} gem={gem} />
      ))}
    </div>
  );
}
