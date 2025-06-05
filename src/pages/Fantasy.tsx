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
            costCap={100.0}
            onEdit={toggleEdit}
          />
          <div className="flex items-center justify-center">
            <CardStack
              cards={selectedDrivers.map((driver) => (
                <DriverCard
                  key={driver.driverCode}
                  driverName={driver.driverName}
                />
              ))}
            />
            {/* <img src="src\assets\card.png" className="rounded-2xl h-80" /> */}
          </div>
        </>
      ) : (
        <>
          <RaceHeader
            raceName={`${selectedRace.country} GP` || "Select a race"}
            raceDate={new Date(selectedRace.date)}
            costCap={100.0}
            onEdit={toggleEdit}
          />
          <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-2">
            {selectedDrivers.map((driver) => (
              <DriverCardMini
                key={driver.driverCode}
                driverCode={driver.driverCode}
                deleteDriver={removeDriver}
              />
            ))}
          </div>
          <DriverSelector />
        </>
      )}
    </div>
  );
};

export default Fantasy;
