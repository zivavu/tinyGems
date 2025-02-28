'use client';

import { Icons } from '@/features/shared/components/Icons';
import { Select } from '@/features/shared/components/Select';
import { Typography } from '@/features/shared/components/Typography';
import { Button } from '@/features/shared/components/buttons/Button';
import { FormErrorTypography } from '@/features/shared/components/forms/FormErrorTypography';
import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { Label } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArtistGender, AudiencePerPlatform } from '../../types';
import { calculateCombinedPopularity } from '../../utils/calculatePopularity';

type ConnectedPlatforms = Record<
  string,
  {
    name: string;
    platformId: string;
    avatar?: string;
  }
>;

// Extend the ExternalPlatformArtistData metadata type to include gender
type ExtendedExternalPlatformArtistData = Omit<ExternalPlatformArtistData, 'metadata'> & {
  metadata?: ExternalPlatformArtistData['metadata'] & {
    gender?: ArtistGender;
  };
  combinedPopularity?: number;
};

interface SummarizeStepProps {
  artistData: ExtendedExternalPlatformArtistData;
  connectedPlatforms: ConnectedPlatforms;
  onPrevious: () => void;
  onComplete: (data: ExtendedExternalPlatformArtistData) => void;
}

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, 'Artist name is required'),
  location: z.string().optional(),
  genres: z.string().optional(),
  gender: z.enum(['male', 'female', 'non-binary', 'group']).optional().nullable(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function SummarizeStep({ artistData, connectedPlatforms, onPrevious, onComplete }: SummarizeStepProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(artistData.avatar);
  const [combinedPopularity, setCombinedPopularity] = useState<number>(0);

  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: artistData.name,
      location: artistData.metadata?.location || '',
      genres: artistData.metadata?.genres?.join(', ') || '',
      gender: artistData.metadata?.gender || null,
      description: artistData.metadata?.description || '',
    },
  });

  // Watch gender field for display purposes
  const selectedGender = watch('gender');

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
    // Prepare all the links
    const links: Record<string, string> = {};

    // Add original links from artistData
    if (artistData.links) {
      Object.assign(links, artistData.links);
    }

    // Process genres from comma-separated string to array
    const genres = formData.genres
      ? formData.genres
          .split(',')
          .map((genre) => genre.trim())
          .filter((genre) => genre.length > 0)
      : [];

    // Prepare final data for submission
    const finalArtistData: ExtendedExternalPlatformArtistData = {
      ...artistData,
      name: formData.name,
      avatar: selectedAvatar,
      links: links,
      combinedPopularity: combinedPopularity,
      metadata: {
        ...artistData.metadata,
        genres: genres,
        description: formData.description,
        location: formData.location,
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

  const genderOptions = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'non-binary', label: 'Non-binary' },
    { id: 'group', label: 'Group' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Typography variant="h5" data-testid="summarize-title">
          Finalize Artist Details
        </Typography>
        <Typography variant="muted">Review and complete the artist information before adding</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Artist Avatar Selection */}
        <div className="space-y-3">
          <Typography variant="p" className="font-medium">
            Choose Artist Avatar
          </Typography>

          <div className="flex justify-center mb-4">
            {selectedAvatar ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary-500">
                <Image src={selectedAvatar} alt="Artist Avatar" fill className="object-cover" data-testid="selected-avatar" />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Icons.User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {platformAvatars.map(({ platform, avatarUrl }) => (
              <button
                key={platform}
                type="button"
                onClick={() => handleSelectAvatar(platform)}
                className={`relative w-16 h-16 rounded-full overflow-hidden border-2 
                ${selectedAvatar === avatarUrl ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'}`}
                data-testid={`avatar-option-${platform}`}
              >
                {avatarUrl && <Image src={avatarUrl} alt={`${platform} avatar`} fill className="object-cover" />}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-1">
              Artist Name
            </Label>
            <input
              id="name"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800"
              data-testid="artist-name-input"
            />
            <FormErrorTypography message={errors.name?.message} data-testid="name-error" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </Label>
              <input
                id="location"
                {...register('location')}
                placeholder="City, Country"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800"
                data-testid="artist-location-input"
              />
              <FormErrorTypography message={errors.location?.message} />
            </div>

            <div>
              <Label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender / Group Type
              </Label>

              <Select
                title={selectedGender ? genderOptions.find((opt) => opt.id === selectedGender)?.label || 'Select...' : 'Select...'}
                className="w-full"
                data-testid="gender-select"
              >
                <div className="p-2 space-y-1" data-testid="gender-option-group">
                  {genderOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        selectedGender === option.id
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setValue('gender', option.id as ArtistGender)}
                      data-testid={`gender-option-${option.id}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </Select>

              <input type="hidden" {...register('gender')} />
              <FormErrorTypography message={errors.gender?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="genres" className="block text-sm font-medium mb-1">
              Genres
            </Label>
            <input
              id="genres"
              {...register('genres')}
              placeholder="Separate genres with commas (e.g. electronic, ambient)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800"
              data-testid="artist-genres-input"
            />
            <FormErrorTypography message={errors.genres?.message} />
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </Label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800"
              data-testid="artist-description-input"
            />
            <FormErrorTypography message={errors.description?.message} />
          </div>
        </div>

        {/* Platform Stats */}
        <div className="space-y-3">
          <Typography variant="p" className="font-medium">
            Platform Metrics
          </Typography>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <Typography variant="p" className="font-medium">
                Combined Popularity
              </Typography>
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400" data-testid="combined-popularity">
                {combinedPopularity}/100
              </div>
            </div>

            <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 dark:bg-primary-600" style={{ width: `${combinedPopularity}%` }} />
            </div>

            <div className="mt-4 space-y-2">
              {Object.entries(artistData.audience || {}).map(([platform, metrics]) => (
                <div key={platform} className="flex items-center justify-between text-sm" data-testid={`platform-metrics-${platform}`}>
                  <span className="capitalize">{platform}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {platform === 'spotify' &&
                      (metrics as { followers?: number; popularity?: number })?.followers &&
                      `${(metrics as { followers: number }).followers.toLocaleString()} followers`}
                    {platform === 'spotify' &&
                      (metrics as { followers?: number; popularity?: number })?.popularity &&
                      ` • Popularity: ${(metrics as { popularity: number }).popularity}/100`}

                    {platform === 'soundcloud' &&
                      (metrics as { followers?: number; trackPlays?: number })?.followers &&
                      `${(metrics as { followers: number }).followers.toLocaleString()} followers`}
                    {platform === 'soundcloud' &&
                      (metrics as { followers?: number; trackPlays?: number })?.trackPlays &&
                      ` • ${(metrics as { trackPlays: number }).trackPlays.toLocaleString()} plays`}

                    {platform === 'youtube' &&
                      (metrics as { subscribers?: number; totalViews?: number })?.subscribers &&
                      `${(metrics as { subscribers: number }).subscribers.toLocaleString()} subscribers`}
                    {platform === 'youtube' &&
                      (metrics as { subscribers?: number; totalViews?: number })?.totalViews &&
                      ` • ${(metrics as { totalViews: number }).totalViews.toLocaleString()} views`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious} data-testid="back-button">
            Back
          </Button>
          <Button type="submit" variant="default" data-testid="add-artist-button">
            Add Artist
          </Button>
        </div>
      </form>
    </div>
  );
}
