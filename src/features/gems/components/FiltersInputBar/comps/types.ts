import { FilterOption, FilterOptionsGroup } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';

export interface GemFilter {
  title: string;
  options: FilterOption[] | FilterOptionsGroup[];
  param: string;
  icon: keyof typeof Icons;
  grouped?: boolean;
  searchable?: boolean;
  showFilterChips?: boolean;
}
