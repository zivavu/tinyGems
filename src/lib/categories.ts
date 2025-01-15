import { Icons } from '@/components/Icons';
import type { LucideIcon } from 'lucide-react';
import { z } from 'zod';

// Type for a category
export type Category = {
	icon: LucideIcon;
	title: string;
	description: string;
	slug: string;
};

// Zod schema for category validation
export const categorySchema = z.object({
	title: z.string().min(1).max(50),
	description: z.string().min(1).max(200),
	slug: z.string().min(1).max(50),
});

// Mock categories data
export const categories: Category[] = [
	{
		icon: Icons.music,
		title: 'Music',
		description: 'Discover hidden musical gems from underground artists',
		slug: 'music',
	},
	{
		icon: Icons.art,
		title: 'Drawings',
		description: 'Explore unique sketches and illustrations',
		slug: 'drawings',
	},
	{
		icon: Icons.anvil,
		title: 'Crafts',
		description: 'Find one-of-a-kind handmade treasures',
		slug: 'handcraft',
	},
	{
		icon: Icons.camera,
		title: 'Photography',
		description: 'Experience moments captured by passionate photographers',
		slug: 'photography',
	},
	{
		icon: Icons.pen,
		title: 'Writing',
		description: 'Read short stories and poetry from rising writers',
		slug: 'writing',
	},
	{
		icon: Icons.film,
		title: 'Animation',
		description: 'Watch creative short animations and motion art',
		slug: 'animation',
	},
	{
		icon: Icons.gamepad,
		title: 'Indie Games',
		description: 'Play unique games from solo developers and small teams',
		slug: 'indie-games',
	},
	{
		icon: Icons.code,
		title: 'Digital Art',
		description: 'Explore generative art and digital creations',
		slug: 'digital-art',
	},
	{
		icon: Icons.film,
		title: 'Movies',
		description: 'Watch independent films and creative storytelling',
		slug: 'short-films',
	},
	{
		icon: Icons.mic,
		title: 'Podcasts',
		description: 'Listen to unique voices and independent shows',
		slug: 'podcasts',
	},
];
