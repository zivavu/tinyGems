'use client';

import { authClient } from '@/lib/authClient';
import { trpc } from '@/lib/trpc';
import { LikeType } from '@/server/routers/userRouter';

interface UseLikeProps {
  id: string;
  type: LikeType;
}

export function useLike({ id, type }: UseLikeProps) {
  const session = authClient.useSession();
  const isAuthenticated = !!session.data?.user;

  if (!isAuthenticated) {
    return {
      isLiked: false,
      handleLike: () => {},
      isPending: false,
    };
  }
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

  function handleLike() {
    if (isPending) return;
    toggleLike({ id, type });
  }

  return {
    isLiked: isLiked ?? false,
    handleLike,
    isPending,
    isAuthenticated,
  };
}
