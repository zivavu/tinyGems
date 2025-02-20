import { validatePlatformArtistUrl } from '@/features/artists/utils/platformUrlValidators';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormErrorMessage } from '@/features/shared/components/forms/FormErrorMessage';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { trpcReact } from '@/lib/trpcReact';
import { Input } from '@headlessui/react';
import { useState } from 'react';
import { UserProvidedURLArtistProfile } from './UserProvidedURLArtistProfile';

interface InitialUrlStepProps {
  onContinue: () => void;
}

export function InitialUrlStep({ onContinue }: InitialUrlStepProps) {
  const [url, setUrl] = useState('');
  const urlValidation = validatePlatformArtistUrl(url);

  const {
    data: artistData,
    isLoading,
    error: queryError,
  } = trpcReact.externalArtistDataRouter.fetchFromUrl.useQuery(
    { url },
    { retry: false, enabled: urlValidation.isValid, refetchOnWindowFocus: false, refetchOnMount: false },
  );

  const errorMessage = queryError?.shape?.message || urlValidation.error;

  return (
    <div className="space-y-4">
      <Typography variant="h3">Add an artist</Typography>
      <Typography>Share an underground artist with the community. Start by pasting a link from any major platform.</Typography>

      <div className="space-y-4">
        <Input
          type="url"
          placeholder="Paste artist profile URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
        />

        {!!errorMessage && <FormErrorMessage message={errorMessage} />}

        {artistData && (
          <div className="space-y-4">
            <UserProvidedURLArtistProfile artistData={artistData.artistData} />

            <Button className="w-full" onClick={() => onContinue()}>
              Continue with this artist
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-8">
            <Icons.Loader className="w-5 h-5 animate-spin" />
            <Typography>Fetching artist data...</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
