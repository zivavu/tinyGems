import { FilterSelect } from '../ui/FilterSelect';
import { GemFilter } from './comps/types';
import { useParamFilters } from './hooks';

interface FilterComponentProps {
  filters: GemFilter[];
  onFilterChange: (param: string, values: string[]) => void;
}

export function FilterComponent({ filters, onFilterChange }: FilterComponentProps) {
  const { getSelectedParams, handleParamChange } = useParamFilters();

  return (
    <>
      {filters.map(({ title, options, param, icon, searchable, showFilterChips }) => (
        <FilterSelect
          key={title}
          title={title}
          icon={icon}
          options={options}
          selected={getSelectedParams(param)}
          setSelected={(values) => {
            handleParamChange(param, values);
            onFilterChange(param, values);
          }}
          isSearchable={searchable}
          showFilterChips={showFilterChips}
        />
      ))}
    </>
  );
}
