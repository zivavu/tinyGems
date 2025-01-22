import { IconName, iconNames } from 'lucide-react/dynamic';
import { z } from 'zod';

// Zod schema for category validation
export const categorySchema = z.object({
  icon: z.enum(iconNames as [IconName, ...IconName[]]),
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  slug: z.string().min(1).max(50),
  options: z.array(z.string()).optional(),
});

export type Category = z.infer<typeof categorySchema>;

export const categories: Category[] = [
  {
    icon: 'music',
    title: 'Music',
    description: 'Music that makes you feel something. Made by Someone, and not a team of analysts.',
    slug: 'music',
  },
];
