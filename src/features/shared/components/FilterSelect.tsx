'use client';

import { AlbumFilterId, ArtistFilterId, SingleFilterId } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { Button as HeadlessUiButton } from '@headlessui/react';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { IconName, Icons } from './Icons';
import { Select } from './Select';
import { Typography } from './Typography';
import { Button } from './buttons/Button';

export interface FilterOption {
  id: string;
  label: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  isHiddenInAddPage?: boolean;
}

export interface FilterOptionsGroup {
  id: string;
  name: string;
  options: FilterOption[];
  isHiddenInAddPage?: boolean;
}

export interface FilterSelectProps {
  title: string;
  icon?: IconName;
  options: FilterOption[] | FilterOptionsGroup[];
  isSearchable?: boolean;
  showFilterChips?: boolean;
  className?: string;
  selectedValues: string[] | undefined;
  onSelectionChange: (newValues: string[]) => void;
  id?: SingleFilterId | AlbumFilterId | ArtistFilterId;
  isHiddenInAddPage?: boolean;
  pageType: 'add' | 'seek';
}

function FilterOption({ option, selected, onClick }: { option: FilterOption; selected: boolean; onClick: () => void }) {
  return (
    <HeadlessUiButton
      onClick={onClick}
      className={cn(
        'flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors',
        selected
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200'
          : 'hover:bg-background-subtle dark:hover:bg-background-subtle',
      )}
    >
      {option.Icon && <option.Icon className="flex-shrink-0 w-5 h-4" />}
      <div className="flex flex-col flex-1 text-left">
        <span>{option.label}</span>
        <span className={cn('text-xs', selected ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted dark:text-text-muted')}>
          {option.description}
        </span>
      </div>
      {selected && <Icons.Check className="flex-shrink-0 w-4 h-4" />}
    </HeadlessUiButton>
  );
}

function SelectedChips({
  options,
  onRemove,
  maxVisible = 2,
}: {
  options: FilterOption[];
  onRemove: (option: FilterOption) => void;
  maxVisible?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldCollapse = options.length > maxVisible;
  const visibleOptions = isExpanded ? options : options.slice(0, maxVisible);

  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-background-subtle rounded-lg dark:bg-background-subtle">
      {visibleOptions.map((option) => (
        <HeadlessUiButton
          key={option.id}
          onClick={() => onRemove(option)}
          className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-destructive-600 bg-destructive-50 rounded-full border-2 border-destructive-200 hover:bg-destructive-100 dark:bg-destructive-500/10 dark:text-destructive-400 dark:border-destructive-500/20 dark:hover:bg-destructive-500/20"
        >
          {option.Icon && <option.Icon className="w-4 h-3" />}
          <span>{option.label}</span>
          <Icons.X className="w-3 h-3" />
        </HeadlessUiButton>
      ))}

      {shouldCollapse && (
        <HeadlessUiButton
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-text-muted bg-background-muted rounded-full hover:bg-border dark:bg-background-muted dark:text-text-muted dark:hover:bg-border"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <Icons.ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>+{options.length - maxVisible} more</span>
              <Icons.ChevronDown className="w-3 h-3" />
            </>
          )}
        </HeadlessUiButton>
      )}
    </div>
  );
}

export function FilterSelect({
  title,
  icon,
  options,
  selectedValues,
  onSelectionChange,
  isSearchable = false,
  showFilterChips = false,
  className,
  pageType,
}: FilterSelectProps) {
  const [query, setQuery] = useState('');

  const toggleFilter = (option: FilterOption) => {
    const newSelection = selectedValues?.includes(option.id)
      ? selectedValues?.filter((id) => id !== option.id)
      : [...(selectedValues || []), option.id];
    onSelectionChange(newSelection);
  };

  const isGrouped = (options as FilterOptionsGroup[]).some((option) => option?.options?.length > 0);

  const siteSpecificOptions = pageType === 'add' ? options.filter((option) => !option.isHiddenInAddPage) : options;

  const filteredOptions = isGrouped
    ? (siteSpecificOptions as FilterOptionsGroup[])
        .map((group) => ({
          id: group.id,
          name: group.name,
          options: group.options.filter(
            (option) =>
              option?.label?.toLowerCase().includes(query.toLowerCase()) ||
              (option?.description?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
              !query,
          ),
        }))
        .filter((group) => group.options.length > 0)
    : (siteSpecificOptions as FilterOption[]).filter(
        (option) =>
          option?.label?.toLowerCase().includes(query.toLowerCase()) ||
          (option?.description?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
          !query,
      );

  const allOptions: FilterOption[] = isGrouped
    ? (options as FilterOptionsGroup[]).flatMap((group) => group.options)
    : (options as FilterOption[]);

  const selectedOptions = allOptions.filter((option) => selectedValues?.includes(option.id));

  return (
    <Select
      title={title}
      icon={icon}
      selected={selectedValues && selectedOptions.length > 0}
      count={selectedValues?.length || undefined}
      className={className}
    >
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <Typography variant="h4">{title}</Typography>
          <Button disabled={selectedValues?.length === 0} variant="ghost" onClick={() => onSelectionChange([])}>
            Clear all
          </Button>
        </div>

        {isSearchable && (
          <div className="relative">
            <Icons.Search className="absolute left-2 top-1/2 w-4 h-4 text-text-muted -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="py-2 pr-3 pl-8 w-full text-sm bg-background-subtle rounded-lg border-0 dark:bg-background-subtle focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}

        {showFilterChips && <SelectedChips options={selectedOptions} onRemove={toggleFilter} maxVisible={2} />}

        <div className="overflow-auto max-h-[400px] space-y-2">
          {isGrouped ? (
            (filteredOptions as FilterOptionsGroup[]).map((group) => (
              <div key={group.id} className="space-y-1">
                <div className="sticky top-0 px-2 py-1 text-xs font-semibold text-text-muted backdrop-blur-sm bg-background/80 dark:bg-background/80 dark:text-text-muted">
                  {group.name}
                </div>
                <div className="space-y-0.5">
                  {group.options.map((option) => (
                    <FilterOption
                      key={option.id}
                      option={option}
                      selected={selectedValues?.includes(option.id) ?? false}
                      onClick={() => toggleFilter(option)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-0.5">
              {(filteredOptions as FilterOption[]).map((option) => (
                <FilterOption
                  key={option.id}
                  option={option}
                  selected={selectedValues?.includes(option.id) ?? false}
                  onClick={() => toggleFilter(option)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Select>
  );
}
