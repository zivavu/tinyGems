import { MusicGem } from '@/features/gems/types';
import { platformPriority } from '@/features/shared/components/MediaPreviewPlayer/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { platformIconsMap } from '../../utils/platformIconsMap';

interface MusicPropertiesProps {
  gem: MusicGem;
}

export function MusicProperties({ gem }: MusicPropertiesProps) {
  if (gem.category !== 'music') return null;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2" role="list" aria-label="Available platforms">
        {platformPriority.gem.map((priority) => {
          const platform = gem?.properties?.platforms?.find((p) => p.name.toLowerCase() === priority);
          return platform ? <FontAwesomeIcon key={platform.url} icon={platformIconsMap[platform.name]} /> : null;
        })}
      </div>

      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Music properties">
        {gem?.properties?.genres?.map((genre) => (
          <span
            key={genre}
            className="px-2 py-0.5 text-xs text-indigo-600 bg-indigo-50 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300"
            role="listitem"
          >
            {genre}
          </span>
        ))}
        {gem?.properties?.languages?.map((language) => (
          <span
            key={language}
            className="px-2 py-0.5 text-xs text-emerald-600 bg-emerald-50 rounded-full dark:bg-emerald-900/30 dark:text-emerald-300"
            role="listitem"
          >
            {language}
          </span>
        ))}
        {gem?.properties?.moods?.map((mood) => (
          <span
            key={mood}
            className="px-2 py-0.5 text-xs text-amber-600 bg-amber-50 rounded-full dark:bg-amber-900/30 dark:text-amber-300"
            role="listitem"
          >
            {mood}
          </span>
        ))}
        {gem?.properties?.lyricsTopics?.map((lyricsTopic) => (
          <span
            key={lyricsTopic}
            className="px-2 py-0.5 text-xs text-rose-600 bg-rose-50 rounded-full dark:bg-rose-900/30 dark:text-rose-300"
            role="listitem"
          >
            {lyricsTopic}
          </span>
        ))}
      </div>
    </div>
  );
}
