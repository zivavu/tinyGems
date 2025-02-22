'use client';

import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { PlatformType } from '@/features/gems/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';

const ParticlesBackground = dynamic(() => import('@/features/shared/components/ParticlesBackground'), { ssr: false });

export default function Home() {
  const platforms: { platformName: PlatformType; label: string }[] = [
    { platformName: 'spotify', label: 'Spotify' },
    { platformName: 'soundcloud', label: 'SoundCloud' },
    { platformName: 'bandcamp', label: 'Bandcamp' },
    { platformName: 'youtube', label: 'YouTube' },
    { platformName: 'appleMusic', label: 'Apple Music' },
    { platformName: 'other', label: 'More Soon' },
  ] as const;
  return (
    <main className="relative bg-gradient-to-b from-indigo-50 via-violet-50 to-indigo-50 dark:from-black dark:via-slate-950 dark:to-black">
      <ParticlesBackground />

      <div className="z-10 relative">
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-6xl px-6 space-y-12 mx-auto flex flex-col items-center justify-center text-center">
            <div className="relative inline-block">
              <div className="absolute z-10 inset-0 bg-gradient-to-r from-amber-400 to-purple-900 blur-3xl opacity-30 rounded-full animate-pulse" />
              <Typography variant="h2" className="z-20 font-black">
                tiny Art, for tiny People
              </Typography>
            </div>

            <Typography variant="h6" className="text-stone-800 dark:text-stone-300">
              Welcome to <span className="text-amber-700 dark:text-amber-400">tinyGems</span>, a cozy corner of the internet, created for
              finding and sharing your favourite <span className="text-purple-700 dark:text-purple-400">underground artists</span>.
            </Typography>

            <div className="flex flex-wrap gap-6 justify-center items-center">
              <NextLink
                href="/discover?category=music"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-white bg-gradient-to-br from-amber-600 to-purple-700 rounded-[2rem] shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group"
              >
                <Icons.Compass className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700" />
                Seek for gems
              </NextLink>

              <NextLink
                href="/add-gem"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-stone-900 dark:text-stone-100 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border-2 border-stone-200 dark:border-stone-700 rounded-[2rem] shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Icons.Upload className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-[-4px]" />
                Share your favorite music
              </NextLink>
            </div>
          </div>
        </section>

        <div className="flex flex-col [&>section]:py-30">
          <section className="px-6">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {[
                  {
                    icon: Icons.Users,
                    title: 'No Algorithms, Just Humans',
                    description:
                      "We've replaced recommendation engines with real human passion. Every gem is hand-picked by our community.",
                    gradient: 'from-amber-500/20 to-amber-600/10',
                    iconColor: 'text-amber-500',
                    tags: ['<1k followers', 'DIY production', 'Local scenes'],
                  },
                  {
                    icon: Icons.Mic2,
                    title: 'Amplify the Unheard',
                    description:
                      'Our platform gives voice to artists who dare to be different. No labels, no middlemen - just pure creative expression.',
                    gradient: 'from-purple-500/20 to-purple-600/10',
                    iconColor: 'text-purple-500',
                    tags: ['MathHop', 'FolkNoise', 'LofiCrust'],
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className={cn(
                      'p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]',
                      `bg-gradient-to-br ${feature.gradient}`,
                    )}
                  >
                    <feature.icon className={cn('w-12 h-12 mb-6', feature.iconColor)} />
                    <Typography variant="h3" className="text-3xl font-bold mb-4">
                      {feature.title}
                    </Typography>
                    <Typography variant="p" className="mb-6">
                      {feature.description}
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <div
                          key={tag}
                          className="px-3 py-1 bg-white/20 dark:bg-black/20 rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                        >
                          <Typography variant="small">{tag}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Icons.Compass,
                    title: 'Hunt Your Way',
                    description: 'Filter by audience size, release era, and sonic weirdness level',
                    gradient: 'from-rose-500/20 to-rose-600/10',
                    iconColor: 'text-rose-500',
                    step: '01',
                  },
                  {
                    icon: Icons.Radio,
                    title: 'Listen Raw',
                    description: 'Get matched with artists who actually need your ears',
                    gradient: 'from-blue-500/20 to-blue-600/10',
                    iconColor: 'text-blue-500',
                    step: '02',
                  },
                  {
                    icon: Icons.Share2,
                    title: 'Share Gems',
                    description: 'Build playlists and share directly with your friends',
                    gradient: 'from-green-500/20 to-green-600/10',
                    iconColor: 'text-green-500',
                    step: '03',
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className={cn(
                      'p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] relative overflow-hidden',
                      `bg-gradient-to-br ${step.gradient}`,
                    )}
                  >
                    <div className="absolute top-3 right-3 opacity-10 text-4xl font-black">{step.step}</div>
                    <step.icon className={cn('w-8 h-8 mb-4', step.iconColor)} />
                    <Typography variant="h4" className="mb-2">
                      {step.title}
                    </Typography>
                    <Typography variant="small" className="text-stone-600 dark:text-stone-300">
                      {step.description}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.label}
                    className="p-4 flex flex-col items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <FontAwesomeIcon
                      icon={platformIconsMap[platform.platformName]}
                      className="w-6 h-6 text-stone-600 dark:text-stone-400"
                    />
                    <Typography variant="small" className="text-center">
                      {platform.label}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6">
            <div className="max-w-7xl mx-auto">
              <Typography variant="h2" className="text-4xl font-bold text-center mb-12">
                Discover Newest Gems
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dummyGems.slice(0, 8).map((gem, index) => (
                  <GemCard key={gem.id} gem={gem} index={index} className="h-full" />
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 !pb-54 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <Typography variant="h2" className="mb-2">
                Base of the Underground
              </Typography>
              <Typography variant="h6" className="mb-12">
                Take a look, check if you like it. If you do, and would like to share with us some more, create an account, and let us see.
              </Typography>
              <NextLink
                href="/discover?category=music"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-white bg-gradient-to-br from-amber-600 to-purple-700 rounded-[2rem] shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group"
              >
                <Icons.Compass className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700" />
                Seek for gems
              </NextLink>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
