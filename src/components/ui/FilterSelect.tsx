'use client';

import { Button } from '@/components/ui/buttons/Button';
import { Select } from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import { Icons } from '@/lib/Icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface FilterInputProps {
  title: string;
  options: FilterOption[] | FilterGroup[];
  selected: string[];
  setSelected: (value: string[]) => void;
  count?: number;
  grouped?: boolean;
  searchable?: boolean;
}

function FilterOption({ option, selected, onClick }: { option: FilterOption; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors',
        selected ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200' : 'hover:bg-gray-50 dark:hover:bg-gray-700',
      )}
    >
      {option.Icon && <option.Icon className="flex-shrink-0 w-5 h-4" />}
      <div className="flex flex-col flex-1 text-left">
        <span>{option.label}</span>
        <span className={cn('text-xs', selected ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400')}>
          {option.description}
        </span>
      </div>
      {selected && <Icons.Check className="flex-shrink-0 w-4 h-4" />}
    </button>
  );
}

function SelectedChips({
  options,
  onRemove,
  maxVisible = 3,
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
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg dark:bg-gray-700/50">
      {visibleOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onRemove(option)}
          className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-rose-600 bg-rose-50 rounded-full border-2 border-rose-200 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20 dark:hover:bg-rose-500/20"
        >
          {option.Icon && <option.Icon className="w-4 h-3" />}
          <span>{option.label}</span>
          <Icons.X className="w-3 h-3" />
        </button>
      ))}

      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex gap-1 items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
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
        </button>
      )}
    </div>
  );
}

export function FilterSelect({ title, options, selected, setSelected, count, grouped = false, searchable = false }: FilterInputProps) {
  const [query, setQuery] = useState('');

  const toggleFilter = (option: FilterOption) => {
    const newSelection = selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id];
    setSelected(newSelection);
  };

  const filteredOptions = grouped
    ? (options as FilterGroup[])
        .map((group) => ({
          name: group.name,
          options: group.options.filter(
            (option) =>
              option.label.toLowerCase().includes(query.toLowerCase()) ||
              (option.description?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
              !query,
          ),
        }))
        .filter((group) => group.options.length > 0)
    : (options as FilterOption[]).filter(
        (option) =>
          option.label.toLowerCase().includes(query.toLowerCase()) ||
          (option.description?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
          !query,
      );

  const allOptions: FilterOption[] = grouped ? (options as FilterGroup[]).flatMap((group) => group.options) : (options as FilterOption[]);

  const selectedOptions = allOptions.filter((option) => selected.includes(option.id));

  return (
    <Select title={title} selected={selected.length > 0} count={count || selected.length || undefined}>
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-base">
            {title}
          </Typography>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelected([])}
              className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear all
            </Button>
          )}
        </div>

        {searchable && (
          <div className="relative">
            <Icons.Search className="absolute left-2 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="py-2 pr-3 pl-8 w-full text-sm bg-gray-50 rounded-lg border-0 dark:bg-gray-700 focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        <SelectedChips options={selectedOptions} onRemove={toggleFilter} maxVisible={3} />

        <div className="overflow-auto max-h-[400px] space-y-2">
          {grouped ? (
            (filteredOptions as FilterGroup[]).map((group) => (
              <div key={group.name} className="space-y-1">
                <div className="sticky top-0 px-2 py-1 text-xs font-semibold text-gray-500 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 dark:text-gray-400">
                  {group.name}
                </div>
                <div className="space-y-0.5">
                  {group.options.map((option) => (
                    <FilterOption
                      key={option.id}
                      option={option}
                      selected={selected.includes(option.id)}
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
                  selected={selected.includes(option.id)}
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

export type { FilterGroup, FilterInputProps, FilterOption };

