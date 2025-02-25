import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormErrorTypography } from '@/features/shared/components/forms/FormErrorTypography';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { ArtistUrlFormData, artistUrlSchema } from '@/server/features/schemas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface InitialUrlStepProps {
  onContinue: (artistData: { platform: string; artistData: unknown }) => void;
}

export function InitialUrlStep({ onContinue }: InitialUrlStepProps) {
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty, isSubmitted },
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
    error: queryError,
    refetch,
  } = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery(
    { url: urlValue },
    { enabled: false, refetchOnWindowFocus: false, refetchOnMount: false, retry: 0 },
  );

  async function onSubmit() {
    setIsValidationFailed(false);
    setFormError(null);

    try {
      await refetch();
    } catch (error) {
      setIsValidationFailed(true);

      // Handle tRPC errors properly
      if (error instanceof TRPCClientError) {
        try {
          // Try to parse the error message if it's JSON
          const errorData = JSON.parse(error.message);
          if (Array.isArray(errorData)) {
            // Find the most relevant error message
            const customError = errorData.find((err) => err.code === 'custom')?.message;
            const urlError = errorData.find((err) => err.path?.[0] === 'url')?.message;
            setFormError(customError || urlError || 'Invalid artist URL');
          } else {
            setFormError(errorData.message || "We couldn't fetch artist data. Please try again.");
          }
        } catch {
          // If parsing fails, use the error message directly
          setFormError(error.message || "We couldn't fetch artist data. Please try again.");
        }
      } else {
        setFormError("We couldn't fetch artist data. Please check your URL and try again.");
      }
    }
  }

  // Combine error messages from form validation and query errors
  const errorMessage =
    formError ||
    errors.url?.message ||
    queryError?.message ||
    (isValidationFailed ? "We couldn't fetch artist data. Please check your URL and try again." : undefined);

  // List of supported platforms with their colors
  const supportedPlatforms = [
    { id: 'spotify', name: 'Spotify', color: 'text-green-600 dark:text-green-400' },
    { id: 'soundcloud', name: 'SoundCloud', color: 'text-orange-600 dark:text-orange-400' },
    { id: 'youtube', name: 'YouTube', color: 'text-red-600 dark:text-red-400' },
    { id: 'tidal', name: 'Tidal', color: 'text-blue-600 dark:text-blue-400' },
  ];

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icons.Link className="w-4 h-4" />
            </div>
            <input
              type="url"
              placeholder="Paste artist profile URL..."
              {...register('url')}
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg border ${
                errors.url || isValidationFailed ? 'border-red-500 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600`}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Icons.Loader className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
          <Button type="submit" disabled={isLoading || (!isValid && isDirty && isSubmitted)} variant="default" className="py-2.5">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Icons.Loader className="w-4 h-4 animate-spin" />
                Finding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Icons.Search className="w-4 h-4" />
                Find Artist
              </span>
            )}
          </Button>
        </div>

        {errorMessage && <FormErrorTypography message={errorMessage} />}
      </form>

      {/* Platform support information - displayed when no artist is loaded */}
      {!artistData && !isLoading && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <Typography variant="small" className="mb-3 flex items-start gap-2">
            <Icons.Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Paste a direct link to an artist profile from any of these platforms:</span>
          </Typography>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {supportedPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <FontAwesomeIcon
                  icon={platformIconsMap[platform.id as keyof typeof platformIconsMap]}
                  className={`w-5 h-5 mb-1 ${platform.color}`}
                />
                <Typography variant="small" className="text-center text-xs font-medium">
                  {platform.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}

      {artistData && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Typography variant="h4" className="font-bold">
              Artist Found
            </Typography>
            <Typography variant="small" className="text-gray-500 dark:text-gray-400">
              Is this correct?
            </Typography>
          </div>

          <UserProvidedURLArtistProfile artistData={artistData.artistData} />

          <Button type="button" onClick={() => onContinue(artistData)} className="w-full py-2.5" variant="default">
            <span className="flex items-center justify-center gap-2">
              <Icons.Check className="w-5 h-5" />
              Continue with this artist
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
