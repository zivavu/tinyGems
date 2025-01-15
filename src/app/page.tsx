import { Typography } from '@/components/ui/Typography';
import { categories } from '@/lib/categories';
import { Icons } from '@/lib/Icons';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="min-h-screen bg-rose-50 dark:bg-gray-950">
			<main className="container px-8 pt-20 pb-32 mx-auto my-auto">
				<div className="mx-auto text-center">
					<div className="flex justify-center mb-6">
						<Icons.sparkles className="w-12 h-12 text-rose-500 animate-pulse dark:text-rose-400" />
					</div>

					<Typography variant="h1" className="mb-6">
						tiny Art, For tiny People
					</Typography>

					<Typography variant="p" className="px-28 mb-8 text-lg">
						Welcome to tinyGems, a cozy corner of the internet created for
						basement, underground artists that value expression and passion over
						money.
						<br />
						It's hard to find You, but the things You create are one of the most
						precious gems in this tiny world.
					</Typography>

					<div className="flex gap-4 justify-center">
						<Link
							href="/explore"
							className="px-6 py-3 text-white bg-rose-500 rounded-full shadow-sm transition-transform hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500 hover:scale-105 hover:shadow-md">
							Seek For tinyGems
						</Link>
						<Link
							href="/create"
							className="px-6 py-3 text-rose-500 bg-white rounded-full border-2 border-rose-200 shadow-sm transition-transform dark:bg-gray-900 dark:text-rose-400 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-gray-800 hover:scale-105 duration-50 hover:shadow-md">
							Share Your Favorite Art
						</Link>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 mx-auto mt-16 max-w-6xl lg:grid-cols-3 md:grid-cols-2">
					{categories.map((category) => (
						<div
							key={category.slug}
							className="p-6 text-center bg-white rounded-2xl shadow-sm transition-all dark:bg-gray-900 hover:scale-105 hover:shadow-md dark:shadow-rose-900/10 duration-50">
							<category.icon className="mx-auto mb-4 w-8 h-8 text-rose-500 dark:text-rose-400" />
							<Typography variant="h3" className="mb-2">
								{category.title}
							</Typography>
							<Typography variant="small">{category.description}</Typography>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
