import { create } from 'zustand';

interface PlayerState {
  currentPlayerId: string | null;
  players: Record<string, { pause: () => void }>;
  registerPlayer: (id: string, pauseHandler: () => void) => void;
  unregisterPlayer: (id: string) => void;
  play: (id: string) => void;
  pauseAll: (excludeId?: string) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentPlayerId: null,
  players: {},

  registerPlayer: (id, pauseHandler) => {
    set((state) => ({
      players: { ...state.players, [id]: { pause: pauseHandler } },
    }));
  },

  unregisterPlayer: (id) => {
    set((state) => {
      const { [id]: _, ...remaining } = state.players;
      return { players: remaining };
    });
  },

  play: (id) => {
    const { pauseAll, currentPlayerId } = get();
    if (currentPlayerId !== id) {
      pauseAll(id);
      set({ currentPlayerId: id });
    }
  },

  pauseAll: (excludeId) => {
    const { players } = get();
    Object.entries(players).forEach(([id, player]) => {
      if (id !== excludeId) player.pause();
    });
  },
}));
