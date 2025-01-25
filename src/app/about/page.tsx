import { Typography } from '@/features/shared/components/Typography';

export default function AboutPage() {
  return (
    <main>
      <section className="py-24 px-72 text-white text-center bg-gray-950 space-y-4">
        <Typography variant="h2">About tinyGems</Typography>
        <Typography variant="large">
          The idea of tinyGems was born out of a love for underground music(and art in general) and the lack of good ways to discover it.
          <br></br>I know a good amount of artists who, for me, are some of the best, most real, and most meaningful ones, but I
          wouldn&apos;t have known about them if I hadn&apos;t known them personally, or just pure luck of finding them in random ways.
        </Typography>
      </section>

      <section className="mx-auto px-72 py-24 text-center space-y-4">
        <Typography variant="h2">The Mission</Typography>
        <Typography variant="large">
          The mission of tinyGems is to create an efficient way to discover those who otherwise would be hidden in the tentacles of the
          algorithm. Those who create art out of passion. Those who are trying to capture the uncapturable. And everyone who sees art as
          something more than a way to make money.
        </Typography>
      </section>

      <section className="bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-3xl font-bold mb-8 text-center">
            Why TinyGems?
          </Typography>
          <hr className="border-gray-700 border-1 my-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Discover hidden gems
              </Typography>

              <Typography variant="p">
                The music industry works. It&apos;s doing what it&apos;s supposed to do, which is to make some cash.
                <br />
                But personally, I&apos;d rather be targeted by a single artist in their basement than by some corporate marketing team.
                <br />
                <br />I find the underground scene way more authentic and real, often addressing aspects and problems of life that
                mainstream music simply chooses to ignore.
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Find the art that you acctually want
              </Typography>
              <Typography variant="p">
                I don&apos;t know why other platforms (that I know of) don&apos;t let you filter by things like artist size. Maybe it&apos;s
                about maximizing profits and keeping you fed by the algorithm, maybe they just don&apos;t care about the underground. Idc. I
                just think that it&apos;s a great way to discover music that makes you actually feel something. Give it a try and see for
                yourself.
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold mb-4">
                Share with us
              </Typography>
              <Typography variant="p">
                I know that you know the guy that knows the guy, that is doing music for past couple of years, with 0 streams, but for you
                it&apos;s the sickest shit ever. You told some of your friends about him, but they didn&apos;t seem to care as much as you
                did.
                <br />
                Well, that&apos;s just a minor sadge, but wait. Now you can change that. Go ahead, don&apos;t be selfish, and let us also
                have the pleasure.
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

          <Typography variant="large">
            I believe that all art has value, regardless of its popularity or the size of the artist&apos;s following.
            <br />
            However, I also recognize the fact, that the underground artists often struggle to get the recognition they deserve. Mainstream
            platforms tend to prioritize established acts and algorithmic recommendations, leaving little room for emerging voices to be
            discovered.
            <br />
            <br />
            By providing a space for underground artists to share their work and connect with new listeners, I hope to help level the
            playing field and give these talented creators the exposure they deserve. Whether you&apos;re an artist looking to grow your
            fanbase or a music lover in search of something fresh and genuine, tinyGems is here to celebrate the value of underground music
            and help you discover your next favorite artist.
          </Typography>
        </div>
      </section>

      <section className="py-16  bg-gray-950">
        <div className="container mx-auto px-4">
          <Typography variant="h2" className="text-3xl font-bold mb-8 text-center">
            How can you help?
          </Typography>

          <Typography variant="large">
            Well, for now, there&apos;s not much you can do besides sharing your favorite artists here.
            <br />
            If you have any suggestions regarding the website, feel free to email me at{' '}
            <a href="mailto:zivavu@gmail.com" className="text-rose-600 hover:text-rose-700 transition duration-300">
              zivavu@gmail.com
            </a>
            , or file an issue on GitHub at{' '}
            <a href="https://github.com/zivavu/tinyGems/issues" className="text-rose-600 hover:text-rose-700 transition duration-300">
              https://github.com/zivavu/tinyGems/issues
            </a>
            <br />
            <br />
            If the page gets any traffic, I plan to create a Discord server where you can become a part of the community and enrich it even
            more. <br /> But you&apos;re probably just looking at a ghost website right now. If so, but you like the idea, and would like to
            try to remake it with some better skills, promotion, etc., feel free to use as much of the code as you want, scrape it, or do
            whatever. Just let me know that it exists :3.
          </Typography>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Typography variant="h2" className="text-3xl font-bold mb-8">
              Join The Community
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
