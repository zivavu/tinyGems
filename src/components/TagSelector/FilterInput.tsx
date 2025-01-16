import { cn } from '@/lib/utils';
import { Popover, PopoverButton } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { FilterOption } from './constants';

interface FilterSectionProps {
	title: string;
	options: FilterOption[];
	selected: string[];
	setSelected: (value: string[]) => void;
	filterType: string;
}

export function FilterInput({
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

	const selectedOptions = options.filter((opt) => selected.includes(opt.id));

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<PopoverButton
						className={cn(
							'flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors',
							open || selected.length > 0
								? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/20'
								: 'border-gray-200 dark:border-gray-700'
						)}>
						{title}
						{selected.length > 0 && (
							<span className="px-1.5 py-0.5 text-xs bg-rose-100 rounded-full dark:bg-rose-900">
								{selected.length}
							</span>
						)}
						<ChevronDown
							className={cn(
								'w-4 h-4 transition-transform',
								open && 'rotate-180'
							)}
						/>
					</PopoverButton>

					<Popover.Panel className="absolute z-10 mt-2 w-72 bg-white rounded-lg border shadow-lg dark:bg-gray-800 dark:border-gray-700">
						<div className="p-3">
							<div className="flex justify-between items-center mb-3">
								<h3 className="font-medium">{title}</h3>
								{selected.length > 0 && (
									<button
										onClick={() => setSelected([])}
										className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
										Clear all
									</button>
								)}
							</div>
							<div className="space-y-1">
								{options.map((option) => (
									<button
										key={option.id}
										onClick={() => toggleFilter(option)}
										className={cn(
											'flex justify-between items-center w-full px-2 py-1.5 text-sm rounded transition-colors',
											selected.includes(option.id)
												? 'bg-rose-500 text-white'
												: 'hover:bg-gray-100 dark:hover:bg-gray-700'
										)}>
										<span>{option.label}</span>
										{option.description && (
											<span className="text-xs opacity-75">
												{option.description}
											</span>
										)}
									</button>
								))}
							</div>
						</div>
					</Popover.Panel>
				</>
			)}
		</Popover>
	);
}
