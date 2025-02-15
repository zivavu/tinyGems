import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';

export function OriginalArtistProfile({ artistData }: { artistData: ExternalPlatformArtistData }) {
  return (
    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
      <Typography variant="small" className="text-amber-700 dark:text-amber-300 mb-2">
        Original profile from {artistData.platformId}
      </Typography>
      <div className="flex items-center gap-4">
        {artistData.avatar ? (
          <Image width={96} height={96} src={artistData.avatar} alt={artistData.name} className="w-24 h-24 rounded-lg object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Icons.Music className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <Typography variant="h3">{artistData.name}</Typography>
          {artistData.metadata?.genres && (
            <div className="flex flex-wrap gap-2 mt-2">
              {artistData.metadata.genres.map((genre) => (
                <span key={genre} className="px-2 py-1 text-sm bg-amber-100 dark:bg-amber-900 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          )}
          <Link
            href={`https://${artistData.platformId}.com/${artistData.platformId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Icons.ExternalLink className="w-4 h-4" />
            <Typography variant="small">View profile</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
