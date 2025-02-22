import { validatePlatformArtistUrl } from '@/features/artists/utils/platformUrlValidators';
import { z } from 'zod';

export const artistUrlSchema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => {
      const validation = validatePlatformArtistUrl(url);
      return validation.isValid;
    }),
});

export type ArtistUrlFormData = z.infer<typeof artistUrlSchema>;
