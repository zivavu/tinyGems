'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { HEADER_HEIGHT } from '@/consts';
import { Icons } from '@/features/shared/components/Icons';
import { Button, Menu, MenuItems } from '@headlessui/react';
import NextLink from 'next/link';

import { Typography } from '../features/shared/components/Typography';

export function Header() {
  // This will be replaced with real auth state later
  const isAuthenticated = false;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-rose-100 backdrop-blur-sm h-${HEADER_HEIGHT} dark:border-rose-900 bg-white/80 dark:bg-gray-950/80`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center h-16">
          <NextLink href="/" className="flex gap-2 items-center" aria-label="tinyGems home">
            <Icons.Sparkles className="w-5 h-5 text-rose-500" aria-hidden="true" />
            <Typography variant="h2" className="hidden content-center sm:block">
              tinyGems
            </Typography>
          </NextLink>

          <div className="flex gap-4 items-center">
            <ThemeToggle />
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Button
                  className="flex gap-2 items-center px-4 py-2 bg-rose-50 rounded-full transition-colors hover:bg-rose-100"
                  aria-label="Open profile menu"
                >
                  <Icons.User className="w-4 h-4" aria-hidden="true" />
                  <Typography variant="p">Profile</Typography>
                </Button>
                <MenuItems
                  className="absolute right-0 py-2 mt-2 w-48 bg-white rounded-xl border border-rose-100 shadow-lg"
                  aria-label="Profile menu"
                >
                  {() => (
                    <>
                      <Button
                        as={NextLink}
                        href="/dashboard"
                        className={({ active }) =>
                          `${active ? 'bg-rose-50 text-rose-800' : 'text-gray-700'} flex items-center px-4 py-2 text-sm`
                        }
                        aria-label="Go to dashboard"
                      >
                        Dashboard
                      </Button>
                      <Button
                        as={NextLink}
                        href="/settings"
                        className={({ active }) =>
                          `${active ? 'bg-rose-50 text-rose-800' : 'text-gray-700'} flex items-center px-4 py-2 text-sm`
                        }
                        aria-label="Go to settings"
                      >
                        Settings
                      </Button>
                      <Button
                        as="button"
                        className={({ active }) =>
                          `${active ? 'bg-rose-50 text-rose-800' : 'text-gray-700'} flex w-full items-center px-4 py-2 text-sm`
                        }
                        onClick={() => {
                          /* Add logout handler */
                        }}
                        aria-label="Sign out"
                      >
                        Sign out
                      </Button>
                    </>
                  )}
                </MenuItems>
              </Menu>
            ) : (
              <>
                <Typography variant="p" className="transition-colors hover:text-rose-500" aria-label="Sign in to your account">
                  Sign in
                </Typography>
                <Typography
                  variant="p"
                  className="px-4 py-2 text-white bg-rose-500 rounded-full transition-colors hover:bg-rose-600"
                  aria-label="Create a new account"
                >
                  Get Started
                </Typography>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Only shows on small screens */}
          <button className="p-2 rounded-lg md:hidden hover:bg-rose-50" aria-label="Toggle mobile menu" aria-expanded="false">
            <Icons.Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
