import { useEffect, useState } from "react";
import { driverlist } from "../../data/driverlist";
import BottomSheet from "../bottom-sheet/BottomSheet";
import DriverCardSelector from "../driver-card-selector/DriverCardSelector";

const DriverSelector = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/drivers");
        const drivers = await response.json();
        setDrivers(drivers);
      } catch (err) {
        setError("Failed to fetch races");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <BottomSheet baseHeightRatio={0.55} expandedHeightRatio={0.8}>
      <div className="flex flex-col gap-2">
        {drivers.map((driver) => (
          <DriverCardSelector driver={driver} key={driver.driverCode} />
        ))}
      </div>
    </BottomSheet>
  );
};

export default DriverSelector;
