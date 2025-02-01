import { GemGrid } from '@/features/gems/components/GemGrid';
import { Typography } from '@/features/shared/components/Typography';
import { dummyArtists } from '@/features/shared/utils/dummy/artists';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { cn } from '@/features/shared/utils/dummy/utils';
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
    <main className="min-h-screen" role="main" aria-label={`Artist profile: ${artist.name}`}>
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800" aria-label="Artist banner">
        {artist.banner && <Image src={artist.banner} alt="" role="presentation" fill className="object-cover" />}
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex relative gap-6 -mt-12 mb-8">
          <div
            className="overflow-hidden relative flex-shrink-0 w-24 h-24 bg-white rounded-full border-4 border-white dark:border-gray-900"
            aria-label="Artist avatar"
          >
            {artist.avatar ? (
              <Image src={artist.avatar} alt={`${artist.name}'s profile picture`} fill className="object-cover" />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-rose-100 dark:bg-rose-900" aria-hidden="true">
                <Typography variant="h2">{artist.name[0]}</Typography>
              </div>
            )}
          </div>

          <div className="flex-1 pt-12">
            <Typography variant="h1" className="mb-1">
              {artist.name}
            </Typography>
            {artist.location && (
              <Typography variant="muted" aria-label="Artist location">
                {artist.location.country} {artist.location.city ? `, ${artist.location.city}` : ''}
              </Typography>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="flex gap-6" aria-label="Artist statistics">
              <div>
                <Typography variant="h4">{artist.stats.followers}</Typography>
                <Typography variant="small" className="text-gray-500">
                  Followers
                </Typography>
              </div>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2" role="list" aria-label="Social media links">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('p-2 rounded-lg transition-colors', 'hover:bg-rose-100 dark:hover:bg-rose-900/30')}
                  aria-label={`Visit ${artist.name}'s ${link.label}`}
                >
                  <FontAwesomeIcon icon={link.icon} className="w-5 h-5" aria-hidden="true" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Typography variant="h2">Gems</Typography>
          <section aria-label={`${artist.name}'s gems`}>
            <GemGrid gems={artistGems} />
          </section>
        </div>
      </div>
    </main>
  );
}
