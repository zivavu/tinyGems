import { Icons } from '@/features/shared/components/Icons';
import { MediaPreviewPlayer } from '@/features/shared/components/MediaPreviewPlayer/MediaPreviewPlayer';
import { Typography } from '@/features/shared/components/Typography';
import { dummyAlbums } from '@/features/shared/utils/dummy/albums';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const resolvedParams = await params;
  const album = dummyAlbums.find((a) => a.id === resolvedParams.id);

  if (!album) {
    notFound();
  }

  const albumTracks = album.tracks
    .map((track) => dummyGems.find((gem) => gem.id === track.gemId))
    .filter((gem): gem is NonNullable<typeof gem> => gem !== undefined)
    .sort((a, b) => {
      const trackA = album.tracks.find((t) => t.gemId === a.id)?.order ?? 0;
      const trackB = album.tracks.find((t) => t.gemId === b.id)?.order ?? 0;
      return trackA - trackB;
    });

  const coverImage = album.properties.media.coverImage;
  const releaseYear = new Date(album.metadata.releaseDate).getFullYear();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900/50" role="main">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 lg:grid-cols-[350px,1fr]">
          <div className="space-y-6">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
              {coverImage ? (
                <Image src={coverImage} alt={`Album cover for ${album.title}`} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Icons.Music className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Link
                href={`/artist/${album.artist.id}`}
                className="flex items-center gap-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 -m-4 rounded-lg transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {album.artist.avatar ? (
                    <Image fill src={album.artist.avatar} alt={album.artist.name} className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Typography variant="h3">{album.artist.name[0]}</Typography>
                    </div>
                  )}
                </div>
                <div>
                  <Typography variant="h3" className="group-hover:text-rose-500 transition-colors">
                    {album.artist.name}
                  </Typography>
                  {album.artist.location && (
                    <Typography variant="small" className="text-gray-500">
                      {album.artist.location.country} {album.artist.location.city ? `, ${album.artist.location.city}` : ''}
                    </Typography>
                  )}
                </div>
              </Link>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.Heart className="w-5 h-5 text-rose-500" />
                  <span>{album.likes.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <Typography variant="small" className="text-rose-500 font-medium uppercase tracking-wider">
                  {album.type}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  {releaseYear}
                </Typography>
              </div>
              <Typography variant="h1" className="mb-4">
                {album.title}
              </Typography>

              <div className="flex flex-wrap gap-2 mb-6">
                {album.properties.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 text-sm bg-rose-100 text-rose-800 rounded-full dark:bg-rose-900/30 dark:text-rose-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {album.properties.platforms[0] && (
                <div className="mb-8">
                  <MediaPreviewPlayer media={album} type="album" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Typography variant="h2">Tracks</Typography>
              <div className="space-y-2">
                {albumTracks.map((track, index) => (
                  <Link
                    key={track.id}
                    href={`/gem/song/${track.id}`}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                  >
                    <Typography variant="h4" className="w-8 text-gray-400">
                      {index + 1}
                    </Typography>
                    <div className="flex-1">
                      <Typography variant="h4">{track.title}</Typography>
                      <Typography variant="small" className="text-gray-500">
                        {track.properties.duration}
                      </Typography>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
