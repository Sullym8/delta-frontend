import Pill from "../pill/Pill";
import { TbCheck, TbClock } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { TbFlag } from "react-icons/tb";
import { useRaceStore } from "../../store/RaceStore";

interface RaceHeaderProps {
  raceName: string;
  raceDate: Date;
  costCap: number;
  onEdit?: () => void;
}

interface TimeStatus {
  text: string;
  icon?: JSX.Element;
  editable: boolean;
}

const getTimeStatus = (raceDate: Date): TimeStatus => {
  const now = new Date();

  const diff = raceDate.getTime() - now.getTime();

  // Convert to days, hours, minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < -2) {
    return {
      text: "Finished",
      icon: <TbFlag />,
      editable: false,
    };
  } else if (hours < 0) {
    return {
      text: "In Progress",
      editable: false,
    };
  }
  return {
    text: `${days}d ${hours}h ${minutes}m`,
    icon: <TbClock />,
    editable: true,
  };
};

const RaceHeader = ({
  raceName,
  raceDate,
  costCap,
  onEdit,
}: RaceHeaderProps) => {
  const isEditing = useRaceStore((state) => state.isEditing);

  const timeStatus = isEditing
    ? { text: "Editing", icon: <TbPencil />, editable: true }
    : getTimeStatus(raceDate);

  return (
    <div className="bg-delta-active rounded-2xl ring-1 ring-white/10 p-4 flex flex-col justify-between gap-2 m-0.5">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white">{`${
          isEditing ? "My Team -" : ""
        } ${raceName}`}</h2>
        {!isEditing && (
          <Pill icon={timeStatus.icon} text={timeStatus.text} radius="full" />
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className={`flex flex-col ${timeStatus.editable ? "gap-1" : ""} `}>
          <div className="w-44 ">
            {timeStatus.editable ? (
              <>
                <span className="text-xs">Cost: </span>
                <span className="font-black">${costCap}M</span>
              </>
            ) : (
              <span className="text-xs">Deck Score</span>
            )}
          </div>
          {timeStatus.editable ? (
            <div className="h-2 bg-green-600 rounded-full flex-auto" />
          ) : (
            <span className="text-lg font-black font-[Unbounded]">
              +124 pts
            </span>
          )}
        </div>
        {timeStatus.editable ? (
          <Pill
            icon={!isEditing ? <TbPencil size={20} /> : <TbCheck size={20} />}
            paddingScale={2}
            backgroundColor="bg-delta-accent"
            onClick={onEdit}
          />
        ) : (
          <Pill
            text="View Breakdown"
            paddingScale={2}
            backgroundColor="bg-delta-accent"
          />
        )}
      </div>
    </div>
  );
};

export default RaceHeader;
