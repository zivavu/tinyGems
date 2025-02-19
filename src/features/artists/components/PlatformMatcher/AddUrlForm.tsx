import { PlatformType } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { Input } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { validatePlatformArtistUrl } from '../../utils/platformUrlValidators';

const platformUrlSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
});

type PlatformUrlForm = z.infer<typeof platformUrlSchema>;

interface AddUrlFormProps {
  platform: PlatformType;
  onSubmit: (url: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function AddUrlForm({ platform, onSubmit, onCancel, isLoading }: AddUrlFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlatformUrlForm>({
    resolver: zodResolver(platformUrlSchema),
  });

  function handleFormSubmit(data: PlatformUrlForm) {
    const validation = validatePlatformArtistUrl(data.url, platform);
    if (!validation.isValid) {
      return { url: validation.error };
    }
    onSubmit(data.url);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
      <div className="space-y-1">
        <Input
          {...register('url')}
          placeholder={`Enter ${platform} profile URL`}
          className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg transition-all text-base
            ${errors.url ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-amber-500'}`}
        />
        {errors.url && (
          <Typography variant="small" className="text-red-500">
            {errors.url.message}
          </Typography>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            onCancel();
          }}
          className="px-6"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-white px-6">
          {isLoading ? (
            <Icons.Loader className="w-5 h-5 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Icons.Link className="w-5 h-5" />
              Connect
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
