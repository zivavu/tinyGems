import { GemGrid } from '@/components/gems/GemGrid';
import { Typography } from '@/components/ui/Typography';
import { dummyArtists } from '@/lib/dummy/artists';
import { dummyGems } from '@/lib/dummy/gems';
import { cn } from '@/lib/utils';
import { faBandcamp, faInstagram, faSoundcloud, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArtistPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const resolvedParams = await params;
  const artist = dummyArtists.find((a) => a.id === resolvedParams.id);

  if (!artist) {
    notFound();
  }

  const artistGems = dummyGems.filter((gem) => gem.artist.name === artist.name);

  const socialLinks = [
    { url: artist.links.website, icon: faGlobe, label: 'Website' },
    { url: artist.links.bandcamp, icon: faBandcamp, label: 'Bandcamp' },
    { url: artist.links.soundcloud, icon: faSoundcloud, label: 'SoundCloud' },
    { url: artist.links.spotify, icon: faSpotify, label: 'Spotify' },
    { url: artist.links.youtube, icon: faYoutube, label: 'YouTube' },
    { url: artist.links.instagram, icon: faInstagram, label: 'Instagram' },
    { url: artist.links.twitter, icon: faTwitter, label: 'Twitter' },
  ].filter((link) => link.url);

  return (
    <main className="min-h-screen">
      {/* Banner */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
        {artist.banner && <Image src={artist.banner} alt="" fill className="object-cover" />}
      </div>

      <div className="container px-4 mx-auto">
        {/* Profile Section */}
        <div className="flex relative gap-6 -mt-12 mb-8">
          <div className="overflow-hidden relative flex-shrink-0 w-24 h-24 bg-white rounded-full border-4 border-white dark:border-gray-900">
            {artist.avatar ? (
              <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-rose-100 dark:bg-rose-900">
                <Typography variant="h2">{artist.name[0]}</Typography>
              </div>
            )}
          </div>

          <div className="flex-1 pt-12">
            <Typography variant="h1" className="mb-1">
              {artist.name}
            </Typography>
            {artist.location && <Typography variant="muted">{artist.location}</Typography>}
          </div>
        </div>

        {/* Stats & Social Links */}
        <div className="grid gap-6 mb-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            {artist.bio && <Typography variant="p">{artist.bio}</Typography>}

            <div className="flex gap-6">
              <div>
                <Typography variant="h4">{artist.stats.gems}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Gems
                </Typography>
              </div>
              <div>
                <Typography variant="h4">{artist.stats.followers}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Followers
                </Typography>
              </div>
              <div>
                <Typography variant="h4">{artist.stats.following}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Following
                </Typography>
              </div>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('p-2 rounded-lg transition-colors', 'hover:bg-rose-100 dark:hover:bg-rose-900/30')}
                >
                  <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Artist's Gems */}
        <div className="space-y-6">
          <Typography variant="h2">Gems</Typography>
          <GemGrid gems={artistGems} />
        </div>
      </div>
    </main>
  );
}
