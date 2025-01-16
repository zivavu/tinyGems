import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import {
	Button,
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react';
import { FilterOption } from './constants';

interface FilterInputProps {
	title: string;
	options: FilterOption[];
	selected: string[];
	setSelected: (value: string[]) => void;
	filterType?: string;
	count?: number;
}

export function FilterInput({
	title,
	options,
	selected,
	setSelected,
	count,
}: FilterInputProps) {
	const toggleFilter = (option: FilterOption) => {
		const newSelection = selected.includes(option.id)
			? selected.filter((id) => id !== option.id)
			: [...selected, option.id];
		setSelected(newSelection);
	};

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<PopoverButton
						className={cn(
							'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
							'border dark:border-gray-800',
							open || selected.length > 0
								? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400'
								: 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
						)}>
						<span>{title}</span>
						{(count || selected.length > 0) && (
							<span
								className={cn(
									'px-1.5 py-0.5 text-xs rounded-full',
									open || selected.length > 0
										? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300'
										: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
								)}>
								{count || selected.length}
							</span>
						)}
						<Icons.ChevronDown
							className={cn(
								'w-4 h-4 transition-transform',
								open && 'rotate-180'
							)}
						/>
					</PopoverButton>

					<PopoverPanel className="absolute z-10 mt-2 w-72 bg-gray-900 rounded-lg border border-gray-800 shadow-lg">
						<div className="p-3">
							<div className="flex justify-between items-center mb-3">
								<h3 className="font-medium text-gray-200">{title}</h3>
								{selected.length > 0 && (
									<Button
										onClick={() => setSelected([])}
										className="text-xs text-gray-400 transition-colors hover:text-gray-200">
										Clear all
									</Button>
								)}
							</div>
							<div className="space-y-1">
								{options.map((option) => (
									<Button
										key={option.id}
										onClick={() => toggleFilter(option)}
										className={cn(
											'flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors',
											selected.includes(option.id)
												? 'bg-rose-500/20 text-rose-400'
												: 'text-gray-300 hover:bg-gray-800'
										)}>
										<span>{option.label}</span>
										{option.description && (
											<span
												className={cn(
													'text-xs',
													selected.includes(option.id)
														? 'text-rose-300/70'
														: 'text-gray-500'
												)}>
												{option.description}
											</span>
										)}
									</Button>
								))}
							</div>
						</div>
					</PopoverPanel>
				</>
			)}
		</Popover>
	);
}
