import { GemGrid } from '@/components/gems/GemGrid';
import { TagSelector } from '@/components/TagSelector';
import { Typography } from '@/components/ui/Typography';
import { categories } from '@/lib/categories';
import { dummyGems } from '@/lib/dummy/gems';

interface SeekPageProps {
  searchParams: { category?: string };
}

export default function SeekPage({ searchParams }: SeekPageProps) {
  const selectedCategory = categories.find((category) => category.slug === searchParams.category) ?? categories[0];

  return (
    <main className="container px-4 mx-auto">
      <TagSelector selectedCategory={selectedCategory} />

      <div className="py-8">
        <div className="mb-8">
          <Typography variant="h2" className="mb-2">
            Latest Gems
          </Typography>
          <Typography variant="muted">Discover unique underground creations from independent artists</Typography>
        </div>

        <GemGrid gems={dummyGems} />
      </div>
    </main>
  );
}
