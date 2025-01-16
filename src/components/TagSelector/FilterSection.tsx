'use client';

import { cn } from '@/lib/utils';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { ChevronUp } from 'lucide-react';
import { FilterOption } from './constants';

interface FilterSectionProps {
	title: string;
	options: FilterOption[];
	selected: string[];
	setSelected: (value: string[]) => void;
	filterType: string;
}

export function FilterSection({
	title,
	options,
	selected,
	setSelected,
	filterType,
}: FilterSectionProps) {
	const toggleFilter = (option: FilterOption) => {
		const newSelection = selected.includes(option.id)
			? selected.filter((id) => id !== option.id)
			: [...selected, option.id];
		setSelected(newSelection);
	};

	return (
		<Disclosure>
			{({ open }) => (
				<div className="bg-white rounded-lg dark:bg-gray-900">
					<DisclosureButton
						as="button"
						className="flex justify-between px-4 py-3 w-full text-left">
						<span>{title}</span>
						<ChevronUp
							className={cn(
								'w-5 h-5 transition-transform',
								open ? 'transform rotate-180' : ''
							)}
						/>
					</DisclosureButton>
					<DisclosurePanel className="px-4 pb-4">
						<div className="space-y-2">
							{options.map((option) => (
								<button
									key={option.id}
									onClick={() => toggleFilter(option)}
									className={cn(
										'w-full px-3 py-2 text-sm rounded-lg transition-colors text-left',
										selected.includes(option.id)
											? 'bg-rose-500 text-white'
											: 'hover:bg-rose-100 dark:hover:bg-gray-800'
									)}>
									<div className="flex justify-between items-center">
										<span>{option.label}</span>
										<span className="text-xs opacity-75">
											{option.description}
										</span>
									</div>
								</button>
							))}
						</div>
					</DisclosurePanel>
				</div>
			)}
		</Disclosure>
	);
}
