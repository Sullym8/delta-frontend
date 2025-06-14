import { useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import Modal from "../modal/Modal";
import DriverCard from "../driver-card/DriverCard";
import { useRaceStore } from "../../store/RaceStore";
import { Driver } from "../../types/driver";
import { AnimatePresence, motion } from "framer-motion";

interface DriverCardSelectorProps {
  driver: Driver;
}

const DriverCardSelector = ({ driver }: DriverCardSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addDriver = useRaceStore((state) => state.addDriver);
  const removeDriver = useRaceStore((state) => state.removeDriver);
  const hasDriverBeenAdded = useRaceStore((state) =>
    state.selectedDrivers.some((d) => d.driverCode === driver.driverCode)
  );

  const handleAddDriver = () => {
    addDriver(driver);
  };

  const handleRemoveDriver = () => {
    removeDriver(driver.driverCode);
  };

  return (
    <>
      <div className="rounded-xl flex flex-col bg-delta-container-bg ring-1 ring-[#FFF]/10 flex-shrink-0 m-0.5 relative">
        <div onClick={() => setIsModalOpen(true)} className="">
          <div
            style={{
              backgroundColor: driver.colors.main,
              color: driver.colors.accent,
            }}
            className="h-20 rounded-t-xl flex relative pt-1 justify-center overflow-hidden items-center"
          >
            <img
              className="h-full w-full object-contain z-10"
              src={driver.driverImage}
              alt=""
            />
            <img
              className="absolute h-3/4 w-3/4 object-contain opacity-50"
              src={driver.teamImage}
              alt=""
            />
          </div>
          <div
            style={{
              background: `linear-gradient(to bottom,${driver.colors.main}40 0%, #15151D 100%)`,
              color:
                driver.colors.secondary != undefined
                  ? driver.colors.secondary
                  : driver.colors.accent,
            }}
            className=" flex flex-col p-2 items-center rounded-b-xl"
          >
            <div className="flex flex-row justify-between w-full">
              <p className="font-black text-base">
                {`${driver.driverName} • ${driver.driverCode}`}
              </p>
              <p className="font-black text-base">{`$${driver.cost}M`}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs">{driver.teamName}</p>
              <p className="text-xs">{`▲ ${driver.deltaCost}M`}</p>
            </div>
          </div>
        </div>

        <motion.div
          className="rounded-full p-1 absolute right-1 top-1 z-20"
          animate={{
            backgroundColor: hasDriverBeenAdded ? "#DC2626" : "#000000",
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <AnimatePresence mode="wait">
            {!hasDriverBeenAdded ? (
              <motion.div
                key="plus"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{
                  duration: 0.2,
                }}
                onClick={handleAddDriver}
              >
                <TbPlus className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="x"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{
                  duration: 0.2,
                }}
                onClick={handleRemoveDriver}
              >
                <TbX className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DriverCard
          driver={driver}
          rating={0}
          race={0}
          consistency={0}
          reliability={0}
          AI_Qualifying={""}
          AI_Race={""}
        />
      </Modal>
    </>
  );
};

export default DriverCardSelector;
