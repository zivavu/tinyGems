import { iconsMap } from '@/features/gems/utils/platformIconsMap';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GemPageProps {
  params: Promise<{ id: string }>;
}

export default async function GemPage({ params }: GemPageProps) {
  const resolvedParams = await params;
  const gem = dummyGems.find((g) => g.id === resolvedParams.id);

  if (!gem) {
    notFound();
  }

  const coverImage = gem.properties.media.coverImage || gem.properties.media.images?.[0];

  return (
    <main className="container px-4 py-8 mx-auto max-w-7xl flex gap-8" role="main" aria-label={`Viewing ${gem.title}`}>
      <div className="w-96 h-fit space-y-4">
        <div className="relative aspect-square rounded-2xl bg-gray-100 overflow-hidden dark:bg-gray-900">
          {coverImage ? (
            <Image fill src={coverImage} alt={`Cover art for ${gem.title}`} className="object-cover" />
          ) : (
            <Icons.Music className="w-20 h-20 text-gray-400 m-auto" />
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-rose-50 dark:bg-gray-900 dark:hover:bg-rose-900/20 transition-colors">
            <Icons.Heart className="w-5 h-5 text-rose-500" />
            <span className="font-medium">{gem.likes}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-rose-50 dark:bg-gray-900 dark:hover:bg-rose-900/20 transition-colors">
            <Icons.Bookmark className="w-5 h-5 text-rose-500" />
            <span className="font-medium">{gem.saves}</span>
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl dark:bg-gray-900">
          <Typography variant="small" className="text-gray-500 uppercase tracking-wide mb-2">
            Tags
          </Typography>
          <div className="flex flex-wrap gap-1.5">
            {gem.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded-full dark:bg-gray-800">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <Typography variant="h1" className="break-words">
            {gem.title}
          </Typography>

          <Link href={`/artist/${gem.artist.id}`} className="flex items-center gap-3 group">
            <Image src={gem.artist.avatar || ''} alt="" width={32} height={32} className="rounded-full bg-gray-200 dark:bg-gray-800" />
            <span className="text-gray-500 group-hover:text-rose-500">{gem.artist.name}</span>
          </Link>
        </div>

        <div className="space-y-6" role="region" aria-label="Music details">
          {/* Platforms with Icons */}
          <div className="flex gap-4 items-center">
            {gem.properties.platforms.map((platform) => (
              <a
                key={platform.url}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white shadow-sm rounded-xl hover:scale-105 transition-transform dark:bg-gray-800"
                aria-label={`Listen on ${platform.name}`}
              >
                <FontAwesomeIcon icon={iconsMap[platform.name]} className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-gray-50 rounded-xl dark:bg-gray-800/50">
              <Typography variant="small" className="text-gray-500 uppercase tracking-wide mb-2">
                Release Details
              </Typography>
              <div className="flex gap-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4" />
                  <span>{gem.properties.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Calendar className="w-4 h-4" />
                  <span>{new Date(gem.properties.releaseDate).toDateString()}</span>
                </div>
              </div>
            </div>

            {[
              {
                title: 'Genre',
                items: gem.properties.genre,
                colorClass: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300',
              },
              {
                title: 'Mood',
                items: gem.properties.mood,
                colorClass: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300',
              },
              {
                title: 'Language',
                items: gem.properties.language,
                colorClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300',
              },
              {
                title: 'Lyrics',
                items: gem.properties.lyricsTopic,
                colorClass: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-300',
              },
            ].map((section) =>
              section.items?.length ? (
                <div key={section.title} className="p-4 bg-gray-50 rounded-xl dark:bg-gray-800/50">
                  <Typography variant="small" className="text-gray-500 uppercase tracking-wide mb-2">
                    {section.title}
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span key={item} className={`px-3 py-1 text-sm rounded-full ${section.colorClass}`}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
