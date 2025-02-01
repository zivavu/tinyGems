import { MusicFiltersId } from '../components/FiltersInputBar/filterOptions';
import { MusicGem } from '../types/types';

type FilterParams = {
  [key in MusicFiltersId]?: string[];
};

export function filterGems(gems: MusicGem[], params: FilterParams): MusicGem[] {
  return gems.filter((gem) => {
    // Helper function to check if any value matches
    const hasMatchingValue = (paramValues: string[] | undefined, itemValues: string | string[] | undefined) => {
      if (!paramValues || paramValues.length === 0) return true;
      if (!itemValues) return false;

      const itemValuesArray = Array.isArray(itemValues) ? itemValues : [itemValues];
      return paramValues.some((param) => itemValuesArray.includes(param));
    };

    // Check each filter parameter
    for (const [key, values] of Object.entries(params)) {
      switch (key as MusicFiltersId) {
        case 'lang':
          if (!hasMatchingValue(values, gem.properties.language)) return false;
          break;

        case 'gender':
          if (!hasMatchingValue(values, gem.artist.gender)) return false;
          break;

        case 'genre':
          if (!hasMatchingValue(values, gem.properties.genre)) return false;
          break;

        case 'audienceSize':
          if (!hasMatchingValue(values, gem.artist.audienceSize)) return false;
          break;

        case 'platform':
          if (
            !hasMatchingValue(
              values,
              gem.properties.platforms.map((p) => p.name),
            )
          )
            return false;
          break;

        case 'bpm':
          // You might want to add a bpm field to your gem properties
          // For now, we'll skip BPM filtering
          break;

        case 'mood':
          if (!hasMatchingValue(values, gem.properties.mood)) return false;
          break;

        case 'lyricsStyle':
          if (!hasMatchingValue(values, gem.properties.lyricsTopic)) return false;
          break;

        case 'additional':
          // Handle additional filters
          if (values.includes('has-music-video') && !gem.properties.hasMusicVideo) return false;
          if (values.includes('has-lyrics') && !gem.properties.lyrics) return false;
          break;
      }
    }

    return true;
  });
}
