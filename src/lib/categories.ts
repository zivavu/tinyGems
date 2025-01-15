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

export const categories: Category[] = [
	{
		icon: Icons.music,
		title: 'Music',
		description:
			'Music that makes you feel something. Made by Someone, and not a team of analysts.',
		slug: 'music',
	},
	{
		icon: Icons.art,
		title: 'Graphic art',
		description:
			'Illustrations that show the soul of the creator, visualised with every stroke.',
		slug: 'drawings',
	},
	{
		icon: Icons.drill,
		title: 'Crafts',
		description: 'Handmade with passion to bring something new into existance.',
		slug: 'handcraft',
	},
	{
		title: 'Fiber Arts',
		icon: Icons.shirt,
		description:
			'Textile creations that blend art and functionality, woven with care.',
		slug: 'fiber-arts',
	},
	{
		icon: Icons.camera,
		title: 'Photography',
		description:
			'Capturing moments that tell a story, convey feelings, and evoke memories.',
		slug: 'photography',
	},
	{
		icon: Icons.pen,
		title: 'Words',
		description:
			'Words that weave worlds, crafted by storytellers who pour their hearts onto the page.',
		slug: 'writing',
	},
	{
		icon: Icons.film,
		title: 'Animation',
		description:
			'Crafted frame by frame, bringing imagination to life through tireless dedication.',
		slug: 'animation',
	},
	{
		icon: Icons.gamepad,
		title: 'Games',
		description:
			'Countless hours of passionate work, transfered into interactive experiences.',
		slug: 'indie-games',
	},
	{
		icon: Icons.code,
		title: 'Digital Art',
		description:
			"Working with colaboration, with powerfull GPU's, to create stunning visuals.",
		slug: 'digital-art',
	},
	{
		icon: Icons.film,
		title: 'Movies',
		description:
			'Dialogues, emotions, stories, angles, lighting, and more. All combined to create something truly unique and beautiful.',
		slug: 'movies',
	},
	{
		icon: Icons.mic,
		title: 'Podcasts',
		description:
			'Conversations, ideas, thoughts. All shared through the power of voice.',
		slug: 'podcasts',
	},
	{
		icon: Icons.glasses,
		title: 'Mixed media',
		description:
			'Combines multiple mediums, creating a rich and layered experience that defies traditional categorization.',
		slug: 'mixed-media',
	},
];
