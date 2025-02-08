'use client';

import { trpc } from '@/lib/trpc';
import { useCallback, useState } from 'react';

interface UseLikeProps {
  id: string;
  type: 'song' | 'album' | 'artist';
  initialLiked?: boolean;
}

export function useLike({ id, type, initialLiked = false }: UseLikeProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const utils = trpc.useUtils();

  const { mutate: toggleLike, isPending } = trpc.library.toggleLike.useMutation({
    onMutate: async () => {
      // Optimistically update UI
      setIsLiked((prev) => !prev);

      // Store previous state for rollback
      const previous = utils.library.getLikes.getData();

      return { previous };
    },
    onError: (err, _, context) => {
      // Rollback on error
      setIsLiked(initialLiked);
      if (context?.previous) {
        utils.library.getLikes.setData(undefined, context.previous);
      }
    },
    onSettled: () => {
      // Refetch to ensure sync
      utils.library.getLikes.invalidate();
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
