'use client';

import { languages, musicFilters } from '@/features/gems/components/FiltersInputBar/filterOptions';
import { FilterSelect } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { Controller, useForm } from 'react-hook-form';

interface AddGemForm {
  title: string;
  artist: string;
  coverImage?: string;
  platforms: {
    spotify?: string;
    youtube?: string;
    soundcloud?: string;
    bandcamp?: string;
  };
  languages: string[];
  genres: string[];
  moods: string[];
  lyrics?: string;
  duration: string;
  releaseDate: string;
}

export default function AddGemPage() {
  const { control, register, handleSubmit } = useForm<AddGemForm>({
    defaultValues: {
      languages: [],
      genres: [],
      moods: [],
      platforms: {},
    },
  });

  const onSubmit = (data: AddGemForm) => {
    console.log(data);
    // Handle form submission
  };

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
                {...register('title', { required: true })}
                type="text"
                id="title"
                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="artist" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Artist Name
              </label>
              <input
                {...register('artist', { required: true })}
                type="text"
                id="artist"
                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Image URL
              </label>
              <input
                {...register('coverImage')}
                type="url"
                id="coverImage"
                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
              />
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
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
                />
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
                <FilterSelect
                  title="Languages"
                  icon="Globe"
                  options={languages}
                  selectedValues={field.value}
                  onSelectionChange={field.onChange}
                  isSearchable
                  showFilterChips
                />
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
                    selectedValues={field.value || []}
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
                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
              />
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
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label htmlFor="releaseDate" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Release Date
                </label>
                <input
                  {...register('releaseDate')}
                  type="date"
                  id="releaseDate"
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="flex items-center gap-2 px-8 py-4">
            <Icons.Plus className="w-5 h-5" />
            Add Gem
          </Button>
        </div>
      </form>
    </main>
  );
}
