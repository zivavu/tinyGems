import { validateAnyPlatformUrl } from '@/features/artists/utils/platformUrlValidators';
import { PlatformType } from '@/features/gems/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ManualLinkInputProps {
  platform: string;
  value: string;
  onChange: (url: string) => void;
}

export function ManualLinkInput({ platform, value, onChange }: ManualLinkInputProps) {
  const [url, setUrl] = useState(value);
  const [isEditing, setIsEditing] = useState(!value);
  const [validationError, setValidationError] = useState<string | undefined>();

  const displayName = platform.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const platformIcon = platformIconsMap[platform as keyof typeof platformIconsMap];

  function validateUrl(urlToValidate: string) {
    if (!urlToValidate.trim()) {
      setValidationError(undefined);
      return false;
    }

    const validation = validateAnyPlatformUrl(urlToValidate, platform as PlatformType);
    setValidationError(validation.error);
    return validation.isValid;
  }

  function handleSave() {
    const trimmedUrl = url.trim();
    const isValid = validateUrl(trimmedUrl);

    if (isValid) {
      onChange(trimmedUrl);
      setIsEditing(false);
      setValidationError(undefined);
    }
  }

  function handleEdit() {
    setIsEditing(true);
    setValidationError(undefined);
  }

  // Handle clearing url
  function handleClear() {
    setUrl('');
    onChange('');
    setIsEditing(true);
    setValidationError(undefined);
  }

  // Handle key press (enter to save)
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl.trim()) {
      validateUrl(newUrl);
    } else {
      setValidationError(undefined);
    }
  }

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        {/* Platform icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          {platformIcon ? (
            <FontAwesomeIcon icon={platformIcon} className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <Icons.Link className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </div>

        {/* Platform name & input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col">
              <Typography variant="small" className="font-medium mb-1">
                {displayName}
              </Typography>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Enter ${displayName} URL`}
                    className={`w-full rounded-md border ${
                      validationError
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                    } bg-white dark:bg-gray-800 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {validationError && (
                    <Typography variant="small" className="text-red-500 dark:text-red-400 mt-1 text-xs">
                      {validationError}
                    </Typography>
                  )}
                </div>
                <Button variant="default" size="sm" onClick={handleSave} disabled={!url.trim() || !!validationError}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Typography className="font-medium mr-2">{displayName}</Typography>
              <Typography variant="small" className="text-gray-500 dark:text-gray-400 truncate">
                {url}
              </Typography>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1">
            <Button variant="ghost" onClick={handleEdit}>
              <Icons.Edit className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              <Icons.X className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Icons.ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
