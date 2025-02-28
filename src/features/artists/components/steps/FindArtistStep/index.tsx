import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormFieldErrorMessage } from '@/features/shared/components/forms/FormFieldErrorMessage';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { ArtistUrlFormData, artistUrlSchema } from '@/server/features/schemas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface FindArtistStepProps {
  onContinue: (artistData: ExternalPlatformArtistData) => void;
}

export function FindArtistStep({ onContinue }: FindArtistStepProps) {
  const [isValidationFailed, setIsValidationFailed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<ArtistUrlFormData>({
    resolver: zodResolver(artistUrlSchema),
    mode: 'onChange',
    defaultValues: {
      url: '',
    },
  });

  const urlValue = watch('url');

  const {
    data: queryData,
    isLoading,
    refetch,
  } = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery(
    { url: urlValue },
    { enabled: false, refetchOnWindowFocus: false, refetchOnMount: false, retry: 0 },
  );

  async function onSubmit() {
    setIsValidationFailed(false);

    try {
      const result = await refetch();

      if (result.data) {
        onContinue(result.data.artistData);
      }
    } catch {
      // Any unexpected errors
      setError('url', { message: 'An unexpected error occurred' });
    }
  }

  console.log(errors);

  if (!queryData) {
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
            <label htmlFor="url" className="block text-sm font-medium mb-1">
              Artist URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icons.Link className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                id="url"
                {...register('url')}
                placeholder="Enter artist URL from any platform"
                className={`w-full pl-9 pr-3 py-2.5 rounded-lg border ${
                  errors.url ? 'border-red-500 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600`}
              />
            </div>
            <FormFieldErrorMessage errors={errors} name="url" />
          </div>

          <div className="flex items-center space-x-2">
            <Typography variant="small" className="text-text-muted">
              Supported platforms:
            </Typography>
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={platformIconsMap.spotify} className="h-4 w-4" />
              <FontAwesomeIcon icon={platformIconsMap.soundcloud} className="h-4 w-4" />
              <FontAwesomeIcon icon={platformIconsMap.youtube} className="h-4 w-4" />
              <FontAwesomeIcon icon={platformIconsMap.bandcamp} className="h-4 w-4" />
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

  return <UserProvidedURLArtistProfile artistData={queryData.artistData} onContinue={onContinue} />;
}
