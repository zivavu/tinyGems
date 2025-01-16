'use client';

import { useState } from 'react';
import {
	artistSizes,
	artistStatus,
	genreStyles,
	releaseTypes,
} from './constants';
import { FilterSection } from './FilterSection';

export interface FilterChangeHandler {
	(filterType: string, selectedOptions: string[]): void;
}

export function MusicFilters({
	onFilterChange,
}: {
	onFilterChange: FilterChangeHandler;
}) {
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
	const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
	const [selectedGenreStyles, setSelectedGenreStyles] = useState<string[]>([]);
	const [selectedReleaseTypes, setSelectedReleaseTypes] = useState<string[]>(
		[]
	);

	return (
		<div className="space-y-4">
			<FilterSection
				title="Artist Size"
				options={artistSizes}
				selected={selectedSizes}
				setSelected={setSelectedSizes}
				filterType="size"
			/>

			<FilterSection
				title="Artist Status"
				options={artistStatus}
				selected={selectedStatus}
				setSelected={setSelectedStatus}
				filterType="status"
			/>

			<FilterSection
				title="Genre Approach"
				options={genreStyles}
				selected={selectedGenreStyles}
				setSelected={setSelectedGenreStyles}
				filterType="genreStyle"
			/>

			<FilterSection
				title="Release Types"
				options={releaseTypes}
				selected={selectedReleaseTypes}
				setSelected={setSelectedReleaseTypes}
				filterType="releaseType"
			/>
		</div>
	);
}
