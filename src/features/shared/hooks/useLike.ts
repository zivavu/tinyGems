'use client';

import { trpc } from '@/lib/trpc';
import { useCallback } from 'react';

interface UseLikeProps {
  id: string;
  type: 'song' | 'album' | 'artist';
}

export function useLike({ id, type }: UseLikeProps) {
  const { data: likes } = trpc.userRouter.getLikes.useQuery();
  const utils = trpc.useUtils();

  const isLiked = likes?.songs.some((like) => like === id);

  const { mutate: toggleLike, isPending } = trpc.userRouter.toggleLike.useMutation({
    onMutate: async () => {
      const previous = utils.userRouter.getLikes.getData();

      utils.userRouter.getLikes.setData(undefined, (old) => ({
        ...old!,
        songs: isLiked ? old!.songs.filter((likeId) => likeId !== id) : [...old!.songs, id],
      }));

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        utils.userRouter.getLikes.setData(undefined, context.previous);
      }
    },
    onSettled: () => {
      utils.userRouter.getLikes.invalidate();
    },
  });

  const handleLike = useCallback(() => {
    if (isPending) return;
    toggleLike({ id, type });
  }, [id, type, isPending, toggleLike]);

  return {
    isLiked,
    handleLike,
    isPending,
  };
}
