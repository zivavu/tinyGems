import { Button } from '@/features/shared/components/buttons/Button';
import { FormErrorTypography } from '@/features/shared/components/forms/FormErrorTypography';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ArtistUrlFormData, artistUrlSchema } from '@/server/features/schemas';
import { Input } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface InitialUrlStepProps {
  onContinue: (artistData: { platform: string; artistData: unknown }) => void;
}

export function InitialUrlStep({ onContinue }: InitialUrlStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ArtistUrlFormData>({
    resolver: zodResolver(artistUrlSchema),
    mode: 'all',
    defaultValues: {
      url: '',
    },
  });

  const {
    data: artistData,
    isLoading,
    error: queryError,
    refetch,
  } = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery(
    { url: watch('url') },
    { enabled: false, refetchOnWindowFocus: false, refetchOnMount: false },
  );

  async function onSubmit() {
    await refetch();
  }

  const errorMessage = errors.url?.message || queryError?.message;

  return (
    <div className="space-y-4">
      <Typography variant="h3">Add an artist</Typography>
      <Typography>Share an underground artist with the community. Start by pasting a link from any major platform.</Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="url"
              placeholder="Paste artist profile URL..."
              {...register('url')}
              className={`w-full px-3 py-2 rounded-md border ${errors.url ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Icons.Loader className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            Find Artist
          </Button>
        </div>

        {errorMessage && <FormErrorTypography message={errorMessage} />}
      </form>

      {artistData && (
        <div className="space-y-4">
          <UserProvidedURLArtistProfile artistData={artistData.artistData} />
          <Button type="button" onClick={() => onContinue(artistData)} className="w-full">
            Continue with this artist
          </Button>
        </div>
      )}
    </div>
  );
}
