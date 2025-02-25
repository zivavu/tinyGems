import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface ArtistMatchProps {
  artist: {
    artistId: string;
    artistName: string;
    artistUrl: string;
    thumbnailImageUrl?: string | null;
    confidence: number;
  };
  platform: string;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export function ArtistMatchCard({ artist, platform, isSelected, onToggleSelect }: ArtistMatchProps) {
  // Get the platform icon if available
  const platformIcon = platformIconsMap[platform as keyof typeof platformIconsMap];

  // Format confidence score as percentage
  const confidencePercentage = Math.round(artist.confidence * 100);

  // Color class based on confidence
  let confidenceColorClass = 'text-amber-600 dark:text-amber-400';
  if (confidencePercentage >= 85) {
    confidenceColorClass = 'text-green-600 dark:text-green-400';
  } else if (confidencePercentage < 50) {
    confidenceColorClass = 'text-red-600 dark:text-red-400';
  }

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border ${
        isSelected
          ? 'border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      {/* Artist image */}
      <div className="flex-shrink-0">
        {artist.thumbnailImageUrl ? (
          <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image src={artist.thumbnailImageUrl} alt={artist.artistName} width={48} height={48} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
            <Icons.Music className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* Artist info */}
      <div className="flex-1 min-w-0">
        <Typography className="font-medium truncate flex items-center gap-1.5">
          {platformIcon && <FontAwesomeIcon icon={platformIcon} className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />}
          <span className="truncate">{artist.artistName}</span>
        </Typography>

        <Typography variant="small" className={`text-sm ${confidenceColorClass}`}>
          {confidencePercentage}% match
        </Typography>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-1.5">
        <Button variant={isSelected ? 'default' : 'secondary'} size="sm" onClick={onToggleSelect} className="whitespace-nowrap">
          {isSelected ? (
            <>
              <Icons.Check className="w-3.5 h-3.5 mr-1" />
              Selected
            </>
          ) : (
            'Select'
          )}
        </Button>

        <Button variant="ghost">
          <a href={artist.artistUrl} target="_blank" rel="noopener noreferrer">
            <Icons.ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
