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

    console.log('setting new player id', newPlayerId);
    pauseAll(newPlayerId);
    set({ currentPlayerId: newPlayerId });
  },

  pauseAll: (excludeId) => {
    const { players } = get();
    console.log('pauseAll', players, excludeId);
    Object.entries(players).forEach(([id, player]) => {
      if (id === excludeId) return;
      console.log('pausing player', id, excludeId);
      player.pause();
    });
  },
}));
