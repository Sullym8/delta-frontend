import { useRaceStore } from "../../store/RaceStore";

const CostCap = () => {
  const selectedDrivers = useRaceStore((state) => state.selectedDrivers);
  const totalCost = selectedDrivers.reduce(
    (total, driver) => total + driver.cost,
    0
  );

  const getProgressColor = () => {
    if (totalCost >= 100) return "bg-red-600";
    return "bg-green-600";
  };

  return (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden ring-1 ring-white/10">
      <div
        className={`h-full ${getProgressColor()} transition-all duration-300 ease-out`}
        style={{ width: `${Math.min(totalCost, 100).toFixed(1)}%` }}
      />
    </div>
  );
};
export default CostCap;
