import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import NextLink from 'next/link';

export default function AddPage() {
  const addOptions = [
    {
      title: 'Artist',
      description: 'Share an underground artist with the community',
      icon: Icons.Mic2,
      href: '/add/artist',
      gradient: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Album',
      description: 'Add a full album from your favorite underground artist',
      icon: Icons.Album,
      href: '/add/album',
      gradient: 'from-amber-500/20 to-amber-600/10',
      iconColor: 'text-amber-500',
    },
    {
      title: 'Single',
      description: 'Share a single track that deserves more attention',
      icon: Icons.Music,
      href: '/add/single',
      gradient: 'from-rose-500/20 to-rose-600/10',
      iconColor: 'text-rose-500',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Typography variant="h2">Add to tinyGems</Typography>
          <Typography variant="muted">Share your favorite underground music with the community</Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOptions.map((option) => (
            <NextLink
              key={option.title}
              href={option.href}
              className={`p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] relative overflow-hidden bg-gradient-to-br ${option.gradient}`}
            >
              <option.icon className={`w-10 h-10 mb-4 ${option.iconColor}`} />
              <Typography variant="h4" className="mb-2">
                {option.title}
              </Typography>
              <Typography variant="small" className="text-stone-600 dark:text-stone-300">
                {option.description}
              </Typography>
            </NextLink>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <NextLink
            href="/discover"
            className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            <Typography variant="small">Back to discover</Typography>
          </NextLink>
        </div>
      </div>
    </main>
  );
}
