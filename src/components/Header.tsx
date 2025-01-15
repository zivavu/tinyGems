'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Button, Menu, MenuItems } from '@headlessui/react';
import NextLink from 'next/link';
import { Link } from './ui/Link';
import { Typography } from './ui/Typography';
import { Icons } from '@/lib/Icons';

export function Header() {
	// This will be replaced with real auth state later
	const isAuthenticated = false;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-rose-100 backdrop-blur-sm dark:border-rose-900 bg-white/80 dark:bg-gray-950/80">
			<div className="container px-4 mx-auto">
				<div className="flex justify-between items-center h-16">
					<NextLink
						href="/"
						className="flex gap-2 items-center font-medium text-gray-900">
						<Icons.sparkles className="w-5 h-5 text-rose-500" />
						<Typography variant="h2">tinygems</Typography>
					</NextLink>

					{/* Main Navigation */}
					<nav className="hidden gap-6 items-center md:flex">
						<Link
							href="/explore"
							className="text-gray-600 transition-colors hover:text-rose-500">
							Explore
						</Link>
						<Link
							href="/artists"
							className="text-gray-600 transition-colors hover:text-rose-500">
							Artists
						</Link>
						<Link
							href="/about"
							className="text-gray-600 transition-colors hover:text-rose-500">
							About
						</Link>
					</nav>

					<div className="flex gap-4 items-center">
						<ThemeToggle />
						{isAuthenticated ? (
							<Menu as="div" className="relative">
								<Button className="flex gap-2 items-center px-4 py-2 bg-rose-50 rounded-full transition-colors hover:bg-rose-100">
									<Icons.user className="w-4 h-4" />
									<span>Profile</span>
								</Button>
								<MenuItems className="absolute right-0 py-2 mt-2 w-48 bg-white rounded-xl border border-rose-100 shadow-lg">
									{({ open }) => (
										<>
											<Button
												as={NextLink}
												href="/dashboard"
												className={({ active }) =>
													`${
														active
															? 'bg-rose-50 text-rose-800'
															: 'text-gray-700'
													} flex items-center px-4 py-2 text-sm`
												}>
												Dashboard
											</Button>
											<Button
												as={NextLink}
												href="/settings"
												className={({ active }) =>
													`${
														active
															? 'bg-rose-50 text-rose-800'
															: 'text-gray-700'
													} flex items-center px-4 py-2 text-sm`
												}>
												Settings
											</Button>
											<Button
												as="button"
												className={({ active }) =>
													`${
														active
															? 'bg-rose-50 text-rose-800'
															: 'text-gray-700'
													} flex w-full items-center px-4 py-2 text-sm`
												}
												onClick={() => {
													close();
													/* Add logout handler */
												}}>
												Sign out
											</Button>
										</>
									)}
								</MenuItems>
							</Menu>
						) : (
							<>
								<Link
									href="/login"
									className="text-gray-600 transition-colors hover:text-rose-500">
									Sign in
								</Link>
								<Link
									href="/register"
									className="px-4 py-2 text-white bg-rose-500 rounded-full transition-colors hover:bg-rose-600">
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button - Only shows on small screens */}
					<button className="p-2 rounded-lg md:hidden hover:bg-rose-50">
						<Icons.menu className="w-6 h-6" />
					</button>
				</div>
			</div>
		</header>
	);
}
