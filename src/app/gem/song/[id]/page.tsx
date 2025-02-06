import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { IconName, Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
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

  const coverImage = gem.properties.media.coverImage;

  const sectionsArr: {
    title: string;
    items?: string[];
    icon: IconName;
    colorClass: string;
  }[] = [
    {
      title: 'Genre',
      items: gem.properties.genres,
      icon: 'Music',
      colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    },
    {
      title: 'Mood',
      items: gem.properties.moods,
      icon: 'Smile',
      colorClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
      title: 'Language',
      items: gem.properties.languages,
      icon: 'Globe',
      colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    {
      title: 'Lyrics Themes',
      items: gem.properties.lyricsTopics,
      icon: 'ScrollText',
      colorClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    },
  ];
  return (
    <main className="container px-4 py-8 mx-auto max-w-7xl flex gap-8 lg:flex-row flex-col" role="main" aria-label={`Viewing ${gem.title}`}>
      <div className="w-[30rem] h-fit space-y-4">
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
            <span className="font-medium">{gem.stats.likes}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-white rounded-xl hover:bg-rose-50 dark:bg-gray-900 dark:hover:bg-rose-900/20 transition-colors">
            <Icons.Bookmark className="w-5 h-5 text-rose-500" />
            <span className="font-medium">{gem.stats.saves}</span>
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl dark:bg-gray-900">
          <Typography variant="small" className="text-gray-500 uppercase tracking-wide mb-2">
            Tags
          </Typography>
          {Array.isArray(gem?.tags) && gem?.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {gem.tags?.map((tag) => (
                <span key={tag} className="px-2 py-1 text-sm bg-gray-100 rounded-full dark:bg-gray-800">
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>
        {gem.properties.lyrics && (
          <div className="p-6 bg-white rounded-xl dark:bg-gray-900">
            <Disclosure defaultOpen={false}>
              <DisclosureButton className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.ScrollText className="w-5 h-5" />
                  <Typography variant="h3" className="text-lg font-semibold">
                    Lyrics
                  </Typography>
                </div>
                <Icons.ChevronDown className="w-5 h-5 transition-transform ui-open:transform ui-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-4">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">{gem.properties.lyrics}</pre>
              </DisclosurePanel>
            </Disclosure>
          </div>
        )}
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
          {/* Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {gem.properties.platforms.map((platform) => (
              <a
                key={platform.url}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all group"
                aria-label={`Listen on ${platform.name}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <FontAwesomeIcon
                    icon={platformIconsMap[platform.name]}
                    className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-rose-500 transition-colors"
                  />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm">
              <Typography variant="h3" className="text-lg font-semibold mb-4">
                Release Details
              </Typography>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3">
                  <Icons.Clock className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Duration:</span>
                  <span>{gem.properties.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icons.Calendar className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Released:</span>
                  <span>{new Date(gem.properties.releaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Genre/Mood/Language Sections */}
            {sectionsArr.map((section) =>
              section.items?.length ? (
                <div key={section.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Typography variant="h3" className="text-lg font-semibold">
                      {section.title}
                    </Typography>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span key={item} className={`px-3 py-1.5 text-sm rounded-full font-medium ${section.colorClass}`}>
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
