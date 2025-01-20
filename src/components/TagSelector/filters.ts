import { GemFilter } from './comps/types';
import {
  artistSizes,
  artMediums,
  artStyles,
  artSubjects,
  artTechniques,
  contentFormats,
  contentStyles,
  contentTopics,
  contentTypes,
  craftComplexity,
  craftMaterials,
  craftStyles,
  digitalArtCategories,
  digitalArtSoftware,
  digitalArtStyles,
  digitalArtTypes,
  fiberComplexity,
  fiberMaterials,
  fiberStyles,
  fiberTechniques,
  filmGenres,
  filmStyles,
  filmTechniques,
  filmTypes,
  genreStyles,
  mixedMediaApproaches,
  mixedMediaMaterials,
  mixedMediaSpaces,
  mixedMediaTypes,
  musicGenres,
  otherApproaches,
  otherComplexity,
  otherMediums,
  otherThemes,
  photographyStyles,
  photographySubjects,
  photographyTechniques,
  photographyTypes,
  productionStyles,
  releaseFrequency,
  writingGenres,
  writingStyles,
  writingThemes,
  writingTypes,
} from './constants';

export const musicFilters: GemFilter[] = [
  {
    title: 'Genres',
    options: musicGenres,
    param: 'genres',
    icon: 'Music',
    grouped: true,
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Audience Size',
    options: artistSizes,
    param: 'audienceSize',
    icon: 'Users',
  },
  {
    title: 'Style',
    options: genreStyles,
    param: 'genreStyle',
    icon: 'Palette',
  },
  {
    title: 'Production',
    options: productionStyles,
    param: 'productionStyle',
    icon: 'Mic',
  },
  {
    title: 'Activity',
    options: releaseFrequency,
    param: 'releaseFrequency',
    icon: 'Clock',
  },
];

export const craftFilters: GemFilter[] = [
  {
    title: 'Materials',
    options: craftMaterials,
    param: 'materials',
    icon: 'Hammer',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Complexity',
    options: craftComplexity,
    param: 'complexity',
    icon: 'Stars',
  },
  {
    title: 'Style',
    options: craftStyles,
    param: 'style',
    icon: 'Palette',
    searchable: true,
  },
];

export const graphicArtFilters: GemFilter[] = [
  {
    title: 'Medium',
    options: artMediums,
    param: 'medium',
    icon: 'PenTool',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: artStyles,
    param: 'artStyle',
    icon: 'Palette',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Subject',
    options: artSubjects,
    param: 'subject',
    icon: 'Image',
    searchable: true,
  },
  {
    title: 'Technique',
    options: artTechniques,
    param: 'technique',
    icon: 'Brush',
    searchable: true,
  },
];

export const fiberArtFilters: GemFilter[] = [
  {
    title: 'Technique',
    options: fiberTechniques,
    param: 'technique',
    icon: 'Scissors',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Material',
    options: fiberMaterials,
    param: 'material',
    icon: 'Anvil',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: fiberStyles,
    param: 'style',
    icon: 'Palette',
    searchable: true,
  },
  {
    title: 'Complexity',
    options: fiberComplexity,
    param: 'complexity',
    icon: 'Stars',
    searchable: true,
  },
];

export const photographyFilters: GemFilter[] = [
  {
    title: 'Type',
    options: photographyTypes,
    param: 'photoType',
    icon: 'Camera',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: photographyStyles,
    param: 'photoStyle',
    icon: 'Palette',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Technique',
    options: photographyTechniques,
    param: 'technique',
    icon: 'Settings',
    searchable: true,
  },
  {
    title: 'Subject',
    options: photographySubjects,
    param: 'subject',
    icon: 'Focus',
    searchable: true,
  },
];

export const wordsFilters: GemFilter[] = [
  {
    title: 'Type',
    options: writingTypes,
    param: 'writingType',
    icon: 'BookOpen',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Genre',
    options: writingGenres,
    param: 'genre',
    icon: 'Library',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: writingStyles,
    param: 'style',
    icon: 'PenTool',
    searchable: true,
  },
  {
    title: 'Theme',
    options: writingThemes,
    param: 'theme',
    icon: 'Bookmark',
    searchable: true,
  },
];

export const movieFilters: GemFilter[] = [
  {
    title: 'Type',
    options: filmTypes,
    param: 'filmType',
    icon: 'Clapperboard',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Genre',
    options: filmGenres,
    param: 'genre',
    icon: 'Film',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: filmStyles,
    param: 'style',
    icon: 'Video',
    searchable: true,
  },
  {
    title: 'Technique',
    options: filmTechniques,
    param: 'technique',
    icon: 'Camera',
    searchable: true,
  },
];

export const digitalArtFilters: GemFilter[] = [
  {
    title: 'Type',
    options: digitalArtTypes,
    param: 'digitalType',
    icon: 'Box',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Style',
    options: digitalArtStyles,
    param: 'style',
    icon: 'Palette',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Software',
    options: digitalArtSoftware,
    param: 'software',
    icon: 'Monitor',
    searchable: true,
  },
  {
    title: 'Category',
    options: digitalArtCategories,
    param: 'category',
    icon: 'Layers',
    searchable: true,
  },
];

export const mixedMediaFilters: GemFilter[] = [
  {
    title: 'Type',
    options: mixedMediaTypes,
    param: 'mixedType',
    icon: 'Combine',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Materials',
    options: mixedMediaMaterials,
    param: 'materials',
    icon: 'Shapes',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Approach',
    options: mixedMediaApproaches,
    param: 'approach',
    icon: 'Lightbulb',
    searchable: true,
  },
  {
    title: 'Space',
    options: mixedMediaSpaces,
    param: 'space',
    icon: 'Box',
    searchable: true,
  },
];

export const contentCreationFilters: GemFilter[] = [
  {
    title: 'Type',
    options: contentTypes,
    param: 'contentType',
    icon: 'Radio',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Topic',
    options: contentTopics,
    param: 'topic',
    icon: 'BookOpen',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Format',
    options: contentFormats,
    param: 'format',
    icon: 'Layout',
    searchable: true,
  },
  {
    title: 'Style',
    options: contentStyles,
    param: 'style',
    icon: 'Sparkles',
    searchable: true,
  },
];

export const otherFilters: GemFilter[] = [
  {
    title: 'Medium',
    options: otherMediums,
    param: 'medium',
    icon: 'Box',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Approach',
    options: otherApproaches,
    param: 'approach',
    icon: 'Lightbulb',
    searchable: true,
    showFilterChips: true,
  },
  {
    title: 'Theme',
    options: otherThemes,
    param: 'theme',
    icon: 'Compass',
    searchable: true,
  },
  {
    title: 'Complexity',
    options: otherComplexity,
    param: 'complexity',
    icon: 'Network',
    searchable: true,
  },
];
