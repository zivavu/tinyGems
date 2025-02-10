'use client';

import { trpc } from '@/lib/trpc';
import { LikeType } from '@/server/routers/userRouter';
import { useCallback } from 'react';

interface UseLikeProps {
  id: string;
  type: LikeType;
}

export function useLike({ id, type }: UseLikeProps) {
  const { data: likes } = trpc.userRouter.getLikes.useQuery({ type });
  const utils = trpc.useUtils();

  const isLiked = likes?.includes(id);

  const { mutate: toggleLike, isPending } = trpc.userRouter.toggleLike.useMutation({
    onMutate: () => {
      utils.userRouter.getLikes.setData({ type }, (old) => {
        if (!old) return [id];
        return isLiked ? old.filter((likeId) => likeId !== id) : [...(old ?? []), id];
      });
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
    isLiked: isLiked ?? false,
    handleLike,
    isPending,
  };
}
