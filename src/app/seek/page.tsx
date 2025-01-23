import { GemGrid } from '@/features/gems/components/GemGrid';
import { TagSelector } from '@/features/gems/components/TagSelector';
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
    <main className="container flex flex-col gap-8 px-4 mx-auto" role="main" aria-label="Search gems">
      <TagSelector />
      <section aria-label="Gems grid">
        <GemGrid gems={sortedGems} />
      </section>
    </main>
  );
}
