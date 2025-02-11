'use client';

import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';

const ParticlesBackground = dynamic(() => import('@/features/shared/components/ParticlesBackground'), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-gradient-to-b from-indigo-50 via-violet-50 to-indigo-50 dark:from-black dark:via-slate-950 dark:to-black">
      <ParticlesBackground />

      <div className="z-10 relative">
        <section className={`min-h-screen flex items-center justify-center`}>
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
                href="/seek?category=music"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-white bg-gradient-to-br from-amber-600 to-purple-700 
                  rounded-[2rem] shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group"
              >
                <Icons.Compass className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700" />
                Seek for gems
              </NextLink>

              <NextLink
                href="/add-gem"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-stone-900 dark:text-stone-100 bg-white/90 
                  dark:bg-stone-800/90 backdrop-blur-md border-2 border-stone-200 dark:border-stone-700 rounded-[2rem] shadow-lg 
                  transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <Icons.Upload className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-[-4px]" />
                Share your favorite music
              </NextLink>
            </div>
          </div>
        </section>

        <div className="flex flex-col [&>section]:py-30">
          <section className={`px-6`}>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              {[
                {
                  icon: Icons.Users,
                  title: 'No Algorithms, Just Humans',
                  description: "We've replaced recommendation engines with real human passion. Every gem is hand-picked by our community.",
                  gradient: 'from-amber-500/20 to-amber-600/10',
                  iconColor: 'text-amber-500',
                },
                {
                  icon: Icons.Mic2,
                  title: 'Amplify the Unheard',
                  description:
                    'Our platform gives voice to artists who dare to be different. No labels, no middlemen - just pure creative expression.',
                  gradient: 'from-purple-500/20 to-purple-600/10',
                  iconColor: 'text-purple-500',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} backdrop-blur-xl 
                  border border-white/10 shadow-xl transition-all`}
                >
                  <feature.icon className={`w-12 h-12 ${feature.iconColor} mb-6`} />
                  <Typography variant="h3" className="text-3xl font-bold mb-4">
                    {feature.title}
                  </Typography>
                  <Typography variant="p">{feature.description}</Typography>
                </div>
              ))}
            </div>
          </section>

          <section className={`px-6`}>
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

          <section className={`px-6 !pb-54 text-center`}>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <Typography variant="h2" className="mb-2">
                Base of the Underground
              </Typography>
              <Typography variant="h6" className="mb-12">
                Take a look, check if you like it. If you do, and would like to share with us some more, create an account, and let us see.
              </Typography>
              <NextLink
                href="/seek?category=music"
                className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-white bg-gradient-to-br from-amber-600 to-purple-700 
                  rounded-[2rem] shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group"
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
