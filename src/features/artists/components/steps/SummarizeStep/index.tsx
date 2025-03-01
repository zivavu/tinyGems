'use client';

import { FilterOption, FilterSelect } from '@/features/shared/components/FilterSelect';
import { Icons } from '@/features/shared/components/Icons';
import { Select } from '@/features/shared/components/Select';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormFieldErrorMessage } from '@/features/shared/components/forms/FormFieldErrorMessage';
import { cn } from '@/features/shared/utils/cn';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArtistGender, AudiencePerPlatform, ConnectedPlatformsRecord } from '../../../types';
import { calculateCombinedPopularity } from '../../../utils/calculatePopularity';

// Extend the ExternalPlatformArtistData metadata type to include gender
type ExtendedExternalPlatformArtistData = Omit<ExternalPlatformArtistData, 'metadata'> & {
  metadata?: ExternalPlatformArtistData['metadata'] & {
    gender?: ArtistGender;
    language?: string[];
    description?: string;
    location?: string;
    tags?: string[];
  };
  combinedPopularity?: number;
  banner?: string;
};

interface SummarizeStepProps {
  artistData: ExtendedExternalPlatformArtistData;
  connectedPlatforms: ConnectedPlatformsRecord;
  onPrevious: () => void;
  onComplete: (data: ExtendedExternalPlatformArtistData) => void;
}

// Genre options for FilterSelect
const genreOptions: FilterOption[] = [
  { id: 'pop', label: 'Pop', Icon: Icons.Music },
  { id: 'rock', label: 'Rock', Icon: Icons.Guitar },
  { id: 'hiphop', label: 'Hip Hop', Icon: Icons.Mic },
  { id: 'rnb', label: 'R&B', Icon: Icons.Music },
  { id: 'electronic', label: 'Electronic', Icon: Icons.Radio },
  { id: 'classical', label: 'Classical', Icon: Icons.Music },
  { id: 'jazz', label: 'Jazz', Icon: Icons.Music },
  { id: 'country', label: 'Country', Icon: Icons.Guitar },
  { id: 'folk', label: 'Folk', Icon: Icons.Guitar },
  { id: 'metal', label: 'Metal', Icon: Icons.Guitar },
  { id: 'blues', label: 'Blues', Icon: Icons.Guitar },
  { id: 'reggae', label: 'Reggae', Icon: Icons.Music },
  { id: 'funk', label: 'Funk', Icon: Icons.Music },
  { id: 'soul', label: 'Soul', Icon: Icons.Heart },
  { id: 'disco', label: 'Disco', Icon: Icons.Music },
  { id: 'punk', label: 'Punk', Icon: Icons.Flame },
  { id: 'ambient', label: 'Ambient', Icon: Icons.Cloud },
  { id: 'techno', label: 'Techno', Icon: Icons.Radio },
  { id: 'house', label: 'House', Icon: Icons.Layout },
  { id: 'trap', label: 'Trap', Icon: Icons.Mic },
  { id: 'indie', label: 'Indie', Icon: Icons.Stars },
  { id: 'alternative', label: 'Alternative', Icon: Icons.Stars },
];

// Language options for FilterSelect
const languageOptions: FilterOption[] = [
  { id: 'english', label: 'English', Icon: Icons.Globe },
  { id: 'spanish', label: 'Spanish', Icon: Icons.Globe },
  { id: 'french', label: 'French', Icon: Icons.Globe },
  { id: 'german', label: 'German', Icon: Icons.Globe },
  { id: 'italian', label: 'Italian', Icon: Icons.Globe },
  { id: 'portuguese', label: 'Portuguese', Icon: Icons.Globe },
  { id: 'russian', label: 'Russian', Icon: Icons.Globe },
  { id: 'japanese', label: 'Japanese', Icon: Icons.Globe },
  { id: 'korean', label: 'Korean', Icon: Icons.Globe },
  { id: 'mandarin', label: 'Mandarin', Icon: Icons.Globe },
  { id: 'arabic', label: 'Arabic', Icon: Icons.Globe },
  { id: 'hindi', label: 'Hindi', Icon: Icons.Globe },
  { id: 'instrumental', label: 'Instrumental', Icon: Icons.Music },
];

