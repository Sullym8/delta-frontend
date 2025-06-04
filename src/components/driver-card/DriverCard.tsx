import Pill from "../pill/Pill";
import { TbSparkles } from "react-icons/tb";

interface DriverCardProps {
  driverName: string;
  teamName: string;
  rating: number;
  race: number;
  consistency: number;
  reliability: number;
  cost: number;
  deltaCost: number;
  AI_Qualifying: string;
  AI_Race: string;
  driverImage: string;
  teamImage: string;
}

const DriverCard = ({
  driverName = "Lando Norris",
  teamName = "McLaren Racing",
  rating = 94,
  race = 93,
  consistency = 32,
  reliability = 43,
  cost = 32.1,
  deltaCost = 0.6,
  AI_Qualifying = "Q3",
  AI_Race = "P3",
  driverImage = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
  teamImage = "src/assets/mclaren.png",
}: DriverCardProps) => {
  return (
    <div className="w-[250px] h-[350px] rounded-2xl flex flex-col bg-delta-container-bg ring-2 ring-[#DE6A10]/10 ">
      <div className="absolute z-30 top-4 right-4">
        <Pill
          icon={<TbSparkles color="#EFBF04" />}
          text={`${AI_Qualifying}, ${AI_Race}`}
          radius="full"
          paddingScale={1}
          backgroundColor="bg-delta-accent"
        />
      </div>
      <div className="w-full h-[250px] bg-[#DE6A10] rounded-t-2xl flex flex-col relative p-4 pb-2 overflow-hidden justify-between">
        <div className="text-black">
          <p className="text-base font-black">RTG</p>
          <p className="font-black text-2xl leading-none font-[Unbounded]">
            {rating}
          </p>
        </div>
        <div className="text-black">
          <p className="text-base font-black">RAC</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {race}
          </p>
        </div>
        <div className="text-black">
          <p className="text-base font-black">CON</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {consistency}
          </p>
        </div>
        <div className="text-black">
          <p className="text-base font-black">REL</p>
          <p className="font-black text-lg leading-none font-[Unbounded]">
            {reliability}
          </p>
        </div>
        <img
          className="w-[210px] absolute right-0 bottom-0 z-10"
          src={driverImage}
          alt=""
        />
        <img
          className="w-64 absolute -right-24 -top-8 opacity-50"
          src={teamImage}
          alt=""
        />
        <div className="flex flex-row gap-2 z-20">
          <Pill
            text={`$${cost.toString()}M`}
            radius="full"
            paddingScale={1}
            textColor="text-[#DE6A10]"
          />
          <Pill
            text={`+${deltaCost.toString()}M`}
            radius="full"
            paddingScale={1}
            backgroundColor="bg-green-600"
            textColor="text-black"
          />
        </div>
      </div>
      <div className="flex p-4 bg-gradient-to-b from-[#DE6A10]/10 items-center">
        <div className="flex flex-col ">
          <p className="text-[#DE6A10] font-black text-3xl">{driverName}</p>
          <p className="text-[#DE6A10] text-xs">{teamName}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
