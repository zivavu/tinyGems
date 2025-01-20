import { GemGrid } from '@/features/gems/components/GemGrid';
import { TagSelector } from '@/features/gems/components/TagSelector';
import { Typography } from '@/features/shared/components/Typography';
import { categories } from '@/features/shared/utils/dummy/categories';
import { dummyGems } from '@/features/shared/utils/dummy/gems';

interface SeekPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SeekPage({ searchParams }: SeekPageProps) {
  const resolvedParams = await searchParams;
  const selectedCategory = categories.find((category) => category.slug === resolvedParams.category) ?? categories[0];

  // Filter gems by selected category
  const filteredGems = dummyGems.filter((gem) => {
    // If "all" is selected, show all gems
    if (selectedCategory.slug === 'all') {
      return true;
    }

    // Otherwise, filter by category
    return gem.type === selectedCategory.slug;
  });

  // Sort by newest first
  const sortedGems = [...filteredGems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main className="container px-4 mx-auto" role="main" aria-label="Search gems">
      <TagSelector selectedCategory={selectedCategory} />

      <div className="py-8">
        <div className="mb-8">
          <Typography variant="h2" className="mb-2" role="heading" aria-level={1}>
            {selectedCategory.slug === 'all' ? 'Latest Gems' : `Latest ${selectedCategory.title}`}
          </Typography>
          <Typography variant="muted" aria-label="Category description">
            {selectedCategory.description}
          </Typography>
        </div>

        <section aria-label="Gems grid">
          <GemGrid gems={sortedGems} />
        </section>
      </div>
    </main>
  );
}
