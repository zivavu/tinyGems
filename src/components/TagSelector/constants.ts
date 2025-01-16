import {
	AU,
	BR,
	CA,
	CN,
	DE,
	DK,
	ES,
	FI,
	FR,
	GB,
	GR,
	ID,
	IL,
	IN,
	IT,
	JP,
	KR,
	MX,
	NL,
	NO,
	PH,
	PL,
	PT,
	RU,
	SA,
	SE,
	TH,
	TR,
	UA,
	VN,
} from 'country-flag-icons/react/3x2';

export const languageFlags = {
	en: GB,
	es: ES,
	ja: JP,
	ko: KR,
	fr: FR,
	de: DE,
	it: IT,
	pt: PT,
	'pt-br': BR,
	zh: CN,
	ru: RU,
	hi: IN,
	ar: SA,
	th: TH,
	vi: VN,
	id: ID,
	tl: PH,
	tr: TR,
	pl: PL,
	uk: UA,
	nl: NL,
	'es-mx': MX,
	'en-ca': CA,
	'en-au': AU,
	sv: SE,
	no: NO,
	da: DK,
	fi: FI,
	el: GR,
	he: IL,
} as const;

export const languages = [
	{ code: 'en', name: 'English', Flag: languageFlags.en },
	{ code: 'es', name: 'Español', Flag: languageFlags.es },
	{ code: 'ja', name: '日本語', Flag: languageFlags.ja },
	{ code: 'ko', name: '한국어', Flag: languageFlags.ko },
	{ code: 'fr', name: 'Français', Flag: languageFlags.fr },
	{ code: 'de', name: 'Deutsch', Flag: languageFlags.de },
	{ code: 'it', name: 'Italiano', Flag: languageFlags.it },
	{ code: 'pt', name: 'Português', Flag: languageFlags.pt },
	{ code: 'pt-br', name: 'Português (Brasil)', Flag: languageFlags['pt-br'] },
	{ code: 'zh', name: '中文', Flag: languageFlags.zh },
	{ code: 'ru', name: 'Русский', Flag: languageFlags.ru },
	{ code: 'hi', name: 'हिन्दी', Flag: languageFlags.hi },
	{ code: 'ar', name: 'العربية', Flag: languageFlags.ar },
	{ code: 'th', name: 'ไทย', Flag: languageFlags.th },
	{ code: 'vi', name: 'Tiếng Việt', Flag: languageFlags.vi },
	{ code: 'id', name: 'Bahasa Indonesia', Flag: languageFlags.id },
	{ code: 'tl', name: 'Tagalog', Flag: languageFlags.tl },
	{ code: 'tr', name: 'Türkçe', Flag: languageFlags.tr },
	{ code: 'pl', name: 'Polski', Flag: languageFlags.pl },
	{ code: 'uk', name: 'Українська', Flag: languageFlags.uk },
	{ code: 'nl', name: 'Nederlands', Flag: languageFlags.nl },
	{ code: 'es-mx', name: 'Español (México)', Flag: languageFlags['es-mx'] },
	{ code: 'en-ca', name: 'English (Canada)', Flag: languageFlags['en-ca'] },
	{ code: 'en-au', name: 'English (Australia)', Flag: languageFlags['en-au'] },
	{ code: 'sv', name: 'Svenska', Flag: languageFlags.sv },
	{ code: 'no', name: 'Norsk', Flag: languageFlags.no },
	{ code: 'da', name: 'Dansk', Flag: languageFlags.da },
	{ code: 'fi', name: 'Suomi', Flag: languageFlags.fi },
	{ code: 'el', name: 'Ελληνικά', Flag: languageFlags.el },
	{ code: 'he', name: 'עברית', Flag: languageFlags.he },
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
		description: 'Less than 100 followers',
	},
	{ id: 'tiny', label: 'Tiny', description: '100 - 1k followers' },
	{ id: 'little', label: 'Little', description: '1k - 10k followers' },
	{ id: 'small', label: 'Small', description: '10k - 50k followers' },
	{
		id: 'substantial',
		label: 'Substantial',
		description: '50k - 100k followers',
	},
	{ id: 'giant', label: 'Giant', description: 'More than 100k followers' },
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
