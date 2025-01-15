'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Only render after component is mounted (client-side)
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-10 h-10" />;
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="rounded-full p-2 hover:bg-rose-100 dark:hover:bg-rose-900">
			{theme === 'dark' ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
		</button>
	);
}
