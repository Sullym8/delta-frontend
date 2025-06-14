import RaceCard from "../components/race-card/RaceCard";
import { useRaceStore } from "../store/RaceStore";
import { useState } from "react";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";
import RaceHeader from "../components/race-header/RaceHeader";
import CardStack from "../components/card-stack/CardStack";
import DriverCard from "../components/driver-card/DriverCard";
import DriverCardMini from "../components/driver-card-mini/DriverCardMini";
import DriverSelector from "../components/driver-selector/DriverSelector";
import { AnimatePresence, motion } from "framer-motion";
import { TbArrowBigDownLine } from "react-icons/tb";

const Fantasy = () => {
  const [races] = useState<Race[]>(racelist);

  const {
    selectedRace,
    isEditing,
    selectedDrivers,
    selectRace,
    toggleEdit,
    removeDriver,
  } = useRaceStore();

  const handleSelectRace = (race: Race) => {
    selectRace(race);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {!isEditing ? (
        <>
          <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-2.5">
            {races.map((race) => (
              <RaceCard
                key={race.id}
                race={race}
                isSelected={race.id === selectedRace.id}
                onSelect={handleSelectRace}
              />
            ))}
          </div>
          <RaceHeader
            raceName={`${selectedRace.country} GP` || "Select a race"}
            raceDate={new Date(selectedRace.date)}
            onEdit={toggleEdit}
          />
          <div className="flex items-center justify-center">
            {selectedDrivers.length > 0 ? (
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
            ) : (
              <>Missing</>
            )}
            {/* <img src="src\assets\card.png" className="rounded-2xl h-80" /> */}
          </div>
        </>
      ) : (
        <>
          <RaceHeader
            raceName={`${selectedRace.country}` || "Select a race"}
            raceDate={new Date(selectedRace.date)}
            onEdit={toggleEdit}
          />
          {selectedDrivers.length > 0 ? (
            <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-2">
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
            <div className="flex flex-col items-center justify-center ring-1 ring-white/10 rounded-2xl h-[120px] gap-4 p-4 ">
              <p className="font-black text-lg font-[Unbounded]">
                Draft your lineup below!
              </p>
              <TbArrowBigDownLine className="animate-bounce" size={24} />
            </div>
          )}
          <DriverSelector />
        </>
      )}
    </div>
  );
};

export default Fantasy;
