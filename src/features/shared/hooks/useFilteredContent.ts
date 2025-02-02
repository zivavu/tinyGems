/* eslint-disable */
import { Album } from '@/features/albums/types';
import { Artist } from '@/features/artists/types';
import { albumFilterIds, artistFilterIds, singleFilterIds } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { ContentType } from '@/features/gems/components/FiltersInputBar/hooks';
import { MusicGem } from '@/features/gems/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type ContentMap = {
  singles: MusicGem[];
  albums: Album[];
  artists: Artist[];
};

type FilterConfig = {
  field?: string;
  isArrayField?: boolean;
  transform?: (value: any) => any;
};

function createFilterFunction<T>(filterConfig: Record<string, FilterConfig>) {
  return (items: T[], params: Record<string, string[]>) => {
    return items.filter((item) => {
      for (const [key, values] of Object.entries(params)) {
        if (!values?.length) continue;

        const config = filterConfig[key];
        if (!config) continue;

        if (!config.field) continue;

        let fieldValue = item;
        const fieldPath = config.field.split('.');

        for (const path of fieldPath) {
          fieldValue = fieldValue?.[path];
          if (fieldValue === undefined) return false;
        }

        if (config.transform) {
          fieldValue = config.transform(fieldValue);
        }

        const itemValues = config.isArrayField ? fieldValue : [fieldValue];
        const hasMatch = values.some((value) => itemValues.includes(value));
        if (!hasMatch) return false;
      }
      return true;
    });
  };
}

const baseFilters = {
  genre: {
    field: 'properties.genres',
    isArrayField: true,
  },
  lang: {
    field: 'properties.languages',
    isArrayField: true,
  },
  platform: {
    field: 'properties.platforms',
    isArrayField: true,
    transform: (platforms) => platforms.map((p: { name: string }) => p.name),
  },
  gender: {
    field: 'artist.gender',
  },
  audienceSize: {
    field: 'artist.audienceSize',
  },
  mood: {
    field: 'properties.moods',
    isArrayField: true,
  },
  lyricsTopics: {
    field: 'properties.lyricsTopics',
    isArrayField: true,
  },
} as const;

const additionalFilters = {
  bpm: {
    customCheck: (gem: MusicGem, values: string[]) => {
      const bpm = gem.properties.bpm;
      return values.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return bpm >= min && (max ? bpm <= max : true);
      });
    },
  },
  additional: {
    customCheck: (gem: MusicGem, values: string[]) => {
      if (values.includes('has-music-video') && !gem.properties.features?.hasMusicVideo) return false;
      if (values.includes('has-lyrics') && !gem.properties.features?.hasLyrics) return false;
      return true;
    },
  },
  albumType: {
    field: 'type',
  },
  releaseYear: {
    field: 'metadata.releaseDate',
    transform: (date: string) => new Date(date).getFullYear().toString(),
  },
  trackCount: {
    customCheck: (album: Album, values: string[]) => {
      const count = album.properties.totalTracks;
      return values.some((range) => {
        const [min, max] = range.split('-').map(Number);
        if (max) return count >= min && count <= max;
        return count >= min;
      });
    },
  },
  location: {
    field: 'location.country',
  },
  verification: {
    field: 'metadata.verificationType',
  },
  activity: {
    field: 'metadata.activityStatus',
  },
} as const;

const filterConfigs = {
  singles: Object.fromEntries(
    singleFilterIds.map((id) => [
      id,
      { ...baseFilters[id as keyof typeof baseFilters], ...additionalFilters[id as keyof typeof additionalFilters] },
    ]),
  ),
  albums: Object.fromEntries(
    albumFilterIds.map((id) => [
      id,
      { ...baseFilters[id as keyof typeof baseFilters], ...additionalFilters[id as keyof typeof additionalFilters] },
    ]),
  ),
  artists: Object.fromEntries(
    artistFilterIds.map((id) => [
      id,
      { ...baseFilters[id as keyof typeof baseFilters], ...additionalFilters[id as keyof typeof additionalFilters] },
    ]),
  ),
} as const;

const filterFunctions = {
  singles: createFilterFunction<MusicGem>(filterConfigs.singles),
  albums: createFilterFunction<Album>(filterConfigs.albums),
  artists: createFilterFunction<Artist>(filterConfigs.artists),
} as const;

export function useFilteredContent<T extends ContentType>(content: ContentMap[T], contentType: T) {
  const searchParams = useSearchParams();

  const filteredContent = useMemo(() => {
    const params = Object.fromEntries(
      Array.from(searchParams.entries())
        .filter(([key]) => key !== 'type' && key !== 'category')
        .map(([key, value]) => [key, value.split(',')]),
    );

    const filterFunction = filterFunctions[contentType];
    return filterFunction(content, params);
  }, [content, contentType, searchParams]);

  return filteredContent;
}
