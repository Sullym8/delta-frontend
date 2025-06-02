import { Race } from "../../types/race";

interface RaceCardProps {
  race: Race;
  isSelected: boolean;
  onSelect: (raceId: number) => void;
}

const RaceCard = ({ race, isSelected, onSelect }: RaceCardProps) => {
  const baseClasses =
    "p-4 flex flex-col justify-between ring-1 w-44 rounded-2xl flex-shrink-0 ring-white/10 transition-all duration-200 ease-in-out";
  const variableClasses = isSelected
    ? "bg-delta-active"
    : "bg-delta-container-bg";
  return (
    <div
      onClick={() => onSelect(race.id)}
      className={`${baseClasses} ${variableClasses}`}
    >
      <div className="flex flex-row justify-between">
        <img
          src={`https://flagcdn.com/40x30/${race.countryCode}.png`}
          width="20"
          height="15"
          alt="Bahrain"
          className="self-center"
        />
        <p className="text-xs font-black">{`R${race.round}`}</p>
      </div>
      <p className="text-2xl font-black truncate">{race.country}</p>
      <p className="text-xs">03 Mar - 05 Mar</p>
    </div>
  );
};

export default RaceCard;
