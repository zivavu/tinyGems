import { Typography } from '@/features/shared/components/Typography';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';

export default function ContactPage() {
  return (
    <main>
      <section className="py-24 px-4 lg:px-72 text-center bg-neutral-800 dark:bg-neutral-900 space-y-4">
        <Typography variant="h2" className="text-white">
          Get in Touch
        </Typography>
        <Typography variant="large" className="text-neutral-200">
          Have questions, suggestions, or want to contribute? I&apos;d love to hear from you! As a solo developer, I&apos;m always open to
          feedback and collaboration.
        </Typography>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          {[
            {
              href: 'mailto:zivavu@gmail.com',
              icon: faEnvelope,
              title: 'Email',
              description: (
                <>
                  Send me an email at{' '}
                  <span className="text-primary-600 group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-300 transition">
                    zivavu@gmail.com
                  </span>
                </>
              ),
              isExternal: false,
            },
            {
              icon: faGithub,
              title: 'GitHub',
              description: (
                <>
                  Take a look at the{' '}
                  <NextLink
                    href="https://github.com/zivavu/tinyGems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition"
                  >
                    project repository
                  </NextLink>{' '}
                  or{' '}
                  <NextLink
                    href="https://github.com/zivavu/tinyGems/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition"
                  >
                    create an issue
                  </NextLink>
                </>
              ),
            },
            {
              icon: faDiscord,
              title: 'Discord Community',
              description: 'Coming soon! Join our Discord server to discuss music and connect with other underground music enthusiasts.',
            },
          ].map((item, index) =>
            item.href ? (
              <NextLink
                key={index}
                href={item.href}
                className="p-6 w-full md:min-w-80 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group dark:bg-neutral-800"
                {...(item.isExternal && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <FontAwesomeIcon size="2x" icon={item.icon} className="text-primary-500 dark:text-white" />
                  <Typography variant="h3">{item.title}</Typography>
                  <Typography variant="muted">{item.description}</Typography>
                </div>
              </NextLink>
            ) : (
              <div key={index} className="p-6 w-full md:min-w-80 bg-white rounded-xl shadow-sm dark:bg-neutral-800">
                <div className="flex flex-col items-center text-center space-y-4">
                  <FontAwesomeIcon size="2x" icon={item.icon} className="text-primary-500 dark:text-white" />
                  <Typography variant="h3">{item.title}</Typography>
                  <Typography variant="muted">{item.description}</Typography>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-6xl text-center">
        <Typography variant="h3" className="mb-6">
          Want to Contribute to the repo?
        </Typography>
        <Typography variant="large">
          tinyGems is an open-source project, and contributions are always welcome! Whether you&apos;re a developer, designer, or music
          enthusiast, there are many ways to help improve the platform.
          <br />
          <br />
          You are welcome even if you would simply like to make your first contribution ever, and just edit some text, so it&apos;s fitting
          the vibe better, and make it not as AI sloppy, as it is now, cause some lazy ass person was lazy :3.
        </Typography>
      </section>
    </main>
  );
}
