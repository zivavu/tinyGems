import { GemGrid } from '@/features/gems/components/GemGrid';
import { Icons } from '@/features/shared/components/Icons';
import ParticlesBackground from '@/features/shared/components/ParticlesBackground';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import NextLink from 'next/link';

export default function Home() {
  return (
    <main className="relative bg-stone-50 dark:bg-[#0a0a0a]">
      <ParticlesBackground />

      <section className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50 dark:from-black/100 dark:to-stone-950 flex items-center justify-center">
        <div className="z-10 max-w-6xl space-y-12 mx-auto flex flex-col items-center justify-center text-center">
          <div className="relative inline-block">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-rose-400 to-purple-900 blur-3xl opacity-20 rounded-full animate-pulse" />
            <Typography variant="h2" className="z-10 font-bold">
              tiny Art, for tiny People
            </Typography>
          </div>

          <Typography variant="h6">
            Welcome to <span className="text-rose-600 dark:text-rose-400">tinyGems</span>, a cozy corner of the internet, created for
            basement, <span className="text-purple-500 dark:text-purple-400">underground artists</span> that value expression, realness and
            passion - over algorithm mastering.
            <br />
          </Typography>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            <NextLink
              href="/seek?category=music"
              className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-white bg-gradient-to-br from-rose-600 to-purple-700 rounded-[2rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group"
            >
              <Icons.Compass className="w-6 h-6 animate-spin-slow group-hover:animate-none" />
              Seek for gems
            </NextLink>
            <NextLink
              href="/add-gem"
              className="px-10 py-5 flex items-center gap-3 text-xl font-bold text-stone-900 dark:text-stone-100 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border-2 border-stone-200 dark:border-stone-700 rounded-[2rem] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <Icons.Upload className="w-6 h-6" />
              Share your favorite music
            </NextLink>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-t from-rose-50 to-purple-50 dark:from-black dark:to-stone-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl shadow-lg relative group before:absolute before:-inset-2 before:bg-rose-500/10 before:rounded-3xl">
              <Icons.Users className="w-12 h-12 text-rose-600 dark:text-rose-400 mb-6" />
              <Typography variant="h3" className="text-3xl font-bold mb-4">
                No Algorithms, Just Humans
              </Typography>
              <Typography variant="p" className="text-stone-600 dark:text-stone-400">
                We&apos;ve replaced recommendation engines with real human passion. Every gem is hand-picked by our community of underground
                enthusiasts.
              </Typography>
            </div>

            <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl shadow-lg relative group before:absolute before:-inset-2 before:bg-purple-500/10 before:rounded-3xl">
              <Icons.Mic2 className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-6" />
              <Typography variant="h3" className="text-3xl font-bold mb-4">
                Amplify the Unheard
              </Typography>
              <Typography variant="p" className="text-stone-600 dark:text-stone-400">
                Our platform gives voice to artists who dare to be different. No labels, no middlemen - just pure creative expression.
              </Typography>
            </div>
          </div>

          <div className="p-8">
            <Typography variant="p" className="text-lg leading-relaxed">
              We believe in art that&apos;s raw, unfiltered, and brave enough to exist outside the mainstream. Art that screams the unspoken
              truths, that dances to the rhythm of the unheard. Art that shatters illusions and awakens the soul. Our community thrives on
              discovering and nurturing these rare flames of genius. Join us in igniting a creative rebellion!
            </Typography>
          </div>
        </div>
      </section>

      <section className="px-6 relative pb-32 bg-gradient-to-b from-rose-50/90 via-purple-50/50 to-rose-50/50 dark:from-black dark:via-stone-950/50 dark:to-black/100">
        <div className="max-w-7xl mx-auto">
          <Typography variant="h2" className="text-4xl font-bold text-center mb-12">
            Discover Newset Gems
          </Typography>
          <GemGrid gems={dummyGems.slice(0, 8)} />
        </div>
      </section>

      <section className="py-32 px-6 text-center bg-gradient-to-b from-rose-50/90 via-rose-50/50 to-rose-50/90 dark:from-black dark:via-black/50 dark:to-black/100">
        <div className="max-w-4xl mx-auto">
          <Typography variant="h2" className="text-5xl font-black  mb-8">
            Base of the Underground
          </Typography>
          <Typography variant="p" className="text-xl  mb-12">
            Take, a look, check if you like it. If you do, and would like to share with us some more, create an account, and let us see.
          </Typography>
          <NextLink
            href="/join"
            className="inline-block px-12 py-4 text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-[2rem] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            <Typography variant="h6" className="text-white">
              Show me the gems
            </Typography>
          </NextLink>
        </div>
      </section>
    </main>
  );
}
