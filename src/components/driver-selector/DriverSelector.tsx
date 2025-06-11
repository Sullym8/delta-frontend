import { driverlist } from "../../data/driverlist";
import BottomSheet from "../bottom-sheet/BottomSheet";
import DriverCardSelector from "../driver-card-selector/DriverCardSelector";

const DriverSelector = () => {
  return (
    <BottomSheet baseHeightRatio={0.55} expandedHeightRatio={0.8}>
      <div className="flex flex-col gap-2">
        {driverlist.map((driver) => (
          <DriverCardSelector driver={driver} key={driver.driverCode} />
        ))}
      </div>
    </BottomSheet>
  );
};

export default DriverSelector;
