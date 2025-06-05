import { create } from "zustand";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";
import { Driver } from "../types/driver";

interface RaceState {
    selectedRace: Race;
    isEditing: boolean;
    selectedDrivers: Driver[];
    selectRace: (race: Race) => void;
    toggleEdit: () => void;
    addDriver: (driver: Driver) => void;
    removeDriver: (driverCode: string) => void;
    clearDrivers: () => void;
}

const selectedDrivers = [
    {
        driverCode: 'NOR',
        cost: 32.4,
        driverName: 'Lando Norris',
        teamName: 'McLaren Racing'
    },
    {
        driverCode: 'LEC',
        cost: 35.0,
        driverName: 'Charles Leclerc',
        teamName: 'Scuderia Ferrari'
    }, 
    {
        driverCode: 'VER',
        cost: 40.0,
        driverName: 'Max Verstappen',
        teamName: 'Red Bull Racing'
    }
]

export const useRaceStore = create<RaceState>((set) => ({
    selectedRace: racelist[0],
    isEditing: false,
    selectedDrivers: selectedDrivers,
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
    clearDrivers: () => set({ selectedDrivers: [] })
}))