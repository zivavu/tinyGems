import { BackgroundParticles } from '@/features/shared/components/BackgroundParticles';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import NextLink from 'next/link';

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-rose-50 dark:bg-gray-950">
      <BackgroundParticles />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Typography
            variant="h2"
            className="mb-8 flex flex-col space-y-4 items-center justify-center gap-2 text-center font-bold bg-gradient-to-r from-rose-600 to-purple-500 dark:bg-gradient-to-r dark:from-rose-600 dark:to-purple-500 bg-clip-text text-transparent"
          >
            <span>tinyGems</span>
            <span className="text-2xl md:text-4xl font-normal text-gray-700 dark:text-gray-300">Where Underground Art Shines</span>
          </Typography>

          <Typography variant="p" className="mb-12 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A sanctuary for basement dreamers, bedroom poets, and creators who craft magic in the shadows. No algorithms, no trends - just
            raw, unfiltered artistry.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NextLink
              href="/discover"
              className="px-8 py-4 flex items-center gap-2 text-lg font-medium text-white bg-rose-500 rounded-full shadow-lg transition-all hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 hover:shadow-xl hover:scale-105"
            >
              <Icons.Compass className="w-5 h-5" />
              Explore Hidden Treasures
            </NextLink>
            <NextLink
              href="/share"
              className="px-8 py-4 flex items-center gap-2 text-lg font-medium text-rose-600 bg-transparent rounded-full border-2 border-rose-300 transition-all dark:text-rose-400 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-gray-800 hover:scale-105"
            >
              <Icons.Upload className="w-5 h-5" />
              Share Your Gem
            </NextLink>
          </div>
        </div>
      </section>

      {/* Featured Artists Carousel */}
      <section className="py-16 px-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <Typography variant="h2" className="mb-12 text-3xl font-bold text-center">
            Recently Discovered Gems
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-medium">Artist Name</h3>
                  <p className="text-sm opacity-80">Experimental Folk</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Icons.Heart className="w-6 h-6 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="relative flex flex-col md:flex-row items-center gap-10 group">
            <div className="md:w-1/2">
              <div className="relative -rotate-1 transform hover:rotate-0 transition-transform">
                <div className="absolute inset-0 bg-rose-500/10 rounded-3xl transform -translate-x-4 -translate-y-4" />
                <Icons.Sparkles className="w-full h-48 text-rose-500 dark:text-rose-400 p-8 bg-rose-100 dark:bg-gray-800 rounded-3xl" />
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <Typography variant="h2" className="text-3xl font-bold">
                Raw Beauty in Imperfection
              </Typography>
              <Typography variant="p" className="text-gray-600 dark:text-gray-400 text-lg">
                We celebrate the crack in the voice, the slightly out-of-tune guitar, the handwritten lyric sheet. These are not flaws -
                they&apos;re fingerprints of authenticity.
              </Typography>
            </div>
          </div>

          {/* Add similar blocks for other philosophy points with different layouts */}
        </div>
      </section>

      {/* Interactive Manifesto */}
      <section className="py-24 px-6 bg-rose-500/5 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <Icons.ScrollText className="w-16 h-16 mx-auto mb-8 text-rose-500 dark:text-rose-400" />
          <div className="space-y-8 text-lg italic text-gray-700 dark:text-gray-300">
            <p>We believe in music that leaves fingerprints on your soul</p>
            <p>In art that values goosebumps over clickbait</p>
            <p>In creators who trade perfection for passion</p>
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 not-italic">Join the Underground Renaissance</p>
          </div>
        </div>
      </section>
    </main>
  );
}
