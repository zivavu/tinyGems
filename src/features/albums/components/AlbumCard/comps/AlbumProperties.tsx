import { Album } from '@/features/albums/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';

interface AlbumPropertiesProps {
  album: Album;
}

export function AlbumProperties({ album }: AlbumPropertiesProps) {
  return (
    <div className="mb-4 space-y-2">
      <div className="flex flex-wrap gap-3">
        {album.properties.duration && (
          <Typography variant="small" className="text-gray-500 flex items-center gap-1">
            <Icons.Clock className="w-4 h-4" />
            {album.properties.duration}
          </Typography>
        )}
        {album.properties.genres?.[0] && (
          <Typography variant="small" className="text-gray-500 flex items-center gap-1">
            <Icons.Music className="w-4 h-4" />
            {album.properties.genres[0]}
          </Typography>
        )}
        {album.metadata.releaseDate && (
          <Typography variant="small" className="text-gray-500 flex items-center gap-1">
            <Icons.Calendar className="w-4 h-4" />
            {new Date(album.metadata.releaseDate).getFullYear()}
          </Typography>
        )}
      </div>
    </div>
  );
}
