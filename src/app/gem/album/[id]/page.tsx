import { Icons } from '@/features/shared/components/Icons';
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

  const albumGems = dummyGems
    .filter((gem) => album.tracks.find((track) => track.gemId === gem.id))
    .sort((a, b) => {
      const orderA = album.tracks.find((t) => t.gemId === a.id)?.order || 0;
      const orderB = album.tracks.find((t) => t.gemId === b.id)?.order || 0;
      return orderA - orderB;
    });

  const coverImage = album.properties.media.coverImage;
  const releaseYear = new Date(album.metadata.releaseDate).getFullYear();

  return (
    <main className="container px-4 py-8 mx-auto max-w-7xl" role="main">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Cover Art & Info */}
        <div className="lg:w-[24rem] space-y-6">
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/20 dark:to-purple-900/20 overflow-hidden shadow-xl group">
            {coverImage ? (
              <Image
                fill
                src={coverImage}
                alt={`Album cover for ${album.title}`}
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <Icons.Disc className="w-20 h-20 text-gray-400 m-auto" />
            )}
          </div>

          {/* Artist Info Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <Link href={`/artist/${album.artist.id}`} className="flex items-center gap-4 group mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {album.artist.avatar ? (
                  <Image fill src={album.artist.avatar} alt={album.artist.name} className="object-cover" />
                ) : (
                  <Icons.User className="w-8 h-8 m-auto text-gray-400" />
                )}
              </div>
              <div>
                <Typography variant="h3" className="group-hover:text-rose-500 transition-colors">
                  {album.artist.name}
                </Typography>
                {album.artist.location?.city && (
                  <Typography variant="small" className="text-gray-500">
                    {album.artist.location.city}
                  </Typography>
                )}
              </div>
            </Link>
          </div>

          {/* Album Details */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm space-y-4">
            <Typography variant="h3" className="font-semibold">
              Album Details
            </Typography>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <Icons.Calendar className="w-5 h-5" />
                <span>Released in {releaseYear}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Clock className="w-5 h-5" />
                <span>{album.properties.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Music className="w-5 h-5" />
                <span>{album.properties.totalTracks} tracks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Player & Tracks */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-baseline gap-4 mb-2">
              <Typography variant="small" className="text-rose-500 font-medium uppercase tracking-wider">
                {album.type}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {releaseYear}
              </Typography>
            </div>
            <Typography variant="h1" className="break-words mb-6">
              {album.title}
            </Typography>
          </div>

          {/* Genres */}
          {album.properties.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {album.properties.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 text-sm rounded-full font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-rose-50 dark:bg-gray-900 dark:hover:bg-rose-900/20 transition-colors">
              <Icons.Heart className="w-5 h-5 text-rose-500" />
              <span className="font-medium">{album.stats.likes}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-rose-50 dark:bg-gray-900 dark:hover:bg-rose-900/20 transition-colors">
              <Icons.Bookmark className="w-5 h-5 text-rose-500" />
              <span className="font-medium">{album.stats.saves}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
