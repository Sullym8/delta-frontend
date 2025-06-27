import Pill from "../pill/Pill";
import { TbCheck, TbClock } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { TbFlag } from "react-icons/tb";
import { useRaceStore } from "../../store/RaceStore";
import CostCap from "../cost-cap/CostCap";

interface RaceHeaderProps {
  raceName: string;
  raceDate: Date;
  onEdit?: () => void;
  onViewBreakdown?: () => void;
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
  onEdit,
  onViewBreakdown,
}: RaceHeaderProps) => {
  const isEditing = useRaceStore((state) => state.isEditing);

  const timeStatus = isEditing
    ? { text: "Editing", icon: <TbPencil />, editable: true }
    : getTimeStatus(raceDate);

  const selectedDrivers = useRaceStore((state) => state.selectedDrivers);
  const totalCost = selectedDrivers.reduce(
    (total, driver) => total + driver.cost,
    0
  );

  return (
    <div className="bg-delta-active rounded-2xl ring-1 ring-white/10 p-4 flex flex-col flex-none justify-between gap-2.5 m-0.5 ">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-black font-[Unbounded] truncate">{`${raceName} ${
          isEditing ? "Fantasy" : ""
        }`}</h2>
        {!isEditing && (
          <Pill
            paddingScale={2}
            icon={timeStatus.icon}
            text={timeStatus.text}
            radius="full"
          />
        )}
      </div>
      <div className="flex flex-row justify-between items-center h-10">
        <div
          className={`flex flex-col ${timeStatus.editable ? "gap-1.5" : ""} `}
        >
          <div className="w-44 ">
            {timeStatus.editable ? (
              <>
                <span className="text-xs">Budget Left: </span>
                <span className="font-black">
                  ${(100.0 - totalCost).toFixed(1)}M
                </span>
              </>
            ) : (
              <span className="text-xs">Deck Score</span>
            )}
          </div>
          {timeStatus.editable ? (
            <CostCap />
          ) : (
            <span className="text-lg font-black font-[Unbounded]">
              +124 pts
            </span>
          )}
        </div>
        {timeStatus.editable ? (
          totalCost <= 100 ? (
            <Pill
              icon={!isEditing ? <TbPencil size={20} /> : <TbCheck size={20} />}
              paddingScale={2}
              backgroundColor="bg-delta-accent"
              onClick={onEdit}
              text={!isEditing ? "Edit" : ""}
            />
          ) : (
            <>
              <Pill
                paddingScale={2}
                backgroundColor="bg-delta-container"
                text="Over Budget"
              />
            </>
          )
        ) : (
          <Pill
            text="View Breakdown"
            paddingScale={2}
            backgroundColor="bg-delta-accent"
            onClick={onViewBreakdown}
          />
        )}
      </div>
    </div>
  );
};

export default RaceHeader;
