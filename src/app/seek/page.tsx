import { GemGrid } from '@/features/gems/components/GemGrid';
import { TagSelector } from '@/features/gems/components/TagSelector';
import { dummyGems } from '@/features/shared/utils/dummy/gems';

export default async function SeekPage() {
  const sortedGems = [...dummyGems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main className="container flex flex-col gap-8 px-4 mx-auto" role="main" aria-label="Search gems">
      <TagSelector />
      <section aria-label="Gems grid">
        <GemGrid gems={sortedGems} />
      </section>
    </main>
  );
}
