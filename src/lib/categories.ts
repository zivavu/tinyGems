import { LucideIcon } from 'lucide-react';
import { z } from 'zod';
import { Icons } from './Icons';

// Zod schema for category validation
export const categorySchema = z.object({
	icon: z.custom<LucideIcon>((val) => typeof val === 'function'),
	title: z.string().min(1).max(50),
	description: z.string().min(1).max(200),
	slug: z.string().min(1).max(50),
	subCategories: z.array(z.string()).optional(),
});

export type Category = z.infer<typeof categorySchema>;

export const categories: Category[] = [
	{
		icon: Icons.music,
		title: 'Music',
		description:
			'Music that makes you feel something. Made by Someone, and not a team of analysts.',
		slug: 'music',
		subCategories: [
			'rock',
			'jazz',
			'classical',
			'folk',
			'blues',
			'metal',
			'punk',

			'electronic',
			'indie-electronic',
			'synthpop',
			'lo-fi',
			'ambient',
			'experimental',
			'downtempo',
			'drum-and-bass',
			'dubstep',
			'house',
			'techno',
			'trance',
			'hardstyle',
			'hardcore',

			'rap',
			'underground-hip-hop',
			'alternative-hip-hop',
			'instrumental-hip-hop',
			'trip-hop',
			'trap',
			'dark-trap',
			'drill',
			'melodic-rap',
			'conscious-rap',

			'indie-rock',
			'post-rock',
			'art-rock',
			'noise-rock',
			'psychedelic',
			'garage-rock',
			'post-punk',
			'shoegaze',

			'industrial',
			'darkwave',
			'post-metal',
			'math-rock',

			'indie-folk',
			'contemporary-folk',
			'folk-punk',
			'anti-folk',
			'freak-folk',
			'spoken-word',

			'nu-jazz',
			'free-jazz',
			'jazz-fusion',
			'spiritual-jazz',

			'neo-classical',
			'contemporary-classical',
			'minimal',
			'modern-composition',

			'afrobeat',
			'world-fusion',
			'latin-alternative',
			'global-bass',

			'indie-pop',
			'dream-pop',
			'bedroom-pop',
			'hyperpop',
			'art-pop',

			'glitch',
			'idm',
			'breakcore',
			'vaporwave',
			'future-garage',

			'alternative-r&b',
			'future-soul',
			'uk-garage',
			'grime',

			'post-hardcore',
			'black-metal',
			'doom',
			'sludge',
			'crust-punk',
		],
	},
	{
		icon: Icons.drill,
		title: 'Crafts',
		description:
			'People that bring something new and unique into the world. Handmade, unique, and special.',
		slug: 'crafts',
		subCategories: [
			'woodwork',
			'metalwork',
			'ceramics',
			'jewelry',
			'electronics',
		],
	},
	{
		icon: Icons.art,
		title: 'Graphic Art',
		description:
			'Illustrations that show the soul of the creator, visualised with every stroke.',
		slug: 'graphic-art',
		subCategories: ['painting', 'drawing', 'digital art', 'traditional art'],
	},
	{
		title: 'Fiber Arts',
		icon: Icons.shirt,
		description:
			'Textile creations that blend art and functionality, woven with care.',
		slug: 'fiber-arts',
		subCategories: ['knitting', 'weaving', 'quilting', 'dyeing', 'embroidery'],
	},
	{
		icon: Icons.camera,
		title: 'Photography',
		description:
			'Capturing moments that tell a story, convey feelings, and evoke memories.',
		slug: 'photography',
		subCategories: ['portrait', 'landscape', 'wildlife', 'macro', 'street'],
	},
	{
		icon: Icons.pen,
		title: 'Words',
		description:
			'Words that weave worlds. Written by people who pour their hearts onto the page.',
		slug: 'words',
		subCategories: [
			'poetry',
			'prose',
			'essays',
			'novels',
			'short stories',
			'thoughts',
			'fiction',
		],
	},
	{
		icon: Icons.clapperboard,
		title: 'Movies',
		description:
			'Dialogues, emotions, stories, angles, lighting, and more. All combined to create something truly unique and beautiful.',
		slug: 'movies',
		subCategories: [
			'documentary',
			'indie',
			'animation',
			'short film',
			'feature',
		],
	},
	{
		icon: Icons.code,
		title: 'Digital Art',
		description:
			"Working with collaboration, with powerful GPU's, to create stunning experiences.",
		slug: 'digital-art',
		subCategories: [
			'3D modeling',
			'animation',
			'concept art',
			'digital painting',
			'digital sculpture',
		],
	},
	{
		icon: Icons.glasses,
		title: 'Mixed Media',
		description:
			'Combines multiple mediums, creating a rich and layered experience that defies traditional categorization.',
		slug: 'mixed-media',
		subCategories: ['collage', 'assemblage', 'installation', 'performance'],
	},
	{
		icon: Icons.shell,
		title: 'Content Creation',
		description:
			'Do You love podcasts, history videos, documentaries, educational, science, entertainment? Then it might be a place for You.',
		slug: 'content-creation',
		subCategories: [
			'podcasts',
			'vlogs',
			'tutorials',
			'history',
			'science',
			'entertainment',
			'games',
		],
	},
	{
		icon: Icons.sparkles,
		title: 'Other',
		description:
			'Things so unique, they do not fit in any of the categories. Who knows what You will find here.',
		slug: 'other',
		subCategories: [],
	},
	{
		icon: Icons.sparkles,
		title: 'All Categories',
		description:
			'Look for everything. No matter the size nor the category. We have it all.',
		slug: 'all-categories',
		subCategories: [],
	},
];
