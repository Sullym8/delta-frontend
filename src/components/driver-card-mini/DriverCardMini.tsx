import { TbX } from "react-icons/tb";

interface DriverCardProps {
  driverCode: string;
  cost: number;
  driverImage: string;
  teamImage: string;
  deleteDriver: (driverCode: string) => void;
}

const DriverCardMini = ({
  driverCode = "NOR",
  cost = 32.1,
  driverImage = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png",
  teamImage = "src/assets/mclaren.png",
  deleteDriver,
}: DriverCardProps) => {
  return (
    <div className="w-[140px] h-[120px] rounded-xl flex flex-col bg-delta-container-bg ring-1 ring-[#FFF]/10 flex-shrink-0 m-0.5 relative">
      <div className="w-full h-2/3 bg-[#DE6A10] rounded-t-xl flex flex-col relative overflow-hidden pt-1">
        <img
          className="h-full w-full object-contain flex-shrink-0 flex-grow-0 z-10"
          src={driverImage}
          alt=""
        />
        <img
          className="w-full absolute -top-5 opacity-50 "
          src={teamImage}
          alt=""
        />
      </div>
      <div className="h-1/3 flex p-2 bg-gradient-to-b from-[#DE6A10]/10 to-delta-active items-center rounded-b-xl">
        <div className="flex flex-row justify-between w-full">
          <p className="text-[#DE6A10] font-black text-base">{driverCode}</p>
          <p className="text-[#DE6A10] font-black text-base">{`$${cost}M`}</p>
        </div>
      </div>
      <div className="bg-black rounded-full p-1 absolute right-1 top-1 z-20">
        <span onClick={() => deleteDriver(driverCode)}>
          <TbX />
        </span>
      </div>
    </div>
  );
};

export default DriverCardMini;
