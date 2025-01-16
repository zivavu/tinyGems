'use client';

import { Icons } from '@/lib/Icons';
import { categories, Category } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageSelector } from './LanguageSelector';
import { MusicFilters } from './MusicFilters';

interface TagSelectorProps {
	selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleCategoryChange = (category: Category) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('category', category.slug);
		router.push(`/seek?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="flex sticky top-0 z-50 gap-2 p-3 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
			<Popover className="relative">
				{({ open }) => (
					<>
						<PopoverButton
							className={cn(
								'flex gap-2 items-center px-3 py-2 text-sm rounded-lg border transition-colors',
								open
									? 'text-rose-500 bg-rose-50 border-rose-500 dark:bg-rose-950/20'
									: 'border-gray-200 dark:border-gray-700'
							)}>
							<DynamicIcon className="w-4 h-4" name={selectedCategory.icon} />
							{selectedCategory.title}
							<Icons.ChevronDown
								className={cn(
									'w-4 h-4 transition-transform',
									open && 'rotate-180'
								)}
							/>
						</PopoverButton>

						<PopoverPanel className="absolute z-10 mt-2 w-72 bg-white rounded-lg shadow-lg dark:bg-gray-800">
							<div className="grid grid-cols-2 gap-2 p-3">
								{categories.map((category) => (
									<button
										key={category.slug}
										onClick={() => handleCategoryChange(category)}
										className={cn(
											'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
											category.slug === selectedCategory.slug
												? 'bg-rose-500 text-white'
												: 'hover:bg-gray-100 dark:hover:bg-gray-700'
										)}>
										<DynamicIcon className="w-4 h-4" name={category.icon} />
										{category.title}
									</button>
								))}
							</div>
						</PopoverPanel>
					</>
				)}
			</Popover>

			<LanguageSelector />

			{selectedCategory.slug === 'music' && <MusicFilters />}
		</div>
	);
}
