import { Typography } from '@/features/shared/components/Typography';

export interface SuggestedMatchesProps {
  matches: Array<{
    artistId: string;
    artistName: string;
    artistUrl: string;
    thumbnailImageUrl?: string | null;
    confidence: number;
  }>;
  onConnect: (url: string) => void;
  isLoading: boolean;
}

export function SuggestedMatches({ matches, onConnect, isLoading }: SuggestedMatchesProps) {
  return (
    <div className="space-y-2">
      <Typography variant="small" className="text-gray-500">
        Suggested matches
      </Typography>
      {matches.map((artist) => (
        <div
          key={artist.artistId}
          className="group flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
        >
          {/* Artist card content */}
        </div>
      ))}
    </div>
  );
}
