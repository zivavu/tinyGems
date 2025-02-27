import { PlatformType } from '@/features/gems/types';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import Image from 'next/image';

interface ArtistMatchProps {
  artist: {
    artistId: string;
    artistName: string;
    artistUrl: string;
    thumbnailImageUrl?: string | null;
    confidence: number;
  };
  platform: PlatformType;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export function ArtistMatchCard({ artist, isSelected, onToggleSelect }: ArtistMatchProps) {
  // Format confidence score as percentage
  const confidencePercentage = Math.round(artist.confidence * 100);

  // Color class based on confidence
  let confidenceColorClass = 'text-amber-600 dark:text-amber-400';
  let confidenceBgClass = 'bg-amber-50 dark:bg-amber-900/20';
  let confidenceBorderClass = 'border-amber-200 dark:border-amber-800/50';

  if (confidencePercentage >= 85) {
    confidenceColorClass = 'text-green-600 dark:text-green-400';
    confidenceBgClass = 'bg-green-50 dark:bg-green-900/20';
    confidenceBorderClass = 'border-green-200 dark:border-green-800/50';
  } else if (confidencePercentage < 50) {
    confidenceColorClass = 'text-red-600 dark:text-red-400';
    confidenceBgClass = 'bg-red-50 dark:bg-red-900/20';
    confidenceBorderClass = 'border-red-200 dark:border-red-800/50';
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {/* Artist image */}
      <div className="flex-shrink-0">
        {artist.thumbnailImageUrl ? (
          <div
            className={`w-10 h-10 rounded-md overflow-hidden border ${isSelected ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <Image src={artist.thumbnailImageUrl} alt={artist.artistName} width={40} height={40} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center border ${isSelected ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-600'}`}
          >
            <Icons.Music className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Artist info */}
      <div className="flex-1 min-w-0">
        <Typography className="font-medium truncate text-sm">
          <span className="truncate">{artist.artistName}</span>
        </Typography>

        <div className="flex items-center gap-1.5 mt-0.5">
          <div
            className={`text-xs px-1.5 py-0.5 rounded-full ${confidenceBgClass} ${confidenceColorClass} border ${confidenceBorderClass}`}
          >
            {confidencePercentage}%
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          variant={isSelected ? 'default' : 'outline'}
          size="sm"
          onClick={onToggleSelect}
          className={`whitespace-nowrap h-8 px-2.5 ${isSelected ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}`}
        >
          {isSelected ? <Icons.Check className="w-3.5 h-3.5" /> : 'Select'}
        </Button>

        <Button variant="ghost" size="sm" className="p-0 h-8 w-8 flex items-center justify-center">
          <a href={artist.artistUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
            <Icons.ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
