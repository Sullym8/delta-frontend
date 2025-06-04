import RaceCard from "../components/race-card/RaceCard";
import { useRaceStore } from "../store/RaceStore";
import { useState } from "react";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";
import RaceHeader from "../components/race-header/RaceHeader";
import CardStack from "../components/card-stack/CardStack";
import DriverCard from "../components/driver-card/DriverCard";

const Fantasy = () => {
  const [races] = useState<Race[]>(racelist);

  const { selectedRace, isEditing, selectRace, toggleEdit } = useRaceStore();

  // const [selectedRace, setSelectedRace] = useState<Race>(racelist[0]);
  // const [isEditing, setIsEditing] = useState(false);

  // const handleRaceSelect = (race: Race) => {
  //   setSelectedRace(race);
  // };

  // const toggleEdit = () => {
  //   setIsEditing((prev) => !prev);
  // };

  return (
    <div className="flex flex-col gap-4">
      {!isEditing ? (
        <>
          <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-4 p-1">
            {races.map((race) => (
              <RaceCard
                key={race.id}
                race={race}
                isSelected={race.id === selectedRace.id}
                onSelect={selectRace}
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
              cards={[
                <DriverCard
                  driverName={""}
                  teamName={""}
                  rating={0}
                  race={0}
                  consistency={0}
                  reliability={0}
                  cost={0}
                  deltaCost={0}
                  AI_Qualifying={""}
                  AI_Race={""}
                  driverImage={""}
                  teamImage={""}
                />,
              ]}
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
        </>
      )}
    </div>
  );
};

export default Fantasy;
