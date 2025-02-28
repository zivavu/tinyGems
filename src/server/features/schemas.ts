import { validatePlatformArtistUrl } from '@/features/artists/utils/platformUrlValidators';
import { z } from 'zod';

export const artistUrlSchema = z.object({
  url: z
    .string()
    .min(1, 'Please enter a URL')
    .url('Please enter a valid URL with http:// or https://')
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
          // Return the specific error message from the validator if available
          return validation.error || 'Please enter a valid artist URL from a supported platform';
        } catch {
          return 'Failed to validate URL. Please try again.';
        }
      },
    ),
});

export type ArtistUrlFormData = z.infer<typeof artistUrlSchema>;
