'use client';

import { Gem, isArtGem, isCraftGem, isMusicGem } from '@/features/gems/types/gems';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/dummy/utils';

interface GemMetadataProps {
  gem: Gem;
  className?: string;
}

export function GemMetadata({ gem, className }: GemMetadataProps) {
  if (isMusicGem(gem)) {
    return (
      <div className={cn('grid gap-4 sm:grid-cols-2', className)} role="complementary" aria-label="Music details">
        <MetadataItem label="Duration" value={gem.properties.duration} />
        <MetadataItem label="Release Date" value={new Date(gem.properties.releaseDate).toLocaleDateString()} />
        <MetadataItem label="Genres" value={gem.properties.genres.join(', ')} className="sm:col-span-2" />
      </div>
    );
  }

  if (isArtGem(gem)) {
    return (
      <div className={cn('grid gap-4 sm:grid-cols-2', className)} role="complementary" aria-label="Artwork details">
        <MetadataItem label="Medium" value={gem.properties.medium.join(', ')} className="sm:col-span-2" />
        {gem.properties.dimensions && <MetadataItem label="Dimensions" value={gem.properties.dimensions} />}
      </div>
    );
  }

  if (isCraftGem(gem)) {
    return (
      <div className={cn('grid gap-4 sm:grid-cols-2', className)} role="complementary" aria-label="Craft details">
        <MetadataItem label="Materials" value={gem.properties.materials.join(', ')} className="sm:col-span-2" />
        {gem.properties.dimensions && <MetadataItem label="Dimensions" value={gem.properties.dimensions} />}
        {gem.properties.timeToMake && <MetadataItem label="Time to Make" value={gem.properties.timeToMake} />}
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
