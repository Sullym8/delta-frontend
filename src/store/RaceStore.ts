import { create } from "zustand";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";

interface RaceState {
    selectedRace: Race;
    isEditing: boolean;
    selectRace: (race: Race) => void;
    toggleEdit: () => void;
}

export const useRaceStore = create<RaceState>((set) => ({
    selectedRace: racelist[0],
    isEditing: false,
    selectRace: (race: Race) => set({ selectedRace: race }),
    toggleEdit: () => set((state) => ({ isEditing: !state.isEditing })),
}))