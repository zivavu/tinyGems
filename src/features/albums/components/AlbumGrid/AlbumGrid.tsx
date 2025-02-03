import { Album } from '@/features/albums/types';
import { AlbumCard } from '../AlbumCard/AlbumCard';

interface AlbumGridProps {
  albums: Album[];
  className?: string;
}

export function AlbumGrid({ albums, className }: AlbumGridProps) {
  if (!albums?.length) return null;

  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className || ''}`}>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
