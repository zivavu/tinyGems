import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormErrorTypography } from '@/features/shared/components/forms/FormErrorTypography';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ArtistUrlFormData, artistUrlSchema } from '@/server/features/schemas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface FindArtistStepProps {
  onContinue: (artistData: { platform: string; artistData: unknown }) => void;
}

export function FindArtistStep({ onContinue }: FindArtistStepProps) {
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ArtistUrlFormData>({
    resolver: zodResolver(artistUrlSchema),
    mode: 'onChange',
    defaultValues: {
      url: '',
    },
  });

  const urlValue = watch('url');

  const {
    data: artistData,
    isLoading,
    refetch,
  } = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery(
    { url: urlValue },
    { enabled: false, refetchOnWindowFocus: false, refetchOnMount: false, retry: 0 },
  );

  async function onSubmit() {
    setIsValidationFailed(false);
    setFormError(null);

    try {
      const result = await refetch();
      if (result.error) {
        setFormError(result.error.message);
      }
    } catch (error) {
      if (error instanceof TRPCClientError) {
        setFormError(error.message);
      } else {
        setFormError('An unexpected error occurred');
      }
    }
  }

  // If there's no data yet, show the URL input form
  if (!artistData) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-4">
          <Typography variant="h5" data-testid="page-title">
            Add Artist
          </Typography>
          <Typography variant="muted">Enter the URL of an artist profile from any supported platform</Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <Label htmlFor="url" className="block text-sm font-medium mb-1">
              Artist URL
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icons.Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="url"
                {...register('url')}
                placeholder="Enter artist URL from any platform"
                className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-500"
                data-testid="artist-url-input"
              />
            </div>
            {errors.url && <FormErrorTypography message={errors.url.message} />}
            {formError && <FormErrorTypography message={formError} />}
          </div>

          <div className="flex items-center space-x-2">
            <Typography variant="small" className="text-text-muted">
              Supported platforms:
            </Typography>
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={platformIconsMap.spotify} className="h-4 w-4" title="Spotify" />
              <FontAwesomeIcon icon={platformIconsMap.soundcloud} className="h-4 w-4" title="SoundCloud" />
              <FontAwesomeIcon icon={platformIconsMap.youtube} className="h-4 w-4" title="YouTube" />
              <FontAwesomeIcon icon={platformIconsMap.bandcamp} className="h-4 w-4" title="Bandcamp" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full flex items-center justify-center"
            data-testid="find-artist-button"
          >
            {isLoading ? (
              <>
                <Icons.Loader className="mr-2 h-4 w-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <span>Find Artist</span>
            )}
          </Button>
        </form>
      </div>
    );
  }

  // If validation fails, show error and return to form
  if (isValidationFailed) {
    setIsValidationFailed(false);
    return (
      <div className="text-center space-y-4">
        <Typography variant="h5">Validation Failed</Typography>
        <Typography variant="p">The artist information could not be validated. Please try a different URL.</Typography>
        <Button onClick={() => window.location.reload()} data-testid="try-again-button">
          Try Again
        </Button>
      </div>
    );
  }

  if (!artistData) {
    return null;
  }

  return (
    <UserProvidedURLArtistProfile artistData={artistData} onValidationFailed={() => setIsValidationFailed(true)} onContinue={onContinue} />
  );
}
