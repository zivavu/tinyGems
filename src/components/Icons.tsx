import {
	Camera,
	Film,
	Menu,
	Music,
	Paintbrush,
	Pencil,
	PenTool,
	Shirt,
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
	shirt: Shirt,
	user: User,
	camera: Camera,
	pen: PenTool,
	film: Film,
} as const satisfies Record<string, LucideIcon>;
