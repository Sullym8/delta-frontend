import RaceCard from "../components/race-card/RaceCard";
import { useRaceStore } from "../store/RaceStore";
import { useEffect, useState } from "react";
import { Race } from "../types/race";
import RaceHeader from "../components/race-header/RaceHeader";
import CardStack from "../components/card-stack/CardStack";
import DriverCard from "../components/driver-card/DriverCard";
import DriverCardMini from "../components/driver-card-mini/DriverCardMini";
import DriverSelector from "../components/driver-selector/DriverSelector";
import { AnimatePresence, motion } from "framer-motion";
import { TbArrowBigDownLine } from "react-icons/tb";
import BreakdownModal from "../components/breakdown-modal/BreakdownModal";
import { useAuth } from "../context/AuthContext";

const Fantasy = () => {
  // const [races] = useState<Race[]>(racelist);
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    selectedRace,
    isEditing,
    selectedDrivers,
    selectRace,
    toggleEdit,
    removeDriver,
    loadFantasyForRace,
    saveFantasyForRace,
  } = useRaceStore();

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://delta-backend-wj7b.onrender.com/api/races/upto"
        );
        const races = await response.json();
        setRaces(races);

        if (races.length > 0) {
          selectRace(races[0]);
        }
      } catch (err) {
        setError("Failed to fetch races");
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [selectRace]);

  // Load fantasy data when race changes or user changes
  useEffect(() => {
    if (user && selectedRace) {
      loadFantasyForRace(user.id, selectedRace.year, selectedRace.round);
    }
  }, [user, selectedRace, loadFantasyForRace]);

  // Auto-save fantasy when drivers change (debounced)
  useEffect(() => {
    if (!user || !selectedRace || selectedDrivers.length === 0) return;

    const timeoutId = setTimeout(() => {
      saveFantasyForRace(user.id, selectedRace.year, selectedRace.round);
    }, 2000); // Save after 2 seconds of no changes

    return () => clearTimeout(timeoutId);
  }, [user, selectedRace, selectedDrivers, saveFantasyForRace]);

  const handleSelectRace = (race: Race) => {
    selectRace(race);
  };

  const [isViewingBreakdown, setViewingBreakdown] = useState(false);

  const handleOpenBreakdown = () => {
    setViewingBreakdown(true);
  };

  const handleCloseBreakdown = () => {
    setViewingBreakdown(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 h-full">
        {loading && <div className="text-center py-4">Loading races...</div>}
        {/* {fantasyLoading && (
          <div className="text-center py-4">Loading fantasy data...</div>
        )} */}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!loading &&
          !error &&
          (!isEditing ? (
            <>
              <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-2.5 flex-shrink-0">
                {races.map((race) => (
                  <RaceCard
                    key={race.id}
                    race={race}
                    isSelected={race.id === selectedRace.id}
                    onSelect={handleSelectRace}
                  />
                ))}
              </div>
              <div className="flex-shrink-0">
                <RaceHeader
                  raceName={`${selectedRace.country} GP` || "Select a race"}
                  raceDate={new Date(selectedRace.date)}
                  onEdit={toggleEdit}
                  onViewBreakdown={handleOpenBreakdown}
                />
              </div>
              <div className="flex flex-col flex-1 min-h-0">
                {selectedDrivers.length > 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <CardStack
                      cards={selectedDrivers.map((driver) => (
                        <DriverCard
                          driver={driver}
                          key={driver.driverCode}
                          rating={0}
                          race={0}
                          consistency={0}
                          reliability={0}
                          AI_Qualifying={""}
                          AI_Race={""}
                        />
                      ))}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center ring-1 ring-white/10 rounded-2xl mb-4">
                    <p className="font-black text-lg font-[Unbounded]">
                      No Fantasy built!
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex-shrink-0">
                <RaceHeader
                  raceName={`${selectedRace.country}` || "Select a race"}
                  raceDate={new Date(selectedRace.date)}
                  onEdit={toggleEdit}
                />
              </div>
              {selectedDrivers.length > 0 ? (
                <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-2 flex-shrink-0">
                  <AnimatePresence>
                    {selectedDrivers.map((driver, index) => (
                      <motion.div
                        key={driver.driverCode}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.05, // Stagger the animations
                          ease: "easeInOut",
                        }}
                      >
                        <DriverCardMini
                          driver={driver}
                          removeDriver={removeDriver}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center ring-1 ring-white/10 rounded-2xl h-[120px] gap-4 p-4 flex-shrink-0">
                  <p className="font-black text-lg font-[Unbounded]">
                    Draft your lineup below!
                  </p>
                  <TbArrowBigDownLine className="animate-bounce" size={24} />
                </div>
              )}
              <div className="flex-1 min-h-0">
                <DriverSelector />
              </div>
            </>
          ))}
      </div>
      <BreakdownModal
        isOpen={isViewingBreakdown}
        onClose={handleCloseBreakdown}
      >{`Hi`}</BreakdownModal>
    </>
  );
};

export default Fantasy;
