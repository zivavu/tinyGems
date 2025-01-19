import { Typography } from '@/components/ui/Typography';
import { dummyGems } from '@/lib/dummy/gems';
import { Icons } from '@/lib/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GemMedia } from '../../../components/pageComponents/GemMedia';
import { GemMetadata } from '../../../components/pageComponents/GemMetadata';

interface GemPageProps {
  params: Promise<{ id: string }>;
}

export default async function GemPage({ params }: GemPageProps) {
  const resolvedParams = await params;
  const gem = dummyGems.find((g) => g.id === resolvedParams.id);

  if (!gem) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b to-gray-900 from-gray-900/0 via-gray-900/60" />
        <GemMedia gem={gem} className="w-full" />

        {/* Overlay Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="px-2 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-white/10">{gem.type}</span>
                  {gem.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full text-white/80 bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <Typography variant="h1" className="text-white">
                  {gem.title}
                </Typography>
                <Link href={`/artist/${gem.artist.id}`} className="inline-flex gap-2 items-center group">
                  {gem.artist.avatar && (
                    <Image src={gem.artist.avatar} alt="" width={32} height={32} className="rounded-full ring-2 ring-white/20" />
                  )}
                  <Typography variant="h4" className="text-white/90 group-hover:text-white">
                    {gem.artist.name}
                  </Typography>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-white/10 hover:bg-white/20">
                  <Icons.Heart className="w-5 h-5" />
                  <span>{gem.likes}</span>
                </button>
                <button className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-white/10 hover:bg-white/20">
                  <Icons.Bookmark className="w-5 h-5" />
                  <span>{gem.saves}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-6 py-12 mx-auto">
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          {/* Main Content */}
          <div className="space-y-8">
            {gem.description && (
              <div className="prose prose-lg dark:prose-invert">
                <Typography variant="p" className="text-gray-600 dark:text-gray-300">
                  {gem.description}
                </Typography>
              </div>
            )}

            {/* Type-specific content will be rendered here */}
            <GemMetadata gem={gem} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Curator Info */}
            {gem.curator && (
              <div className="p-6 bg-gray-50 rounded-xl dark:bg-gray-800/50">
                <Typography variant="h4" className="mb-4">
                  Curated by
                </Typography>
                <div className="flex gap-3 items-center">
                  {gem.curator.avatar && <Image src={gem.curator.avatar} alt="" width={40} height={40} className="rounded-full" />}
                  <Typography variant="p">{gem.curator.name}</Typography>
                </div>
              </div>
            )}

            {/* Creation Info */}
            <div className="p-6 space-y-4 bg-gray-50 rounded-xl dark:bg-gray-800/50">
              <div>
                <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                  Created
                </Typography>
                <Typography variant="p">{new Date(gem.createdAt).toLocaleDateString()}</Typography>
              </div>
              {gem.artist.location && (
                <div>
                  <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                    Location
                  </Typography>
                  <Typography variant="p">{gem.artist.location}</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