// Tags options for FilterSelect
const tagOptions: FilterOption[] = [
  { id: 'trending', label: 'Trending', Icon: Icons.TrendingUp },
  { id: 'new', label: 'New Artist', Icon: Icons.Plus },
  { id: 'verified', label: 'Verified', Icon: Icons.CheckCircle },
  { id: 'independent', label: 'Independent', Icon: Icons.User },
  { id: 'signed', label: 'Signed', Icon: Icons.Pencil },
  { id: 'grammy', label: 'Grammy Winner', Icon: Icons.Music },
  { id: 'viral', label: 'Viral', Icon: Icons.TrendingUp },
  { id: 'underground', label: 'Underground', Icon: Icons.ArrowLeft },
  { id: 'local', label: 'Local', Icon: Icons.MapPin },
  { id: 'international', label: 'International', Icon: Icons.Globe },
  { id: 'collaboration', label: 'Collaboration', Icon: Icons.Users },
  { id: 'solo', label: 'Solo Artist', Icon: Icons.User },
];

// Artist type options
const artistTypeOptions = [
  { id: 'male', label: 'Male Solo Artist', description: 'Individual male performer' },
  { id: 'female', label: 'Female Solo Artist', description: 'Individual female performer' },
  { id: 'non-binary', label: 'Non-Binary Solo Artist', description: 'Individual non-binary performer' },
  { id: 'group', label: 'Group/Band', description: 'Multiple performers' },
];

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, 'Artist name is required'),
  country: z.string().optional(),
  city: z.string().optional(),
  website: z.string().url().optional().or(z.string().length(0)),
  gender: z.enum(['male', 'female', 'non-binary', 'group']).optional().nullable(),
  description: z.string().optional(),
  banner: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SummarizeStep({ artistData, connectedPlatforms, onPrevious, onComplete }: SummarizeStepProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(artistData.avatar);
  const [selectedBanner, setSelectedBanner] = useState<string | undefined>(artistData.banner);
  const [combinedPopularity, setCombinedPopularity] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(artistData.metadata?.genres || []);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(artistData.metadata?.language || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(artistData.metadata?.tags || []);

  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: artistData.name,
      country: artistData.metadata?.location?.split(',')[0]?.trim() || '',
      city: artistData.metadata?.location?.split(',')[1]?.trim() || '',
      website: artistData.links?.website || '',
      gender: artistData.metadata?.gender || null,
      description: artistData.metadata?.description || '',
      banner: artistData.banner || '',
    },
  });

  // Calculate combined popularity on component mount
  useEffect(() => {
    const audienceData = artistData.audience || {};
    const popularity = calculateCombinedPopularity(audienceData as AudiencePerPlatform);
    setCombinedPopularity(popularity);
  }, [artistData]);

  function handleSelectAvatar(platform: string) {
    const avatarUrl = connectedPlatforms[platform]?.avatar;
    if (avatarUrl) {
      setSelectedAvatar(avatarUrl);
    }
  }

  function onSubmit(formData: FormData) {
    // Create location from country and city
    const location = [formData.country, formData.city].filter(Boolean).join(', ');

    // Process final data for submission
    const finalArtistData: ExtendedExternalPlatformArtistData = {
      ...artistData,
      name: formData.name,
      avatar: selectedAvatar,
      banner: selectedBanner || formData.banner,
      links: {
        ...(artistData.links || {}),
        ...(formData.website ? { website: formData.website } : {}),
      },
      combinedPopularity: combinedPopularity,
      metadata: {
        ...artistData.metadata,
        genres: selectedGenres,
        language: selectedLanguages,
        tags: selectedTags,
        description: formData.description,
        location: location || undefined,
        gender: formData.gender || undefined,
      },
    };

    onComplete(finalArtistData);
  }

  // Get a list of all available platform avatars
  const platformAvatars = Object.entries(connectedPlatforms)
    .filter(([, platformData]) => platformData.avatar)
    .map(([platform, platformData]) => ({
      platform,
      avatarUrl: platformData.avatar,
    }));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography variant="h3" data-testid="summarize-title">
          Finalize Artist Details
        </Typography>
        <Typography variant="muted">Review and complete the artist information before adding</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Artist Avatar Section */}
        <div className="space-y-4">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Artist Images
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background-subtle dark:bg-background-subtle p-4 rounded-lg border border-border dark:border-border shadow-sm">
            {/* Avatar selection */}
            <div className="space-y-3">
              <Typography variant="small" className="font-medium">
                Profile Picture
              </Typography>
              <div className="flex justify-center">
                {selectedAvatar ? (
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-primary-500 dark:border-primary-400 shadow-md">
                    <Image src={selectedAvatar} alt="Artist Avatar" fill className="object-cover" data-testid="selected-avatar" />
                  </div>
                ) : (
                  <div className="w-36 h-36 rounded-full bg-background-subtle dark:bg-background-subtle flex items-center justify-center shadow-md">
                    <Icons.User className="w-16 h-16 text-text-muted dark:text-text-muted" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {platformAvatars.map(({ platform, avatarUrl }) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handleSelectAvatar(platform)}
                    className={cn(
                      'relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-105',
                      selectedAvatar === avatarUrl
                        ? 'border-primary-500 dark:border-primary-400 shadow-sm shadow-primary-300 dark:shadow-primary-900/30'
                        : 'border-border dark:border-border hover:border-primary-300 dark:hover:border-primary-700/50',
                    )}
                    data-testid={`avatar-option-${platform}`}
                  >
                    {avatarUrl && <Image src={avatarUrl} alt={`${platform} avatar`} fill className="object-cover" />}
                    <div
                      className={cn(
                        'absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity',
                        selectedAvatar === avatarUrl ? 'opacity-0' : 'opacity-0 group-hover:opacity-100',
                      )}
                    >
                      <Icons.Check className="w-6 h-6 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Banner upload */}
            <div className="space-y-3">
              <Typography variant="small" className="font-medium">
                Banner Image (Optional)
              </Typography>
              <div className="flex flex-col items-center">
                {selectedBanner ? (
                  <div className="relative w-full h-36 rounded-lg overflow-hidden border-2 border-primary-500 dark:border-primary-400 shadow-md">
                    <Image src={selectedBanner} alt="Artist Banner" fill className="object-cover" data-testid="selected-banner" />
                    <button
                      type="button"
                      onClick={() => setSelectedBanner(undefined)}
                      className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Icons.X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-36 rounded-lg bg-background-muted dark:bg-background-muted flex flex-col items-center justify-center border-2 border-dashed border-border dark:border-border hover:border-primary-300 dark:hover:border-primary-700/50 transition-colors cursor-pointer">
                    <Icons.Image className="w-10 h-10 text-text-muted dark:text-text-muted mb-2" />
                    <Typography variant="small" className="text-text-muted">
                      Paste a URL to add a banner image
                    </Typography>
                  </div>
                )}
              </div>
              <input
                {...register('banner')}
                id="banner"
                type="text"
                placeholder="Enter banner image URL"
                className="w-full py-2 px-3 bg-background-subtle dark:bg-background-subtle rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => setSelectedBanner(e.target.value || undefined)}
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Basic Information
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background-subtle dark:bg-background-subtle p-4 rounded-lg border border-border dark:border-border shadow-sm">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Artist Name*
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className="w-full py-2 px-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                data-testid="artist-name-input"
              />
              {errors.name && <FormFieldErrorMessage errors={errors} name="name" testid="name-error" />}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Official Website
              </label>
              <input
                {...register('website')}
                id="website"
                type="text"
                placeholder="https://www.example.com"
                className="w-full py-2 px-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.website && <FormFieldErrorMessage errors={errors} name="website" testid="website-error" />}
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <input
                {...register('country')}
                id="country"
                type="text"
                className="w-full py-2 px-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                {...register('city')}
                id="city"
                type="text"
                className="w-full py-2 px-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
                Artist Type*
              </Typography>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select title="Artist Type" icon="User" selected={!!field.value} className="w-full">
                    <div className="p-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <Typography variant="h4">Artist Type</Typography>
                        <Button variant="ghost" onClick={() => field.onChange(null)}>
                          Clear
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {artistTypeOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => field.onChange(option.id)}
                            className={cn(
                              'flex items-center w-full gap-2 px-2 py-1.5 text-sm rounded-lg transition-colors',
                              field.value === option.id
                                ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200'
                                : 'hover:bg-background-subtle dark:hover:bg-background-subtle',
                            )}
                          >
                            <div className="flex flex-col flex-1 text-left">
                              <span>{option.label}</span>
                              <span
                                className={cn(
                                  'text-xs',
                                  field.value === option.id
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-text-muted dark:text-text-muted',
                                )}
                              >
                                {option.description}
                              </span>
                            </div>
                            {field.value === option.id && <Icons.Check className="flex-shrink-0 w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Select>
                )}
              />
              {errors.gender && <FormFieldErrorMessage errors={errors} name="gender" testid="gender-error" />}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className="w-full py-2 px-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                placeholder="Add a description about this artist..."
              ></textarea>
              {errors.description && <FormFieldErrorMessage errors={errors} name="description" testid="description-error" />}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Categories
          </Typography>

          <div className="grid grid-cols-1 gap-6 bg-background-subtle dark:bg-background-subtle p-4 rounded-lg border border-border dark:border-border shadow-sm">
            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
                Genres
              </Typography>
              <FilterSelect
                title="Genres"
                icon="Music"
                options={genreOptions}
                selectedValues={selectedGenres}
                onSelectionChange={setSelectedGenres}
                isSearchable={true}
                showFilterChips={true}
                pageType="add"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
                Languages
              </Typography>
              <FilterSelect
                title="Languages"
                icon="Globe"
                options={languageOptions}
                selectedValues={selectedLanguages}
                onSelectionChange={setSelectedLanguages}
                isSearchable={true}
                showFilterChips={true}
                pageType="add"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
                Tags
              </Typography>
              <FilterSelect
                title="Tags"
                icon="Search"
                options={tagOptions}
                selectedValues={selectedTags}
                onSelectionChange={setSelectedTags}
                isSearchable={true}
                showFilterChips={true}
                pageType="add"
              />
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="space-y-4">
          <Typography variant="small" className="font-medium text-gray-700 dark:text-gray-300">
            Platform Data
          </Typography>

          <div className="bg-background-subtle dark:bg-background-subtle p-4 rounded-lg border border-border dark:border-border shadow-sm">
            <div className="flex items-center justify-between">
              <Typography variant="p" className="font-medium">
                Combined Popularity
              </Typography>
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400" data-testid="combined-popularity">
                {combinedPopularity}/100
              </div>
            </div>

            <div className="mt-4 h-2 w-full bg-background-muted dark:bg-background-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 dark:bg-primary-500 rounded-full" style={{ width: `${combinedPopularity}%` }}></div>
            </div>

            {/* Connected Platforms Section */}
            <div className="mt-6 space-y-4">
              <Typography variant="small" className="font-medium">
                Connected Platforms
              </Typography>
              <div className="space-y-3">
                {Object.entries(connectedPlatforms).map(([platform, data]) => (
                  <div
                    key={platform}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-border"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-background-muted dark:bg-background-muted">
                      {data.avatar ? (
                        <Image src={data.avatar} alt={data.name} width={40} height={40} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {platform === 'spotify' && <Icons.Music className="w-5 h-5 text-green-500" />}
                          {platform === 'soundcloud' && <Icons.Cloud className="w-5 h-5 text-orange-500" />}
                          {platform === 'youtube' && <Icons.Video className="w-5 h-5 text-red-500" />}
                          {platform === 'tidal' && <Icons.Waves className="w-5 h-5 text-blue-500" />}
                          {platform === 'appleMusic' && <Icons.Music className="w-5 h-5 text-gray-500" />}
                          {platform === 'bandcamp' && <Icons.Music className="w-5 h-5 text-teal-500" />}
                          {platform === 'instagram' && <Icons.Camera className="w-5 h-5 text-pink-500" />}
                          {platform === 'xTwitter' && <Icons.MessageCircle className="w-5 h-5 text-gray-500" />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Typography variant="small" className="font-medium capitalize">
                        {platform}
                      </Typography>
                      <Typography variant="muted" className="text-xs">
                        {data.name}
                      </Typography>
                    </div>
                    {artistData.audience &&
                      (platform === 'spotify' || platform === 'soundcloud' || platform === 'youtube' || platform === 'tidal') && (
                        <div className="px-2 py-1 bg-background-subtle dark:bg-background-subtle rounded-lg text-center">
                          <Typography variant="small" className="font-medium text-text">
                            {platform === 'spotify' && artistData.audience.spotify?.followers?.toLocaleString()}
                            {platform === 'soundcloud' && artistData.audience.soundcloud?.followers?.toLocaleString()}
                            {platform === 'youtube' && artistData.audience.youtube?.subscribers?.toLocaleString()}
                            {platform === 'tidal' && artistData.audience.tidal?.popularity?.toLocaleString()}
                          </Typography>
                          <Typography variant="muted" className="text-xs">
                            {platform === 'youtube' ? 'Subscribers' : platform === 'tidal' ? 'Popularity' : 'Followers'}
                          </Typography>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Back
          </Button>
          <Button type="submit" variant="default" data-testid="complete-button">
            Complete
          </Button>
        </div>
      </form>
    </div>
  );
}
