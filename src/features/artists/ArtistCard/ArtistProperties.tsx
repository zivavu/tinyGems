import { Artist } from '@/features/artists/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';

interface ArtistPropertiesProps {
  artist: Artist;
}

export function ArtistProperties({ artist }: ArtistPropertiesProps) {
  return (
    <div className="mb-4 space-y-2">
      <div className="flex flex-wrap gap-3">
        {artist.gender && (
          <Typography variant="small" className="text-gray-500 flex items-center gap-1">
            <Icons.User className="w-4 h-4" />
            {artist.gender.charAt(0).toUpperCase() + artist.gender.slice(1)}
          </Typography>
        )}
        {artist.stats.lastSongDate && (
          <Typography variant="small" className="text-gray-500 flex items-center gap-1">
            <Icons.Calendar className="w-4 h-4" />
            Last active {new Date(artist.stats.lastSongDate).toDateString()}
          </Typography>
        )}
      </div>
    </div>
  );
}
