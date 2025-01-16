import {
	CN,
	DE,
	ES,
	FR,
	GB,
	ID,
	IN,
	IT,
	JP,
	KR,
	NL,
	PH,
	PL,
	PT,
	RU,
	SA,
	TH,
	TR,
	UA,
	VN,
} from 'country-flag-icons/react/3x2';

export const languages = [
	{ code: 'en', name: 'English', Flag: GB },
	{ code: 'es', name: 'Español', Flag: ES },
	{ code: 'ja', name: '日本語', Flag: JP },
	{ code: 'ko', name: '한국어', Flag: KR },
	{ code: 'fr', name: 'Français', Flag: FR },
	{ code: 'de', name: 'Deutsch', Flag: DE },
	{ code: 'it', name: 'Italiano', Flag: IT },
	{ code: 'pt', name: 'Português', Flag: PT },
	{ code: 'zh', name: '中文', Flag: CN },
	{ code: 'ru', name: 'Русский', Flag: RU },
	{ code: 'hi', name: 'हिन्दी', Flag: IN },
	{ code: 'ar', name: 'العربية', Flag: SA },
	{ code: 'th', name: 'ไทย', Flag: TH },
	{ code: 'vi', name: 'Tiếng Việt', Flag: VN },
	{ code: 'id', name: 'Bahasa Indonesia', Flag: ID },
	{ code: 'tl', name: 'Tagalog', Flag: PH },
	{ code: 'tr', name: 'Türkçe', Flag: TR },
	{ code: 'pl', name: 'Polski', Flag: PL },
	{ code: 'uk', name: 'Українська', Flag: UA },
	{ code: 'nl', name: 'Nederlands', Flag: NL },
].sort((a, b) => a.name.localeCompare(b.name));

export type FilterOption = {
	id: string;
	label: string;
	description: string;
};

export const artistSizes = [
	{
		id: 'microscopic',
		label: 'Microscopic',
		description: 'Less than 1k followers',
	},
	{ id: 'tiny', label: 'Tiny', description: '1k - 10k followers' },
	{ id: 'little', label: 'Little', description: '10k - 50k followers' },
	{ id: 'small', label: 'Small', description: '50k - 100k followers' },
	{
		id: 'substantial',
		label: 'Substantial',
		description: '100k - 500k followers',
	},
	{ id: 'giant', label: 'Giant', description: '500k+ followers' },
] as FilterOption[];

export const artistStatus = [
	{ id: 'active', label: 'Active', description: 'Released in last 6 months' },
	{ id: 'rising', label: 'Rising', description: 'Growing rapidly' },
	{ id: 'established', label: 'Established', description: 'Stable presence' },
	{ id: 'hiatus', label: 'On Hiatus', description: 'No recent activity' },
] as FilterOption[];

export const genreStyles = [
	{ id: 'purist', label: 'Genre Purist', description: 'Focuses on one genre' },
	{
		id: 'explorer',
		label: 'Genre Explorer',
		description: 'Experiments across genres',
	},
	{
		id: 'fusion',
		label: 'Genre Fusion',
		description: 'Blends multiple genres',
	},
	{ id: 'evolving', label: 'Evolving Style', description: 'Changes over time' },
] as FilterOption[];

export const releaseTypes = [
	{ id: 'singles', label: 'Singles', description: 'Individual track releases' },
	{ id: 'eps', label: 'EPs', description: '2-6 track releases' },
	{ id: 'albums', label: 'Albums', description: '7+ track releases' },
	{ id: 'remixes', label: 'Remixes', description: 'Remix works' },
] as FilterOption[];

export const artistExperience = [
	{ id: 'young', label: 'Young', description: 'Active for 0-3 years' },
	{
		id: 'full-grown',
		label: 'Full-grown',
		description: 'Active for 3-10 years',
	},
	{ id: 'veteran', label: 'Veteran', description: 'Active for 10+ years' },
] as const;

export const productionStyles = [
	{
		id: 'bedroom',
		label: 'Bedroom Producer',
		description: 'Home studio setup',
	},
	{ id: 'diy', label: 'DIY Recording', description: 'Self-recorded' },
	{
		id: 'studio',
		label: 'Studio Recording',
		description: 'Professional studio',
	},
	{ id: 'live', label: 'Live Recording', description: 'Recorded live' },
] as const;

export const releaseFrequency = [
	{
		id: 'very_active',
		label: 'Very Active',
		description: 'Multiple releases per month',
	},
	{ id: 'active', label: 'Active', description: 'Monthly releases' },
	{ id: 'moderate', label: 'Moderate', description: 'Quarterly releases' },
	{ id: 'selective', label: 'Selective', description: 'Few releases per year' },
] as const;
