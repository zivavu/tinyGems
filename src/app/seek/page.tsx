import { TagSelector } from '@/components/TagSelector';
import { categories } from '@/lib/categories';

interface SeekPageProps {
  searchParams: Promise<{
    category?: string;
    languages?: string;
  }>;
}

export default async function SeekPage({ searchParams }: SeekPageProps) {
  const { category } = await searchParams;
  const selectedCategory = categories.find((c) => c.slug === category) || categories[0];

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-gray-950">
      <main className="container px-8 py-12 mx-auto">
        <div className="mb-8">
          <TagSelector selectedCategory={selectedCategory} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
      </main>
    </div>
  );
}
