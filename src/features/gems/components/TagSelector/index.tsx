'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Category } from '@/features/shared/utils/dummy/categories';
import { Button } from '../../../shared/components/buttons/Button';
import { FilterSelect } from '../../../shared/components/FilterSelect';
import { CategorySelect } from './comps/CategorySelect';
import { languages } from './constants';
import { FilterComponent } from './FilterComponent';
import {
  contentCreationFilters,
  craftFilters,
  digitalArtFilters,
  fiberArtFilters,
  graphicArtFilters,
  mixedMediaFilters,
  movieFilters,
  musicFilters,
  otherFilters,
  photographyFilters,
  wordsFilters,
} from './filters';
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
        return <FilterComponent filters={musicFilters} onFilterChange={handleParamChange} />;
      case 'craft':
        return <FilterComponent filters={craftFilters} onFilterChange={handleParamChange} />;
      case 'graphic-art':
        return <FilterComponent filters={graphicArtFilters} onFilterChange={handleParamChange} />;
      case 'fiber-arts':
        return <FilterComponent filters={fiberArtFilters} onFilterChange={handleParamChange} />;
      case 'photography':
        return <FilterComponent filters={photographyFilters} onFilterChange={handleParamChange} />;
      case 'words':
        return <FilterComponent filters={wordsFilters} onFilterChange={handleParamChange} />;
      case 'movies':
        return <FilterComponent filters={movieFilters} onFilterChange={handleParamChange} />;
      case 'digital-art':
        return <FilterComponent filters={digitalArtFilters} onFilterChange={handleParamChange} />;
      case 'mixed-media':
        return <FilterComponent filters={mixedMediaFilters} onFilterChange={handleParamChange} />;
      case 'content-creation':
        return <FilterComponent filters={contentCreationFilters} onFilterChange={handleParamChange} />;
      case 'other':
        return <FilterComponent filters={otherFilters} onFilterChange={handleParamChange} />;
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
