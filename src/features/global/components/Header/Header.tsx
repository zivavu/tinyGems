'use client';

import { ThemeToggle } from '@/features/global/components/ThemeToggle';
import { SettingsDrawer } from '@/features/settings/components/SettingsDrawer';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { cn } from '@/features/shared/utils/cn';
import { authClient } from '@/lib/authClient';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';

export function Header() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200 backdrop-blur-sm dark:border-amber-950 bg-white/80 dark:bg-gray-950/80">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <NextLink href="/" className="flex shrink-0 items-center justify-center gap-2" aria-label="tinyGems home">
            <Icons.Sparkles size={20} className="text-amber-500" aria-hidden="true" />
            <Typography variant="h4" className="hidden sm:block">
              tinyGems
            </Typography>
          </NextLink>

          <nav className="flex items-center gap-2">
            <NextLink
              href="/discover"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50/50 hover:bg-amber-100/80 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-all"
            >
              <Icons.Compass className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <Typography className="font-medium text-amber-900 dark:text-amber-100">Discover</Typography>
            </NextLink>

            <SearchBar />

            <NextLink
              href="/add-gem"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50/50 hover:bg-amber-100/80 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-all"
            >
              <Icons.Plus className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <Typography className="font-medium text-amber-900 dark:text-amber-100">Add</Typography>
            </NextLink>
          </nav>

          <div className="flex items-center gap-4 shrink-0 w-[140px] justify-end">
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
      </div>
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </header>
  );
}
