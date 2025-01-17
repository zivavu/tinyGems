import { Typography } from '@/components/ui/Typography';
import { dummyGems } from '@/lib/dummy/gems';
import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { faBandcamp, faSoundcloud, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GemPageProps {
  params: { id: string };
}

export default async function GemPage({ params }: GemPageProps) {
  const resolvedParams = await params;
  const gem = dummyGems.find((g) => g.id === resolvedParams.id);

  if (!gem) {
    notFound();
  }

  const sourceIcon = {
    bandcamp: { icon: faBandcamp, color: 'text-[#1DA0C3]' },
    spotify: { icon: faSpotify, color: 'text-[#1DB954]' },
    soundcloud: { icon: faSoundcloud, color: 'text-[#FF3300]' },
    youtube: { icon: faYoutube, color: 'text-[#FF0000]' },
    other: { icon: faBandcamp, color: 'text-gray-400' },
  }[gem.source];

  return (
    <main className="container px-4 py-8 mx-auto">
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Album Art */}
          <div className="overflow-hidden bg-gray-100 rounded-lg aspect-square dark:bg-gray-800">
            {gem.albumArt ? (
              <Image src={gem.albumArt} alt={gem.title} width={600} height={600} className="object-cover w-full h-full" />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <Icons.Music className="w-20 h-20 text-gray-400" />
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <div>
              <Typography variant="h1" className="mb-2">
                {gem.title}
              </Typography>
              <Typography variant="h3" className="text-gray-600 dark:text-gray-400">
                by {gem.artist.name}
              </Typography>
            </div>
            {gem.description && (
              <Typography variant="p" className="text-gray-600 dark:text-gray-400">
                {gem.description}
              </Typography>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {gem.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm text-rose-700 bg-rose-100 rounded-full dark:bg-rose-900/30 dark:text-rose-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="p-4 space-y-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <Link
              href={gem.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('flex gap-2 items-center w-full p-3 text-white rounded-lg transition-transform hover:scale-[1.02]', {
                'bg-[#1DA0C3]': gem.source === 'bandcamp',
                'bg-[#1DB954]': gem.source === 'spotify',
                'bg-[#FF3300]': gem.source === 'soundcloud',
                'bg-[#FF0000]': gem.source === 'youtube',
              })}
            >
              {sourceIcon && <FontAwesomeIcon icon={sourceIcon.icon} className="w-5 h-5" />}
              <span className="font-medium">Listen on {gem.source}</span>
            </Link>

            <div className="flex gap-4">
              <button className="flex flex-1 gap-2 justify-center items-center p-3 font-medium text-rose-600 rounded-lg border-2 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-900/30">
                <Icons.Heart className="w-5 h-5" />
                <span>{gem.likes}</span>
              </button>
              <button className="flex flex-1 gap-2 justify-center items-center p-3 font-medium text-rose-600 rounded-lg border-2 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-900/30">
                <Icons.Bookmark className="w-5 h-5" />
                <span>{gem.saves}</span>
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="p-4 space-y-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <div className="space-y-2">
              <Typography variant="small" className="text-gray-500">
                Location
              </Typography>
              <Typography variant="p">{gem.artist.location}</Typography>
            </div>

            <div className="space-y-2">
              <Typography variant="small" className="text-gray-500">
                Release Date
              </Typography>
              {gem.releaseDate && <Typography variant="p">{new Date(gem?.releaseDate).toLocaleDateString()}</Typography>}
            </div>

            <div className="space-y-2">
              <Typography variant="small" className="text-gray-500">
                Duration
              </Typography>
              <Typography variant="p">{gem.duration}</Typography>
            </div>

            {gem.curator && (
              <div className="space-y-2">
                <Typography variant="small" className="text-gray-500">
                  Curated by
                </Typography>
                <div className="flex gap-2 items-center">
                  {gem.curator.avatar && (
                    <Image src={gem.curator.avatar} alt={gem.curator.name} width={24} height={24} className="rounded-full" />
                  )}
                  <Typography variant="p">{gem.curator.name}</Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
