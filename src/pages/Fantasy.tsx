import RaceCard from "../components/race-picker/RaceCard";
import { useState } from "react";
import { Race } from "../types/race";
import { racelist } from "../data/racelist";

const Fantasy = () => {
  const [races] = useState<Race[]>(racelist);

  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  const handleRaceSelect = (raceId: number) => {
    setSelectedRaceId(raceId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row overflow-x-auto no-scrollbar justify-start gap-4 p-1">
        {races.map((race) => (
          <RaceCard
            key={race.id}
            race={race}
            isSelected={race.id === selectedRaceId}
            onSelect={handleRaceSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Fantasy;
