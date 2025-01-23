import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import { GemBase } from '../types/gemsTypes';
import { GemCard } from './GemCard';

interface GemGridProps {
  gems: GemBase[];
  className?: string;
}

export function GemGrid({ gems, className }: GemGridProps) {
  if (!gems.length) {
    return (
      <div className="py-12 text-center">
        <Typography variant="h3">No gems found</Typography>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', className)}>
      {gems.map((gem) => (
        <GemCard key={gem.id} gem={gem} />
      ))}
    </div>
  );
}
