import { create } from "zustand";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";
import { Driver } from "../types/driver";
import { FantasyService, FantasyTeamWithDrivers } from "../services/fantasyService";

interface RaceState {
    selectedRace: Race;
    isEditing: boolean;
    isVieiwingBreakdown: boolean;
    selectedDrivers: Driver[];
    isLoading: boolean;
    selectRace: (race: Race) => void;
    toggleEdit: () => void;
    addDriver: (driver: Driver) => void;
    removeDriver: (driverCode: string) => void;
    clearDrivers: () => void;
    toggleViewBreakdown: () => void;
    loadFantasyForRace: (userId: string, year: number, round: number) => Promise<void>;
    saveFantasyForRace: (userId: string, year: number, round: number) => Promise<boolean>;
}

const selectedDrivers : Driver[] = [];

export const useRaceStore = create<RaceState>((set, get) => ({
    selectedRace: racelist[0],
    isEditing: false,
    selectedDrivers: selectedDrivers,
    isVieiwingBreakdown: false,
    isLoading: false,
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
    loadFantasyForRace: async (userId: string, year: number, round: number) => {
        set({ isLoading: true });
        try {
            const fantasy: FantasyTeamWithDrivers | null = await FantasyService.loadFantasy(userId, year, round);
            if (fantasy) {
                set({ selectedDrivers: fantasy.drivers });
            } else {
                set({ selectedDrivers: [] });
            }
        } catch (error) {
            console.error("Error loading fantasy:", error);
            set({ selectedDrivers: [] });
        } finally {
            set({ isLoading: false });
        }
    },
    saveFantasyForRace: async (userId: string, year: number, round: number) => {
        const state = get();
        set({ isLoading: true });
        try {
            const result = await FantasyService.saveFantasy(userId, year, round, state.selectedDrivers);
            return result !== null;
        } catch (error) {
            console.error("Error saving fantasy:", error);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
}))