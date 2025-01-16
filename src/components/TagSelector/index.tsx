'use client';

import { Typography } from '@/components/ui/Typography';
import { categories, Category } from '@/lib/categories';
import { cn } from '@/lib/utils';
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MusicFilters } from './MusicFilters';
import { languages } from './constants';

interface TagSelectorProps {
	selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const selectedLanguages = (() => {
		const langParam = searchParams.get('languages');
		if (!langParam) return [];
		const langCodes = langParam.split(',');
		return languages.filter((lang) => langCodes.includes(lang.code));
	})();

	const [query, setQuery] = useState('');

	const filteredLanguages = query
		? languages.filter(
				(language) =>
					language.name.toLowerCase().includes(query.toLowerCase()) ||
					language.code.toLowerCase().includes(query.toLowerCase())
		  )
		: languages;

	console.log(filteredLanguages);

	const updateSearchParams = (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString());

		// Update or remove each parameter
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});

		// Update URL without refreshing the page
		router.push(`/seek?${params.toString()}`, { scroll: false });
	};

	const handleCategoryChange = (category: Category) => {
		updateSearchParams({ category: category.slug });
	};

	const handleLanguageChange = (newLanguages: typeof selectedLanguages) => {
		const languageParam =
			newLanguages.length > 0
				? newLanguages.map((l) => l.code).join(',')
				: null;
		updateSearchParams({ languages: languageParam });
	};

	const handleRemoveLanguage = (languageCode: string) => {
		const newLanguages = selectedLanguages.filter(
			(l) => l.code !== languageCode
		);
		const languageParam =
			newLanguages.length > 0
				? newLanguages.map((l) => l.code).join(',')
				: null;
		updateSearchParams({ languages: languageParam });
	};

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<Typography variant="h3">Categories</Typography>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.slug}
							onClick={() => handleCategoryChange(category)}
							className={cn(
								'px-4 py-2 rounded-full text-sm transition-colors',
								category.slug === selectedCategory.slug
									? 'bg-rose-500 text-white'
									: 'bg-white text-gray-700 hover:bg-rose-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
							)}>
							<div className="flex gap-2 items-center">
								<DynamicIcon className="w-4 h-4" name={category.icon} />
								{category.title}
							</div>
						</button>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<Typography variant="h3">Language</Typography>
				<Combobox
					value={selectedLanguages}
					onChange={handleLanguageChange}
					immediate
					multiple>
					<div className="relative">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2" />
							<ComboboxInput
								className="py-2 pr-10 pl-10 w-full text-sm rounded-lg border dark:bg-gray-800 dark:border-gray-700"
								placeholder="Search languages..."
								autoComplete="off"
								spellCheck="false"
								autoCorrect="off"
								aria-autocomplete="list"
								aria-controls="language-options"
								onChange={(event) => setQuery(event.target.value)}
								onBlur={() => setQuery('')}
								value={query}
							/>
							<ComboboxButton className="flex absolute inset-y-0 right-0 items-center pr-2">
								<ChevronsUpDown
									className="w-4 h-4 text-gray-400"
									aria-hidden="true"
								/>
							</ComboboxButton>
						</div>

						<ComboboxOptions className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-sm bg-white rounded-md shadow-lg dark:bg-gray-800">
							{filteredLanguages.length === 0 ? (
								<div className="px-4 py-2 text-gray-500">Nothing found.</div>
							) : (
								filteredLanguages.map((language) => (
									<ComboboxOption
										key={language.code}
										value={language}
										className={({ selected }) =>
											cn(
												'relative cursor-pointer select-none py-2 px-4',
												selected ? 'bg-rose-50 dark:bg-rose-900/25' : ''
											)
										}>
										{({ selected }) => (
											<div className="flex justify-between items-center">
												<div className="flex gap-2 items-center">
													<language.Flag className="w-5 h-4" />
													<span>{language.name}</span>
													<span className="text-gray-400">
														({language.code})
													</span>
												</div>
												{selected && (
													<Check className="w-4 h-4 text-rose-500" />
												)}
											</div>
										)}
									</ComboboxOption>
								))
							)}
						</ComboboxOptions>
					</div>
				</Combobox>

				{selectedLanguages.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{selectedLanguages.map((language) => (
							<span
								key={language.code}
								className="flex gap-1 items-center px-3 py-1 text-sm text-rose-600 bg-rose-100 rounded-full dark:bg-rose-900/50 dark:text-rose-300">
								<language.Flag className="w-4 h-3" />
								{language.name}
								<button
									onClick={() => handleRemoveLanguage(language.code)}
									className="ml-1 hover:text-rose-800 dark:hover:text-rose-200">
									<X className="w-3 h-3" />
								</button>
							</span>
						))}
					</div>
				)}
			</div>

			{selectedCategory.slug === 'music' && <MusicFilters />}
		</div>
	);
}
