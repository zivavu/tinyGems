import { GemMedia } from '@/features/gems/components/GemMedia';
import { GemMetadata } from '@/features/gems/components/GemMetadata';
import { GemBase, MusicGem } from '@/features/gems/types/gemsTypes';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { cn } from '@/features/shared/utils/dummy/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GemPageProps {
  params: Promise<{ id: string }>;
}

function MusicDetails({ gem }: { gem: MusicGem }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="region" aria-label="Music details">
      {/* Platforms */}
      <div className="space-y-1">
        <Typography variant="small" className="text-gray-500 uppercase tracking-wide">
          Available On
        </Typography>
        <div className="flex gap-3">
          {gem.properties.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label={`Open ${platform.name}`}
            ></a>
          ))}
        </div>
      </div>

      {/* Metadata Grid */}
      {[
        { title: 'Genre', items: gem.properties.genres },
        { title: 'Mood', items: gem.properties.moods },
        { title: 'Language', items: gem.properties.languages },
        { title: 'Lyrics', items: gem.properties.lyrics },
      ].map((section) =>
        section.items?.length ? (
          <div key={section.title} className="space-y-1">
            <Typography variant="small" className="text-gray-500 uppercase tracking-wide">
              {section.title}
            </Typography>
            <Typography variant="p" className="text-gray-700 dark:text-gray-300">
              {section.items.join(' • ')}
            </Typography>
          </div>
        ) : null,
      )}

      {/* Release Info */}
      <div className="space-y-1">
        <Typography variant="small" className="text-gray-500 uppercase tracking-wide">
          Release Details
        </Typography>
        <div className="flex gap-4 text-gray-700 dark:text-gray-300">
          <span>{gem.properties.duration}</span>
          <span>{new Date(gem.properties.releaseDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default async function GemPage({ params }: GemPageProps) {
  const resolvedParams = await params;
  const gem: GemBase | undefined = dummyGems.find((g) => g.id === resolvedParams.id);

  if (!gem) {
    notFound();
  }

  return (
    <main className="container px-4 py-8 mx-auto" role="main" aria-label={`Viewing ${gem.title}`}>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <div className="overflow-hidden bg-gray-100 rounded-2xl dark:bg-gray-900">
            <GemMedia gem={gem} />
          </div>

          <div className="space-y-6">
            <Typography variant="h1" className="break-words">
              {gem.title}
            </Typography>

            {gem.type === 'music' ? (
              <MusicDetails gem={gem as MusicGem} />
            ) : (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
                {gem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-400"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <Typography variant="p" className="text-gray-600 dark:text-gray-400">
              {gem.description}
            </Typography>

            <GemMetadata gem={gem} />
          </div>
        </div>

        <div className="space-y-8">
          {/* Artist Card */}
          <div className="p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
            <Link
              href={`/artist/${gem.artist.id}`}
              className="flex gap-4 items-center group"
              aria-label={`View ${gem.artist.name}'s profile`}
            >
              <div className="overflow-hidden relative w-16 h-16 bg-gray-200 rounded-full dark:bg-gray-800">
                {gem.artist.avatar && <Image fill src={gem.artist.avatar} alt="" className="object-cover" />}
              </div>
              <div>
                <Typography variant="h3" className="group-hover:text-rose-500">
                  {gem.artist.name}
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  {new Date(gem.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </Link>
          </div>

          {/* Stats Card */}
          <div className="p-6 space-y-4 bg-white rounded-2xl shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
            <Typography variant="h3">Engagement</Typography>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={cn('flex flex-col items-center p-4 rounded-xl transition-colors', 'hover:bg-rose-50 dark:hover:bg-rose-500/10')}
                aria-label={`Like this gem (${gem.likes} likes)`}
              >
                <Icons.Heart className="mb-2 w-6 h-6 text-rose-500" />
                <Typography variant="h4">{gem.likes}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Likes
                </Typography>
              </button>
              <button
                className={cn('flex flex-col items-center p-4 rounded-xl transition-colors', 'hover:bg-rose-50 dark:hover:bg-rose-500/10')}
                aria-label={`Save this gem (${gem.saves} saves)`}
              >
                <Icons.Bookmark className="mb-2 w-6 h-6 text-rose-500" />
                <Typography variant="h4">{gem.saves}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Saves
                </Typography>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
