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

  // Format display name of platform
  const displayName = platform.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  // Get platform icon if available
  const platformIcon = platformIconsMap[platform as keyof typeof platformIconsMap];

  // Handle saving the url
  function handleSave() {
    onChange(url.trim());
    setIsEditing(false);
  }

  // Handle editing existing url
  function handleEdit() {
    setIsEditing(true);
  }

  // Handle clearing url
  function handleClear() {
    setUrl('');
    onChange('');
    setIsEditing(true);
  }

  // Handle key press (enter to save)
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSave();
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
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Enter ${displayName} URL`}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
                <Button variant="default" size="sm" onClick={handleSave} disabled={!url.trim()}>
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
