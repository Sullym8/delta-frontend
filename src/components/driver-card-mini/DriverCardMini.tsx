import { TbX } from "react-icons/tb";
import { Driver } from "../../types/driver";

interface DriverCardProps {
  driver: Driver;
  removeDriver: (driverCode: string) => void;
}

const DriverCardMini = ({ driver, removeDriver }: DriverCardProps) => {
  return (
    <div className="w-[140px] h-[120px] rounded-xl flex flex-col bg-delta-container-bg ring-1 ring-[#FFF]/10 flex-shrink-0 m-0.5 relative">
      <div
        style={{ background: driver.colors.main }}
        className="w-full h-2/3 rounded-t-xl flex flex-col relative overflow-hidden pt-1 justify-center items-center"
      >
        <img
          className="h-full w-full object-contain flex-shrink-0 flex-grow-0 z-10"
          src={driver.driverImage}
          alt=""
        />
        <img
          className="w-3/4 h-3/4 object-contain absolute opacity-50 "
          src={driver.teamImage}
          alt=""
        />
      </div>
      <div
        style={{
          background: `linear-gradient(to bottom,${driver.colors.main}40 0%, #15151D 100%)`,
        }}
        className="h-1/3 flex p-2 items-center rounded-b-xl"
      >
        <div className="flex flex-row justify-between w-full">
          <p
            style={{
              color:
                driver.colors.secondary != undefined
                  ? driver.colors.secondary
                  : driver.colors.accent,
            }}
            className="font-black text-base"
          >
            {driver.driverCode}
          </p>
          <p
            style={{
              color:
                driver.colors.secondary != undefined
                  ? driver.colors.secondary
                  : driver.colors.accent,
            }}
            className="font-black text-base"
          >{`$${driver.cost}M`}</p>
        </div>
      </div>
      <div className="bg-black rounded-full p-1 absolute right-1 top-1 z-20">
        <span onClick={() => removeDriver(driver.driverCode)}>
          <TbX />
        </span>
      </div>
    </div>
  );
};

export default DriverCardMini;
