import { create } from "zustand";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";
import { Driver } from "../types/driver";

interface RaceState {
    selectedRace: Race;
    isEditing: boolean;
    isVieiwingBreakdown: boolean;
    selectedDrivers: Driver[];
    selectRace: (race: Race) => void;
    toggleEdit: () => void;
    addDriver: (driver: Driver) => void;
    removeDriver: (driverCode: string) => void;
    clearDrivers: () => void;
    toggleViewBreakdown: () => void;
}

const selectedDrivers : Driver[] = [];

export const useRaceStore = create<RaceState>((set) => ({
    selectedRace: racelist[0],
    isEditing: false,
    selectedDrivers: selectedDrivers,
    isVieiwingBreakdown: false,
    toggleViewBreakdown: () => set((state) => ({ isVieiwingBreakdown: !state.isVieiwingBreakdown })),
    selectRace: (race: Race) => set({ selectedRace: race }),
    toggleEdit: () => set((state) => ({ isEditing: !state.isEditing })),
    addDriver: (driver: Driver) => 
        set((state) => ({
            selectedDrivers: [...state.selectedDrivers, driver]
        })),
    removeDriver: (driverCode: string) =>
        set((state) => ({
            selectedDrivers: state.selectedDrivers.filter(d => d.driverCode !== driverCode)
        })),
    clearDrivers: () => set({ selectedDrivers: [] }),

}))