'use client';

import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { Icons } from '@/features/shared/components/Icons';
import ParticlesBackground from '@/features/shared/components/ParticlesBackground';
import { Typography } from '@/features/shared/components/Typography';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { motion, useScroll, useTransform } from 'framer-motion';
import NextLink from 'next/link';

const sectionGradients = {
  hero: {
    light: 'bg-gradient-to-b from-rose-50 to-purple-50',
    dark: 'dark:from-black/100 dark:to-stone-950',
  },
  features: {
    light: 'bg-gradient-to-t from-rose-50 to-purple-50',
    dark: 'dark:from-black dark:to-stone-950',
  },
  gems: {
    light: 'bg-gradient-to-b from-rose-50/90 via-purple-50/50 to-rose-50/50',
    dark: 'dark:from-black dark:via-stone-950/50 dark:to-black',
  },
  cta: {
    light: 'bg-gradient-to-b from-rose-50/50 via-rose-50/50 to-rose-50/90',
    dark: 'dark:from-black dark:via-black/50 dark:to-black',
  },
};

function getSectionGradient(section: keyof typeof sectionGradients): string {
  const gradient = sectionGradients[section];
  return `${gradient.light} ${gradient.dark}`;
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const featuresY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  const gemsY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

  return (
    <main className="relative bg-stone-50 dark:bg-[#0a0a0a] overflow-x-hidden">
      <ParticlesBackground />

      <motion.section
        style={{ scale: heroScale }}
        className={`min-h-screen flex items-center justify-center ${getSectionGradient('hero')}`}
      >
        <div className="z-20 max-w-6xl px-6 space-y-12 mx-auto flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-rose-400 to-purple-900 blur-3xl opacity-20 rounded-full animate-pulse" />
            <Typography variant="h2" className="z-10 font-bold">
              tiny Art, for tiny People
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Typography variant="h6">
              Welcome to <span className="text-rose-600 dark:text-rose-400">tinyGems</span>, a cozy corner of the internet, created for
              finding basement, <span className="text-purple-500 dark:text-purple-400">underground artists</span>.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6 justify-center items-center"
          >
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
          </motion.div>
        </div>
      </motion.section>

      <motion.section style={{ y: featuresY }} className={`py-32 px-6 ${getSectionGradient('features')}`}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="z-20 space-y-12">
            {[
              {
                icon: Icons.Users,
                title: 'No Algorithms, Just Humans',
                description: "We've replaced recommendation engines with real human passion. Every gem is hand-picked by our community.",
                color: 'rose',
              },
              {
                icon: Icons.Mic2,
                title: 'Amplify the Unheard',
                description:
                  'Our platform gives voice to artists who dare to be different. No labels, no middlemen - just pure creative expression.',
                color: 'purple',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 bg-white dark:bg-stone-900 rounded-3xl shadow-lg relative group 
                  before:absolute before:-inset-2 before:bg-${feature.color}-500/10 before:rounded-3xl`}
              >
                <feature.icon className={`w-12 h-12 text-${feature.color}-600 dark:text-${feature.color}-400 mb-6`} />
                <Typography variant="h3" className="text-3xl font-bold mb-4">
                  {feature.title}
                </Typography>
                <Typography variant="p" className="text-stone-600 dark:text-stone-400">
                  {feature.description}
                </Typography>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 z-20"
          >
            <Typography variant="p" className="text-lg leading-relaxed">
              We believe in art that&apos;s raw, unfiltered, and brave enough to exist outside the mainstream. Art that screams the unspoken
              truths, that dances to the rhythm of the unheard. Art that shatters illusions and awakens the soul.
            </Typography>
          </motion.div>
        </div>
      </motion.section>

      <motion.section style={{ y: gemsY }} className={`px-6 relative pb-32 ${getSectionGradient('gems')}`}>
        <div className="max-w-7xl relative z-20 mx-auto">
          <Typography variant="h2" className="text-4xl font-bold text-center mb-12">
            Discover Newest Gems
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyGems.slice(0, 8).map((gem, index) => (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GemCard gem={gem} index={index} className="h-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`py-32 px-6 text-center ${getSectionGradient('cta')}`}
      >
        <div className="max-w-4xl relative z-20 mx-auto">
          <Typography variant="h2" className="text-5xl font-black mb-8">
            Base of the Underground
          </Typography>
          <Typography variant="p" className="text-xl mb-12">
            Take a look, check if you like it. If you do, and would like to share with us some more, create an account, and let us see.
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NextLink
              href="/seek?category=music"
              className="inline-block px-12 py-4 text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-[2rem] shadow-2xl hover:shadow-3xl transition-all"
            >
              <Typography variant="h6" className="text-white">
                Show me the gems
              </Typography>
            </NextLink>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
