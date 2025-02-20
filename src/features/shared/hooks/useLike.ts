'use client';

import { authClient } from '@/lib/authClient';
import { trpcReact } from '@/lib/trpcReact';
import { LikeType } from '@/server/fetching/routers/userRouter';
import { toast } from 'sonner';

interface UseLikeProps {
  itemId: string;
  type: LikeType;
  title?: string;
}

export function useLike({ itemId, type, title }: UseLikeProps) {
  const session = authClient.useSession();
  const isAuthenticated = !!session.data?.user;

  const { data: likes } = trpcReact.userRouter.getLikes.useQuery({ type }, { enabled: isAuthenticated });
  const utils = trpcReact.useUtils();

  const isLiked = likes?.includes(itemId);

  const { mutate: toggleLike, isPending } = trpcReact.userRouter.toggleLike.useMutation({
    onMutate: async () => {
      // Cancel outgoing refetches
      await utils.userRouter.getLikes.cancel({ type });

      // Get current likes
      const previousLikes = utils.userRouter.getLikes.getData({ type });

      // Optimistically update likes
      utils.userRouter.getLikes.setData({ type }, (old) => {
        if (!old) return [itemId];
        return isLiked ? old.filter((likeId) => likeId !== itemId) : [...old, itemId];
      });

      // Show toast with undo button
      const toastMessage = isLiked ? 'Removed from library' : 'Added to library';
      const itemTitle = title ? ` - ${title}` : '';

      toast(toastMessage + itemTitle, {
        action: {
          label: 'Undo',
          onClick: () => {
            toggleLike({ id: itemId, type });
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
    toggleLike({ id: itemId, type });
  }

  if (!isAuthenticated) {
    return {
      isLiked: false,
      handleLike: () => {
        toast.error('Please sign in to like the content');
      },
      isPending: false,
    };
  }

  return {
    isLiked: isLiked ?? false,
    handleLike,
    isPending,
    isAuthenticated,
  };
}
