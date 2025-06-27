import { motion } from "framer-motion";
import { Race } from "../../types/race";

interface RaceCardProps {
  race: Race;
  isSelected: boolean;
  onSelect: (race: Race) => void;
}

const RaceCard = ({ race, isSelected, onSelect }: RaceCardProps) => {
  const baseClasses =
    "box-border m-0.5 p-4 flex flex-col justify-between ring-1 w-48 rounded-2xl flex-shrink-0 ring-white/10 transition-all duration-200 ease-in-out gap-1";
  const variableClasses = isSelected
    ? "bg-delta-active"
    : "bg-delta-container-bg";
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <div
        onClick={() => onSelect(race)}
        className={`${baseClasses} ${variableClasses}`}
      >
        <div className="flex flex-row justify-between items-center">
          <img
            src={`https://flagcdn.com/40x30/${race.countryCode}.png`}
            width="20"
            height="15"
            alt="Bahrain"
            className="self-center"
          />
          <div className="flex flex-col items-center px-2 py-1 rounded-full bg-delta-accent">
            <span className="text-xs font-bold">{`R${race.round}`}</span>
          </div>
          {/* <p className="font-black font-[Unbounded]">{`R${race.round}`}</p> */}
        </div>
        <div>
          <p className="text-2xl font-black truncate font-[Unbounded]">
            {race.country}
          </p>
          <p className="text-xs ">03 Mar - 05 Mar</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RaceCard;
