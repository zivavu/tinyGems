import { AddArtistForm } from '@/features/artists/components/AddArtistForm';
import { Typography } from '@/features/shared/components/Typography';

export default function AddArtistPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Typography variant="h2">Add Artist</Typography>
          <Typography variant="muted">
            Share an underground artist with the community. Start by pasting a link from any major platform.
          </Typography>
        </div>

        <AddArtistForm />
      </div>
    </main>
  );
}
