import { FilterOption } from '@/components/ui/FilterSelect';
import { Icons } from '@/lib/Icons';
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
