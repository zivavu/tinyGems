import { Icons } from '@/components/Icons';
import { categories } from '@/lib/categories';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="min-h-screen bg-rose-50 dark:bg-gray-950">
			<main className="container mx-auto my-auto px-4 pt-20 pb-32">
				<div className="mx-auto text-center">
					<div className="flex justify-center mb-6">
						<Icons.sparkles className="h-12 w-12 text-rose-500 dark:text-rose-400 animate-pulse" />
					</div>

					<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
						Where Small Art Makes a Big Impact
					</h1>

					<p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
						Share and discover tiny masterpieces from artists around the world.
					</p>

					<div className="flex gap-4 justify-center">
						<Link
							href="/explore"
							className="rounded-full px-6 py-3 bg-rose-500 text-white 
							hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 
							transition-transform hover:scale-105 shadow-sm hover:shadow-md">
							Explore Tiny Gems
						</Link>
						<Link
							href="/create"
							className="rounded-full px-6 py-3 bg-white dark:bg-gray-900 
							text-rose-500 dark:text-rose-400 border-2 border-rose-200 
							dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-gray-800 
							transition-transform hover:scale-105 duration-50 shadow-sm hover:shadow-md">
							Share What You Love
						</Link>
					</div>
				</div>

				<div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{categories.map((category) => (
						<div
							key={category.slug}
							className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center 
							hover:scale-105 shadow-sm hover:shadow-md 
							dark:shadow-rose-900/10 transition-transform duration-50">
							<category.icon className="h-8 w-8 mx-auto mb-4 text-rose-500 dark:text-rose-400" />
							<h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
								{category.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								{category.description}
							</p>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
