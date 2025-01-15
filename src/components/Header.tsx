'use client';

import { Icons } from '@/components/Icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu as HeadlessMenu } from '@headlessui/react';
import Link from 'next/link';

export function Header() {
	// This will be replaced with real auth state later
	const isAuthenticated = false;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-rose-100 dark:border-rose-900 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2 font-medium text-gray-900">
						<Icons.sparkles className="h-5 w-5 text-rose-500" />
						<span>tinygems</span>
					</Link>

					{/* Main Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="/explore"
							className="text-gray-600 hover:text-rose-500 transition-colors">
							Explore
						</Link>
						<Link
							href="/artists"
							className="text-gray-600 hover:text-rose-500 transition-colors">
							Artists
						</Link>
						<Link
							href="/about"
							className="text-gray-600 hover:text-rose-500 transition-colors">
							About
						</Link>
					</nav>

					{/* Auth/Profile Section */}
					<div className="flex items-center gap-4">
						<ThemeToggle />
						{isAuthenticated ? (
							<HeadlessMenu as="div" className="relative">
								<HeadlessMenu.Button className="flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 hover:bg-rose-100 transition-colors">
									<Icons.user className="h-4 w-4" />
									<span>Profile</span>
								</HeadlessMenu.Button>
								<HeadlessMenu.Items className="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg border border-rose-100">
									{({ open }) => (
										<>
											<HeadlessMenu.Button
												as={Link}
												href="/dashboard"
												className={({ active }) =>
													`${
														active
															? 'bg-rose-50 text-rose-800'
															: 'text-gray-700'
													} flex items-center px-4 py-2 text-sm`
												}>
												Dashboard
											</HeadlessMenu.Button>
											<HeadlessMenu.Button
												as={Link}
												href="/settings"
												className={({ active }) =>
													`${
														active
															? 'bg-rose-50 text-rose-800'
															: 'text-gray-700'
													} flex items-center px-4 py-2 text-sm`
												}>
												Settings
											</HeadlessMenu.Button>
											<HeadlessMenu.Button
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
											</HeadlessMenu.Button>
										</>
									)}
								</HeadlessMenu.Items>
							</HeadlessMenu>
						) : (
							<>
								<Link
									href="/login"
									className="text-gray-600 hover:text-rose-500 transition-colors">
									Sign in
								</Link>
								<Link
									href="/register"
									className="rounded-full bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 transition-colors">
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button - Only shows on small screens */}
					<button className="md:hidden rounded-lg p-2 hover:bg-rose-50">
						<Icons.menu className="h-6 w-6" />
					</button>
				</div>
			</div>
		</header>
	);
}
