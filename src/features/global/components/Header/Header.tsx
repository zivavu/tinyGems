'use client';

import { ThemeToggle } from '@/features/global/components/ThemeToggle';
import { SettingsDrawer } from '@/features/settings/components/SettingsDrawer';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/utils';
import { authClient } from '@/lib/authClient';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const { data } = authClient.useSession();
  const user = data?.user;

  const navigationItems = [
    { href: '/seek?category=music', label: 'Seek', icon: Icons.Search },
    { href: '/add-gem', label: 'Add', icon: Icons.Plus },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-amber-200 backdrop-blur-sm dark:border-amber-950 bg-white/80 dark:bg-gray-950/80">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            <NextLink
              href="/"
              className={cn('flex shrink-0 items-center justify-center gap-2 transition-all w-[140px]', isSearchExpanded && 'md:opacity-0')}
              aria-label="tinyGems home"
            >
              <Icons.Sparkles size={20} className="text-amber-500" aria-hidden="true" />
              <Typography variant="h4" className="hidden sm:block">
                tinyGems
              </Typography>
            </NextLink>

            <div className="flex flex-1 items-center justify-center gap-8">
              {!isSearchExpanded && (
                <nav className="hidden md:flex md:gap-2">
                  {navigationItems.map((item) => (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50/50 hover:bg-amber-100/80 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-all"
                    >
                      <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <Typography className="font-medium text-amber-900 dark:text-amber-100">{item.label}</Typography>
                    </NextLink>
                  ))}
                </nav>
              )}

              <div
                className={cn(
                  'hidden md:flex transition-all duration-200 ease-in-out max-w-2xl',
                  isSearchExpanded ? 'w-full' : 'w-0 overflow-hidden',
                )}
              >
                <SearchBar />
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-[140px] justify-end">
              <Button
                variant="ghost"
                className="rounded-lg p-2 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                aria-label="Toggle search"
              >
                {isSearchExpanded ? <Icons.X className="h-5 w-5" /> : <Icons.Search className="h-5 w-5" />}
              </Button>
              <ThemeToggle />

              {user ? (
                <Menu as="div" className="relative ">
                  <MenuButton className="flex items-center gap-2 rounded-full transition-colors hover:ring-2 hover:ring-amber-200 dark:hover:ring-amber-800">
                    {user.image ? (
                      <Image
                        width={50}
                        height={50}
                        src={user.image}
                        alt={user.name ?? 'Profile picture'}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                        <Typography variant="small" className="font-medium text-amber-700 dark:text-amber-300">
                          {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? '?'}
                        </Typography>
                      </div>
                    )}
                  </MenuButton>

                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <MenuItems className="absolute right-0 mt-2 w-48 rounded-xl border border-amber-100 bg-white py-2 shadow-lg dark:border-amber-900 dark:bg-gray-900">
                      <MenuItem as="div">
                        {({ focus }) => (
                          <NextLink
                            href="/user-library"
                            className={cn(
                              'flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors',
                              focus && 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
                            )}
                          >
                            <Icons.Library className="h-4 w-4" />
                            Library
                          </NextLink>
                        )}
                      </MenuItem>
                      <MenuItem as="div">
                        {({ focus }) => (
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start px-4 py-2 rounded-none text-sm',
                              focus && 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
                            )}
                            onClick={() => setIsSettingsOpen(true)}
                          >
                            <Icons.Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        )}
                      </MenuItem>
                      <div className="my-2 border-t border-amber-100 dark:border-amber-900" />
                      <MenuItem as="div">
                        {({ focus }) => (
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start px-4 py-2 rounded-none text-sm',
                              focus && 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
                            )}
                            onClick={() => {
                              authClient.signOut();
                            }}
                          >
                            <Icons.LogOut className="h-4 w-4 mr-2" />
                            Sign out
                          </Button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <div className="hidden sm:flex sm:items-center sm:gap-4">
                  <NextLink href="/auth" className="text-gray-700 hover:text-amber-500 transition-colors dark:text-gray-200">
                    <Typography variant="small">Sign in</Typography>
                  </NextLink>
                </div>
              )}
            </div>
          </div>

          <Transition
            show={isMobileMenuOpen}
            enter="transition duration-200 ease-out"
            enterFrom="transform -translate-y-full opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-full opacity-0"
          >
            <div className="border-t border-amber-100 bg-white p-4 dark:border-amber-900 dark:bg-gray-900 md:hidden">
              <SearchBar />
              <nav className="mt-4 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg bg-amber-50/50 px-4 py-3 hover:bg-amber-100/80 dark:bg-amber-900/20 dark:hover:bg-amber-900/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <Typography className="font-medium text-amber-900 dark:text-amber-100">{item.label}</Typography>
                  </NextLink>
                ))}
              </nav>
            </div>
          </Transition>
        </div>
      </header>

      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
