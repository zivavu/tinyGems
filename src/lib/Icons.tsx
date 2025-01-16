import {
  Anvil,
  Camera,
  Check,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Code,
  Drill,
  FileVideo,
  Gamepad,
  Glasses,
  Globe,
  Layout,
  Menu,
  Mic,
  Moon,
  Music,
  Paintbrush,
  Palette,
  Pencil,
  PenTool,
  Search,
  Shell,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Sun,
  User,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';

export const Icons = {
  // Navigation & UI
  Menu,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  X,
  Check,

  // Theme
  Sun,
  Moon,

  // Categories
  Music,
  Drill,
  Paintbrush,
  Shirt,
  Camera,
  Pencil,
  Clapperboard,
  Code,
  Glasses,
  Shell,
  Sparkles,

  // User & Settings
  User,
  Globe,
  Layout,
  SlidersHorizontal,

  // Media & Content
  FileVideo,
  Gamepad,
  Mic,
  PenTool,
  Anvil,
  Clock,
  Users,
  Palette,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof Icons;
