'use client';

import { languages, musicFilters } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { FilterSelect } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { cn } from '@/features/shared/utils/dummy/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const addGemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  artist: z.string().min(1, 'Artist name is required').max(100, 'Artist name is too long'),
  coverImage: z.string().url('Must be a valid URL').regex(urlRegex, 'Must be a valid URL').optional().or(z.literal('')),
  platforms: z.object({
    spotify: z
      .string()
      .url('Must be a valid Spotify URL')
      .regex(/^https?:\/\/(open\.)?spotify\.com/, 'Must be a Spotify URL')
      .optional()
      .or(z.literal('')),
    youtube: z
      .string()
      .url('Must be a valid YouTube URL')
      .regex(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/, 'Must be a YouTube URL')
      .optional()
      .or(z.literal('')),
    soundcloud: z
      .string()
      .url('Must be a valid SoundCloud URL')
      .regex(/^https?:\/\/(www\.)?soundcloud\.com/, 'Must be a SoundCloud URL')
      .optional()
      .or(z.literal('')),
    bandcamp: z
      .string()
      .url('Must be a valid Bandcamp URL')
      .regex(/^https?:\/\/.*\.bandcamp\.com/, 'Must be a Bandcamp URL')
      .optional()
      .or(z.literal('')),
  }),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  genres: z.array(z.string()).min(1, 'Select at least one genre'),
  moods: z.array(z.string()).optional(),
  lyrics: z.string().optional().or(z.literal('')),
  duration: z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, 'Must be in format MM:SS')
    .optional()
    .or(z.literal('')),
  releaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be a valid date')
    .optional()
    .or(z.literal('')),
});

type AddGemForm = z.infer<typeof addGemSchema>;

export default function AddGemPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddGemForm>({
    resolver: zodResolver(addGemSchema),
    defaultValues: {
      languages: [],
      genres: [],
      moods: [],
      platforms: {
        spotify: '',
        youtube: '',
        soundcloud: '',
        bandcamp: '',
      },
    },
  });

  const onSubmit = async () => {};

  return (
    <main className="container px-4 py-8 mx-auto max-w-4xl" role="main">
      <div className="mb-8">
        <Typography variant="h1">Add a New Gem</Typography>
        <Typography variant="muted">Share your musical discovery with the community</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 dark:bg-gray-800/50">
          <Typography variant="h3" className="text-lg font-semibold">
            Basic Information
          </Typography>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Track Title
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className={cn(
                  'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                  errors.title && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                )}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="artist" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Artist Name
              </label>
              <input
                {...register('artist')}
                type="text"
                id="artist"
                className={cn(
                  'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                  errors.artist && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                )}
              />
              {errors.artist && <p className="mt-1 text-sm text-red-500">{errors.artist.message}</p>}
            </div>

            <div>
              <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Image URL
              </label>
              <input
                {...register('coverImage')}
                type="url"
                id="coverImage"
                className={cn(
                  'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                  errors.coverImage && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                )}
              />
              {errors.coverImage && <p className="mt-1 text-sm text-red-500">{errors.coverImage.message}</p>}
            </div>
          </div>
        </div>

        {/* Platforms Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 dark:bg-gray-800/50">
          <Typography variant="h3" className="text-lg font-semibold">
            Platforms
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['spotify', 'youtube', 'soundcloud', 'bandcamp'].map((platform) => (
              <div key={platform}>
                <label htmlFor={platform} className="block mb-2 text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                  {platform} URL
                </label>
                <input
                  {...register(`platforms.${platform as keyof AddGemForm['platforms']}`)}
                  type="url"
                  id={platform}
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                    errors.platforms?.[platform as keyof AddGemForm['platforms']] && 'border-red-500',
                  )}
                />
                {errors.platforms?.[platform as keyof AddGemForm['platforms']] && (
                  <p className="mt-1 text-sm text-red-500">{errors.platforms[platform as keyof AddGemForm['platforms']]?.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 dark:bg-gray-800/50">
          <Typography variant="h3" className="text-lg font-semibold">
            Categories
          </Typography>

          <div className="space-y-4">
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <>
                  <FilterSelect
                    title="Languages"
                    icon="Globe"
                    options={languages}
                    selectedValues={Array.isArray(field.value) ? field.value : []}
                    onSelectionChange={field.onChange}
                    isSearchable
                    showFilterChips
                  />
                  {errors.languages && <p className="mt-1 text-sm text-red-500">{errors.languages.message}</p>}
                </>
              )}
            />

            {musicFilters.map((filter) => (
              <Controller
                key={filter.param}
                name={filter.param as keyof AddGemForm}
                control={control}
                render={({ field }) => (
                  <FilterSelect
                    title={filter.title}
                    icon={filter.icon}
                    options={filter.options}
                    selectedValues={Array.isArray(field.value) ? field.value : []}
                    onSelectionChange={field.onChange}
                    isSearchable={filter.isSearchable}
                    showFilterChips={filter.showFilterChips}
                  />
                )}
              />
            ))}
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 dark:bg-gray-800/50">
          <Typography variant="h3" className="text-lg font-semibold">
            Additional Details
          </Typography>

          <div className="space-y-4">
            <div>
              <label htmlFor="lyrics" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Lyrics
              </label>
              <textarea
                {...register('lyrics')}
                id="lyrics"
                rows={6}
                className={cn(
                  'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                  errors.lyrics && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                )}
              />
              {errors.lyrics && <p className="mt-1 text-sm text-red-500">{errors.lyrics.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <input
                  {...register('duration')}
                  type="text"
                  id="duration"
                  placeholder="e.g. 3:45"
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                    errors.duration && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                  )}
                />
                {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>}
              </div>

              <div>
                <label htmlFor="releaseDate" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Release Date
                </label>
                <input
                  {...register('releaseDate')}
                  type="date"
                  id="releaseDate"
                  className={cn(
                    'w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600',
                    errors.releaseDate && 'border-red-500 focus:ring-red-500 focus:border-red-500',
                  )}
                />
                {errors.releaseDate && <p className="mt-1 text-sm text-red-500">{errors.releaseDate.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="flex items-center gap-2 px-8 py-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Icons.Loader className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Icons.Plus className="w-5 h-5" />
                Add Gem
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}
