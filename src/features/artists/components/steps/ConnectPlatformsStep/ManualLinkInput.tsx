import { validateAnyPlatformUrl } from '@/features/artists/utils/platformUrlValidators';
import { PlatformType } from '@/features/gems/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Button } from '@/features/shared/components/buttons/Button';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';

interface ManualLinkInputProps {
  platform: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  disabledMessage?: string;
  'data-testid'?: string;
}

export function ManualLinkInput({ platform, value, onChange, disabled, disabledMessage, 'data-testid': dataTestId }: ManualLinkInputProps) {
  const [url, setUrl] = useState(value);
  const [isEditing, setIsEditing] = useState(!value);
  const [validationError, setValidationError] = useState<string | undefined>();
  const [isValid, setIsValid] = useState(!!value); // Assume existing values are valid

  const displayName = platform.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const platformIcon = platformIconsMap[platform as keyof typeof platformIconsMap];

  function validateUrl(urlToValidate: string) {
    if (!urlToValidate.trim()) {
      setValidationError(undefined);
      setIsValid(false);
      return false;
    }

    const validation = validateAnyPlatformUrl(urlToValidate, platform as PlatformType);
    setValidationError(validation.error);
    setIsValid(validation.isValid);
    return validation.isValid;
  }

  function handleSave() {
    const trimmedUrl = url.trim();
    const urlIsValid = validateUrl(trimmedUrl);

    if (urlIsValid) {
      onChange(trimmedUrl);
      setIsEditing(false);
      setValidationError(undefined);
    }
  }

  function handleEdit() {
    setIsEditing(true);
    setValidationError(undefined);
  }

  function handleClear() {
    setUrl('');
    onChange('');
    setIsEditing(true);
    setValidationError(undefined);
    setIsValid(false);
  }

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
      setIsValid(false);
    }
  }

  // Create a shortened display URL for UI
  function formatDisplayUrl(fullUrl: string): string {
    try {
      const urlObj = new URL(fullUrl);
      const path = urlObj.pathname;
      // Keep hostname and shorten the path if too long
      return `${urlObj.hostname}${path.length > 15 ? `${path.substring(0, 15)}...` : path}`;
    } catch {
      // If it's not a valid URL, just truncate it
      return fullUrl.length > 30 ? `${fullUrl.substring(0, 30)}...` : fullUrl;
    }
  }

  return (
    <div className="w-full" data-testid={dataTestId}>
      <div className="flex items-center gap-2">
        {/* Platform icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-700'
              : !isEditing && isValid
                ? 'bg-green-50 dark:bg-green-900/30'
                : 'bg-gray-100 dark:bg-gray-700'
          }`}
        >
          {platformIcon ? (
            <FontAwesomeIcon
              icon={platformIcon}
              className={`w-4 h-4 ${
                disabled
                  ? 'text-gray-500 dark:text-gray-400'
                  : !isEditing && isValid
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300'
              }`}
            />
          ) : (
            <Icons.Link
              className={`w-4 h-4 ${
                disabled
                  ? 'text-gray-500 dark:text-gray-400'
                  : !isEditing && isValid
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300'
              }`}
            />
          )}
        </div>

        {isEditing && !disabled ? (
          <div className="flex-1 min-w-0">
            <Typography variant="small" className="font-medium mb-1">
              {displayName}
            </Typography>
            <div className="flex gap-2">
              <div className="flex-1 min-w-0 relative">
                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`Enter ${displayName} URL`}
                  className={`w-full rounded-md border pr-8 ${
                    validationError
                      ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400'
                      : url.trim() && isValid
                        ? 'border-green-300 dark:border-green-700 focus:ring-green-500 dark:focus:ring-green-400'
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                  } bg-white dark:bg-gray-800 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {url.trim() && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isValid ? (
                      <Icons.Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                    ) : (
                      <Icons.X className="w-4 h-4 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                )}
                {validationError && (
                  <Typography variant="small" className="text-red-500 dark:text-red-400 mt-1 text-xs">
                    {validationError}
                  </Typography>
                )}
              </div>
              <Button
                className="flex-shrink-0 h-min"
                onClick={handleSave}
                disabled={!url.trim() || !!validationError}
                variant={url.trim() && isValid ? 'default' : 'outline'}
              >
                Save
              </Button>
            </div>
          </div>
        ) : disabled ? (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Typography variant="small" className="font-medium">
                {displayName}
              </Typography>
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
                Already selected
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0 flex items-center">
            <div className="flex items-center gap-1.5 mr-2 flex-shrink-0">
              <Typography className="font-medium">{displayName}</Typography>
              {isValid && (
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Icons.Check className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
                </div>
              )}
            </div>
            <Typography
              variant="small"
              className={`truncate ${isValid ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
              title={url} // Show full URL on hover
            >
              {formatDisplayUrl(url)}
            </Typography>
          </div>
        )}

        {!isEditing && !disabled && (
          <div className="flex gap-2 items-center flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Icons.Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Icons.X size={16} />
            </Button>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                isValid ? 'text-blue-500 hover:text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icons.ExternalLink size={16} />
            </Link>
          </div>
        )}
      </div>

      {disabled && disabledMessage && (
        <Typography variant="small" className="text-gray-500 dark:text-gray-400 mt-1 text-xs ml-10">
          {disabledMessage}
        </Typography>
      )}
    </div>
  );
}
