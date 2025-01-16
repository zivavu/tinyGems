'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { artistSizes, artistStatus, genreStyles } from './constants';
import { FilterSection } from './FilterSection';

export function MusicFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const getSelectedParam = (param: string) =>
		searchParams.get(param)?.split(',').filter(Boolean) || [];

	const selectedSizes = getSelectedParam('sizes');
	const selectedStatus = getSelectedParam('status');
	const selectedGenreStyles = getSelectedParam('genreStyles');

	const updateSearchParam = (param: string, values: string[]) => {
		const params = new URLSearchParams(searchParams);
		if (values.length) {
			params.set(param, values.join(','));
		} else {
			params.delete(param);
		}
		router.push(`?${params.toString()}`, { scroll: false });
	};

	const setSelectedSizes = (sizes: string[]) =>
		updateSearchParam('sizes', sizes);
	const setSelectedStatus = (status: string[]) =>
		updateSearchParam('status', status);
	const setSelectedGenreStyles = (styles: string[]) =>
		updateSearchParam('genreStyles', styles);

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
		</div>
	);
}
