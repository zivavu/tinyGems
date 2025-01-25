'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
              <Link href="/contact" variant="muted">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <Typography variant="h4">Legal</Typography>
            <div className="flex flex-col gap-2">
              <Link href="/privacy-policy" variant="muted">
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
        </div>

        <div className="flex flex-col gap-4 justify-between items-center pt-8 mt-8 border-t border-rose-100 dark:border-rose-950 md:flex-row">
          <Typography variant="muted">© {new Date().getFullYear()} tinyGems. No rights reserved.</Typography>
          <div className="flex gap-6">
            <Link href="https://github.com/zivavu/tinyGems" target="_blank">
              <FontAwesomeIcon size="2x" icon={faGithub} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
