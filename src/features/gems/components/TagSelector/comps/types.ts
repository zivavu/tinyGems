import { FilterOption } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';
import { GenreCategory } from '../constants';

export interface GemFilter {
  title: string;
  options: FilterOption[] | GenreCategory[];
  param: string;
  icon: keyof typeof Icons;
  grouped?: boolean;
  searchable?: boolean;
  showFilterChips?: boolean;
}
