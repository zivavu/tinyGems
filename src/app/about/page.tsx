import { Typography } from '@/features/shared/components/Typography';

export default function AboutPage() {
  return (
    <main>
      <section className="relative bg-gray-950">
        <div className="relative container mx-auto px-4 py-24 text-white text-center">
          <Typography variant="h1" className="text-5xl font-bold mb-4">
            About TinyGems
          </Typography>
          <Typography variant="p" className="text-xl">
            Discover and share the hidden gems of the music world
          </Typography>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Typography variant="h2" className="text-3xl font-bold mb-4">
              Our Mission
            </Typography>
            <Typography variant="p" className="text-lg mb-8">
              TinyGems is a passion project created by a solo developer who loves underground musicians. The mission of TinyGems is to
              provide a platform for music enthusiasts to discover and share their favorite hidden gems in the music world.
            </Typography>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-3xl font-bold mb-8 text-center">
            Why TinyGems?
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Discover Hidden Talents
              </Typography>
              <Typography variant="p" className="text-lg">
                TinyGems makes it easy to find and explore underground artists from various genres and locations.
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Support Independent Artists
              </Typography>
              <Typography variant="p" className="text-lg">
                By sharing and promoting underground musicians, you can help them gain recognition and grow their fanbase.
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Connect with Music Lovers
              </Typography>
              <Typography variant="p" className="text-lg">
                TinyGems fosters a community of passionate music enthusiasts who share a love for discovering new artists.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-3xl font-bold mb-8 text-center">
            The Value of Underground Music
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Typography variant="p" className="text-lg mb-8">
                Underground musicians are the lifeblood of the music industry. They bring fresh perspectives, push creative boundaries, and
                create music that resonates with their audience on a deep level.
              </Typography>
              <Typography variant="p" className="text-lg">
                By supporting these artists, we contribute to a more diverse and vibrant music scene. TinyGems aims to give these talented
                individuals the exposure they deserve and help them build a sustainable career in music.
              </Typography>
            </div>
            <div>{/* Add an image or illustration */}</div>
          </div>
        </div>
      </section>

      <section className="bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-3xl font-bold mb-8 text-center">
            Our Journey
          </Typography>
          <div className="text-center">
            <Typography variant="p" className="text-lg mb-8">
              TinyGems started as a personal project born out of my love for underground music. As a solo developer and music enthusiast, I
              wanted to create a platform that would make it easier for people to discover and support independent artists.
            </Typography>
            <Typography variant="p" className="text-lg">
              Over time, TinyGems has grown into a vibrant community of music lovers who share the same passion. We&apos;ve been able to
              showcase countless talented artists and help them connect with new fans from around the world.
            </Typography>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Typography variant="h2" className="text-3xl font-bold mb-8">
              Join Our Community
            </Typography>
            <a
              href="/signup"
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-rose-700 transition duration-300"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
