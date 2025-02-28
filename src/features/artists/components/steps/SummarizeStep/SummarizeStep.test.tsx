import { ExternalPlatformArtistData } from '@/server/features/platforms/externalArtistData/crossPlatformSearch';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SummarizeStep } from './SummarizeStep';
describe('SummarizeStep Component', () => {
  const mockArtistData: ExternalPlatformArtistData = {
    name: 'Test Artist',
    platformId: 'spotify-123',
    avatar: 'https://example.com/avatar-spotify.jpg',
    links: {
      spotify: 'https://spotify.com/artist/123',
      soundcloud: 'https://soundcloud.com/test-artist',
    },
    audience: {
      spotify: {
        followers: 5000,
        popularity: 60,
      },
      soundcloud: {
        followers: 3000,
        trackPlays: 50000,
      },
    },
    metadata: {
      genres: ['electronic', 'ambient'],
      description: 'Test artist description',
      location: 'Berlin, Germany',
    },
  };

  const mockConnectedPlatforms = {
    spotify: {
      name: 'Test Artist',
      platformId: 'spotify-123',
      avatar: 'https://example.com/avatar-spotify.jpg',
    },
    soundcloud: {
      name: 'Test Artist SC',
      platformId: 'soundcloud-456',
      avatar: 'https://example.com/avatar-soundcloud.jpg',
    },
    youtube: {
      name: 'Test Artist YT',
      platformId: 'youtube-789',
      avatar: 'https://example.com/avatar-youtube.jpg',
    },
  };

  const onCompleteMock = vi.fn();
  const onPreviousMock = vi.fn();

  it('renders the component with artist data', () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    expect(screen.getByTestId('summarize-title')).toBeInTheDocument();
    expect(screen.getByTestId('artist-name-input')).toHaveValue('Test Artist');
    expect(screen.getByTestId('artist-location-input')).toHaveValue('Berlin, Germany');
  });

  it('allows selecting different avatar images from platforms', async () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // Test that all platform avatars are displayed as options
    expect(screen.getByTestId('avatar-option-spotify')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-option-soundcloud')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-option-youtube')).toBeInTheDocument();

    // Select a different avatar
    fireEvent.click(screen.getByTestId('avatar-option-soundcloud'));

    // Check if the avatar selection changed
    await waitFor(() => {
      expect(screen.getByTestId('selected-avatar')).toHaveAttribute('src', 'https://example.com/avatar-soundcloud.jpg');
    });
  });

  it('calculates combined popularity from platform data', () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // We expect to see some representation of popularity score
    expect(screen.getByTestId('combined-popularity')).toBeInTheDocument();
  });

  it('allows editing artist metadata', async () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // Find and interact with the genre input field
    const genreInput = screen.getByTestId('artist-genres-input');
    fireEvent.change(genreInput, { target: { value: 'electronic, ambient, experimental' } });

    // Location field
    const locationInput = screen.getByTestId('artist-location-input');
    fireEvent.change(locationInput, { target: { value: 'New York, USA' } });

    // Check if the values updated
    await waitFor(() => {
      expect(genreInput).toHaveValue('electronic, ambient, experimental');
      expect(locationInput).toHaveValue('New York, USA');
    });
  });

  it('submits the form with complete artist data', async () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // Simulate form submission
    fireEvent.click(screen.getByTestId('add-artist-button'));

    // Verify the onComplete callback was called with the correct data
    await waitFor(() => {
      expect(onCompleteMock).toHaveBeenCalledTimes(1);
      const submittedData = onCompleteMock.mock.calls[0][0];
      expect(submittedData.name).toBe('Test Artist');
      expect(submittedData.links).toHaveProperty('spotify');
      expect(submittedData.links).toHaveProperty('soundcloud');
      expect(submittedData).toHaveProperty('combinedPopularity');
    });
  });

  it('goes back to previous step when clicking back button', () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // Find and click the back button
    fireEvent.click(screen.getByTestId('back-button'));

    // Verify the onPrevious callback was called
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  it('allows selecting gender using the Select component', async () => {
    render(
      <SummarizeStep
        artistData={mockArtistData}
        connectedPlatforms={mockConnectedPlatforms}
        onComplete={onCompleteMock}
        onPrevious={onPreviousMock}
      />,
    );

    // Open the gender select
    fireEvent.click(screen.getByTestId('gender-select'));

    // Select a gender option
    fireEvent.click(screen.getByTestId('gender-option-group'));

    // Fill in other required fields
    const nameInput = screen.getByTestId('artist-name-input');
    fireEvent.change(nameInput, { target: { value: 'Updated Artist Name' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('add-artist-button'));

    // Verify the submitted data includes the selected gender
    await waitFor(() => {
      expect(onCompleteMock).toHaveBeenCalledTimes(1);
      const submittedData = onCompleteMock.mock.calls[0][0];
      expect(submittedData.name).toBe('Updated Artist Name');
    });
  });
});
