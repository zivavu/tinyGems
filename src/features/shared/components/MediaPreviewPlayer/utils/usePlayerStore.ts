import { create } from 'zustand';

interface PlayerState {
  currentPlayerId: string | null;
  players: Record<string, { pause: () => void }>;
  registerPlayerInTheStore: ({ id, pauseHandler }: { id: string; pauseHandler: () => void }) => void;
  setCurrentPlayer: (id: string) => void;
  pauseAll: (excludeId?: string) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentPlayerId: null,
  players: {},

  registerPlayerInTheStore: ({ id, pauseHandler }) => {
    set((state) => ({
      players: { ...state.players, [id]: { pause: pauseHandler } },
    }));
  },

  setCurrentPlayer: (newPlayerId) => {
    const { pauseAll, currentPlayerId } = get();
    if (currentPlayerId === newPlayerId) return;

    pauseAll(newPlayerId);
    set({ currentPlayerId: newPlayerId });
  },

  pauseAll: (excludeId) => {
    const { players } = get();
    Object.entries(players).forEach(([id, player]) => {
      if (id === excludeId) return;
      player.pause();
    });
  },
}));
