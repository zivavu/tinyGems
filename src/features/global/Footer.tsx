'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Link } from '../shared/components/Link';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-rose-100 dark:bg-gray-950 dark:border-rose-950">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Icons.Sparkles className="w-5 h-5 text-rose-500" />
              <Typography variant="h3">tinyGems</Typography>
            </div>
            <Typography variant="muted">A cozy corner of the internet for artists to share their creations.</Typography>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <Typography variant="h4">Resources</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/about" variant="muted">
                About Us
              </Link>
              <Link href="/blog" variant="muted">
                Blog
              </Link>
              <Link href="/contact" variant="muted">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <Typography variant="h4">Legal</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" variant="muted">
                Privacy Policy
              </Link>
              <Link href="/terms" variant="muted">
                Terms of Service
              </Link>
              <Link href="/cookies" variant="muted">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <Typography variant="h4">Community</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/guidelines" variant="muted">
                Guidelines
              </Link>
              <Link href="/help" variant="muted">
                Help Center
              </Link>
              <Link href="/feedback" variant="muted">
                Feedback
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between items-center pt-8 mt-8 border-t border-rose-100 dark:border-rose-950 md:flex-row">
          <Typography variant="muted">© {new Date().getFullYear()} tinyGems. No rights reserved.</Typography>
          <div className="flex gap-6">
            <Link href="https://github.com">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
