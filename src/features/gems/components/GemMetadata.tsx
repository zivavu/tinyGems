'use client';

import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';
import { GemBase, MusicGem } from '../types/gems';

interface GemMetadataProps {
  gem: GemBase;
  className?: string;
}

export function GemMetadata({ gem, className }: GemMetadataProps) {
  if (gem.type === 'music') {
    const musicGem = gem as MusicGem;
    return (
      <div className={cn('grid gap-4 sm:grid-cols-2', className)} role="complementary" aria-label="Music details">
        <MetadataItem label="Duration" value={musicGem.properties.duration} />
        <MetadataItem label="Release Date" value={new Date(musicGem.properties.releaseDate).toLocaleDateString()} />
        <MetadataItem label="Genres" value={musicGem.properties.genres.join(', ')} className="sm:col-span-2" />
      </div>
    );
  }

  return null;
}

function MetadataItem({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <Typography variant="small" className="text-gray-500 dark:text-gray-400" aria-hidden="true">
        {label}
      </Typography>
      <Typography variant="p" className="mt-1" aria-label={`${label}: ${value}`}>
        {value}
      </Typography>
    </div>
  );
}
