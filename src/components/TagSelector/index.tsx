'use client';

import { Category } from '@/lib/categories';
import { CategorySelector } from './CategorySelector';
import { LanguageSelector } from './LanguageSelector';
import { MusicFilters } from './MusicFilters';

interface TagSelectorProps {
	selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
	return (
		<div className="sticky top-0 p-3 rounded-md border border-gray-200 dark:border-gray-800">
			<div className="flex gap-2 items-center">
				<CategorySelector selectedCategory={selectedCategory} />
				<LanguageSelector />
				{selectedCategory.slug === 'music' && <MusicFilters />}
			</div>
		</div>
	);
}
