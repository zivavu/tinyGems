import { validatePlatformArtistUrl } from '@/features/artists/utils/platformUrlValidators';
import { z } from 'zod';

export const artistUrlSchema = z.object({
  url: z
    .string()
    .min(1, 'Please enter a URL')
    .url('Please enter a valid URL')
    .refine(
      (url) => {
        try {
          const validation = validatePlatformArtistUrl(url);
          return validation.isValid;
        } catch {
          return false;
        }
      },
      (url) => {
        try {
          const validation = validatePlatformArtistUrl(url);
          return { message: validation.error || 'Invalid artist URL' };
        } catch {
          return { message: 'Failed to validate URL' };
        }
      },
    ),
});

export type ArtistUrlFormData = z.infer<typeof artistUrlSchema>;
