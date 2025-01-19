'use client';

import { Category } from '@/lib/categories';
import { Icons } from '@/lib/Icons';
import { Button } from '../ui/buttons/Button';
import { FilterSelect } from '../ui/FilterSelect';
import { CategorySelect } from './comps/CategorySelect';
import { ContentCreationFilters } from './comps/ContentCreationFilters';
import { CraftFilters } from './comps/CraftFilters';
import { DigitalArtFilters } from './comps/DigitalArtFilters';
import { FiberArtFilters } from './comps/FiberArtFilters';
import { GraphicArtFilters } from './comps/GraphicArtFilters';
import { MixedMediaFilters } from './comps/MixedMediaFilters';
import { MovieFilters } from './comps/MovieFilters';
import { MusicFilters } from './comps/MusicFilters';
import { OtherFilters } from './comps/OtherFilters';
import { PhotographyFilters } from './comps/PhotographyFilters';
import { WordsFilters } from './comps/WordsFilters';
import { languages } from './constants';
import { useParamFilters } from './hooks';

interface TagSelectorProps {
  selectedCategory: Category;
}

export function TagSelector({ selectedCategory }: TagSelectorProps) {
  const { getSelectedParams, handleParamChange, clearAllParams } = useParamFilters();
  const hasActiveFilters = false; // You'll need to implement this logic

  const renderCategoryFilters = () => {
    switch (selectedCategory.slug) {
      case 'music':
        return <MusicFilters />;
      case 'crafts':
        return <CraftFilters />;
      case 'graphic-art':
        return <GraphicArtFilters />;
      case 'fiber-arts':
        return <FiberArtFilters />;
      case 'photography':
        return <PhotographyFilters />;
      case 'words':
        return <WordsFilters />;
      case 'movies':
        return <MovieFilters />;
      case 'digital-art':
        return <DigitalArtFilters />;
      case 'mixed-media':
        return <MixedMediaFilters />;
      case 'content-creation':
        return <ContentCreationFilters />;
      case 'other':
        return <OtherFilters />;
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex flex-wrap gap-2 items-center px-4 py-4">
        <CategorySelect selectedCategory={selectedCategory} />

        <FilterSelect
          title="Language"
          icon="Globe"
          options={languages}
          selected={getSelectedParams('lang')}
          setSelected={(newValues) => handleParamChange('lang', newValues)}
          isSearchable
          showFilterChips
        />

        {renderCategoryFilters()}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllParams}
            className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icons.X className="mr-1 w-3 h-3" />
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
