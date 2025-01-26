import { create } from 'zustand';

interface PlayerState {
  currentPlayingId: string | null;
  setCurrentPlaying: (id: string | null) => void;
  stopCurrentPlaying: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentPlayingId: null,
  setCurrentPlaying: (id) => set({ currentPlayingId: id }),
  stopCurrentPlaying: () => set({ currentPlayingId: null }),
}));
