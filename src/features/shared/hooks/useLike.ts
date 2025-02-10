'use client';

import { authClient } from '@/lib/authClient';
import { trpc } from '@/lib/trpc';
import { LikeType } from '@/server/routers/userRouter';
import { toast } from 'sonner';

interface UseLikeProps {
  id: string;
  type: LikeType;
  title?: string;
}

export function useLike({ id, type, title }: UseLikeProps) {
  const session = authClient.useSession();
  const isAuthenticated = !!session.data?.user;

  if (!isAuthenticated) {
    return {
      isLiked: false,
      handleLike: () => {
        toast.error('Please sign in to like content');
      },
      isPending: false,
    };
  }

  const { data: likes } = trpc.userRouter.getLikes.useQuery({ type });
  const utils = trpc.useUtils();

  const isLiked = likes?.includes(id);

  const { mutate: toggleLike, isPending } = trpc.userRouter.toggleLike.useMutation({
    onMutate: async () => {
      // Cancel outgoing refetches
      await utils.userRouter.getLikes.cancel({ type });

      // Get current likes
      const previousLikes = utils.userRouter.getLikes.getData({ type });

      // Optimistically update likes
      utils.userRouter.getLikes.setData({ type }, (old) => {
        if (!old) return [id];
        return isLiked ? old.filter((likeId) => likeId !== id) : [...old, id];
      });

      // Show toast with undo button
      const toastMessage = isLiked ? 'Removed from library' : 'Added to library';
      const itemTitle = title ? ` - ${title}` : '';

      toast(toastMessage + itemTitle, {
        action: {
          label: 'Undo',
          onClick: () => {
            toggleLike({ id, type });
          },
        },
        duration: 4000,
      });

      return { previousLikes };
    },
    onError: (_, __, context) => {
      // Revert optimistic update on error
      utils.userRouter.getLikes.setData({ type }, context?.previousLikes);
      toast.error('Something went wrong');
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
