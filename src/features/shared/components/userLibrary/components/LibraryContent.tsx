'use client';

import { AlbumCard } from '@/features/albums/components/AlbumCard/AlbumCard';
import { ArtistCard } from '@/features/artists/ArtistCard/ArtistCard';
import { GemCard } from '@/features/gems/components/GemCard/GemCard';
import { dummyAlbums } from '@/features/shared/utils/dummy/albums';
import { dummyArtists } from '@/features/shared/utils/dummy/artists';
import { dummyGems } from '@/features/shared/utils/dummy/gems';
import { trpc } from '@/lib/trpc';
import { LikeType } from '@/server/routers/userRouter';
import { LoadingCard } from '../../cards/LoadingCard';
import { Typography } from '../../Typography';

interface LibraryContentProps {
  type: LikeType;
}

export function LibraryContent({ type }: LibraryContentProps) {
  const { data: likedIds, isLoading: isLoadingLikes } = trpc.userRouter.getLikes.useQuery({ type });

  const itemsMap = {
    song: dummyGems,
    album: dummyAlbums,
    artist: dummyArtists,
  } as const;
  const items = itemsMap[type].filter((item) => likedIds?.includes(item.id));

  if (isLoadingLikes) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <LoadingCard key={i} index={i} variant={type} />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="text-center py-12">
        <Typography variant="h3" className="mb-2">
          No {type}s found
        </Typography>
        <Typography variant="p" className="text-stone-600 dark:text-stone-400">
          Start exploring and like some {type}s to see them here
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => {
        switch (type) {
          case 'song':
            return <GemCard key={item.id} gem={item as MusicGem} index={index} />;
          case 'album':
            return <AlbumCard key={item.id} album={item as Album} index={index} />;
          case 'artist':
            return <ArtistCard key={item.id} artist={item as Artist} index={index} />;
        }
      })}
    </div>
  );
}
