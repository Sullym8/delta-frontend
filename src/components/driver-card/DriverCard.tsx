import { Driver } from "../../types/driver";
import Pill from "../pill/Pill";
import { TbSparkles } from "react-icons/tb";

interface DriverCardProps {
  driver: Driver;
  rating: number;
  race: number;
  consistency: number;
  reliability: number;
  AI_Qualifying: string;
  AI_Race: string;
}

const DriverCard = ({
  driver,
  rating = 94,
  race = 93,
  consistency = 32,
  reliability = 43,
  AI_Qualifying = "Q3",
  AI_Race = "P3",
}: DriverCardProps) => {
  return (
    <div className="w-[250px] h-[325px] rounded-2xl flex flex-col bg-delta-container-bg ring-2 ring-[#FFF]/10">
      <div className="absolute z-30 top-4 right-4">
        <Pill
          icon={<TbSparkles color="#EFBF04" />}
          text={`${AI_Qualifying}, ${AI_Race}`}
          radius="full"
          paddingScale={1}
          backgroundColor="bg-delta-accent"
        />
      </div>
      <div
        style={{
          backgroundColor: driver.colors.main,
          color: driver.colors.accent,
        }}
        className={`w-full h-[250px] rounded-t-2xl flex flex-col relative p-4 pb-2 overflow-hidden justify-between`}
      >
        <div>
          <p className="text-base font-black">RTG</p>
          <p className="font-black text-2xl leading-none font-[Unbounded]">
            {rating}
          </p>
        </div>
        <div>
          <p className="text-base font-black">RAC</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {race}
          </p>
        </div>
        <div>
          <p className="text-base font-black">CON</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {consistency}
          </p>
        </div>
        <div>
          <p className="text-base font-black">REL</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {reliability}
          </p>
        </div>
        <img
          className="w-[210px] absolute right-0 bottom-0 z-10"
          src={driver.driverImage}
          alt=""
        />
        <img
          className="absolute -right-1/4 h-full object-contain opacity-50"
          src={driver.teamImage}
          alt=""
        />
        <div className="flex flex-row gap-2 z-20">
          <Pill
            text={`$${driver.cost.toString()}M`}
            radius="full"
            paddingScale={1}
            textColor="text-white"
          />
          <Pill
            text={`+${driver.deltaCost.toString()}M`}
            radius="full"
            paddingScale={1}
            backgroundColor="bg-green-600"
            textColor="text-black"
          />
        </div>
      </div>
      <div
        style={{
          background: `linear-gradient(to bottom,${driver.colors.main}40 0%, #15151D 100%)`,
        }}
        className={`h-[75px] flex p-4 items-center rounded-b-2xl`}
      >
        <div className="flex flex-col ">
          <p
            style={{
              color:
                driver.colors.secondary != undefined
                  ? driver.colors.secondary
                  : driver.colors.accent,
            }}
            className="font-black text-2xl"
          >
            {driver.driverName}
          </p>
          <p
            style={{
              color:
                driver.colors.secondary != undefined
                  ? driver.colors.secondary
                  : driver.colors.accent,
            }}
            className=" text-xs"
          >
            {driver.teamName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
