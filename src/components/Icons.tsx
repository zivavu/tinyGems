import {
	Menu,
	Music,
	Paintbrush,
	Pencil,
	Sparkles,
	User,
	type LucideIcon,
} from 'lucide-react';

export const Icons = {
	menu: Menu,
	sparkles: Sparkles,
	music: Music,
	art: Paintbrush,
	pencil: Pencil,
	user: User,
} as const satisfies Record<string, LucideIcon>;
