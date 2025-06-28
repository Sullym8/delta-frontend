import { useEffect, useState } from "react";
import BottomSheet from "../bottom-sheet/BottomSheet";
import DriverCardSelector from "../driver-card-selector/DriverCardSelector";
import { Driver } from "../../types/driver";
import { TbArrowsSort } from "react-icons/tb";

type SortOption = "a-z" | "z-a" | "cost-low" | "cost-high";

interface SortPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

const SortPopup = ({
  isOpen,
  onClose,
  onSort,
  currentSort,
}: SortPopupProps) => {
  if (!isOpen) return null;

  const sortOptions = [
    { value: "a-z" as SortOption, label: "Alphabetical (A-Z)" },
    { value: "z-a" as SortOption, label: "Alphabetical (Z-A)" },
    { value: "cost-low" as SortOption, label: "Cost (Low to High)" },
    { value: "cost-high" as SortOption, label: "Cost (High to Low)" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-delta-container-bg rounded-2xl ring-1 ring-white/10 p-4 m-4 w-full max-w-sm">
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSort(option.value);
                onClose();
              }}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                currentSort === option.value
                  ? "bg-delta-active ring-1 ring-white/10"
                  : "bg-delta-container-bg ring-1 ring-white/5"
              }`}
            >
              {option.label}
              {currentSort === option.value && (
                <span className="float-right text-delta-accent">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DriverSelector = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [sortedDrivers, setSortedDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortOption>("a-z");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://delta-backend-wj7b.onrender.com/api/drivers"
        );
        const drivers = await response.json();
        setDrivers(drivers);
        setSortedDrivers(drivers);
      } catch (err) {
        setError("Failed to fetch races");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleSort = (sortOption: SortOption) => {
    const sorted = [...drivers];

    switch (sortOption) {
      case "a-z":
        sorted.sort((a, b) => a.driverName.localeCompare(b.driverName));
        break;
      case "z-a":
        sorted.sort((a, b) => b.driverName.localeCompare(a.driverName));
        break;
      case "cost-low":
        sorted.sort((a, b) => a.cost - b.cost);
        break;
      case "cost-high":
        sorted.sort((a, b) => b.cost - a.cost);
        break;
    }

    setSortedDrivers(sorted);
    setCurrentSort(sortOption);
  };

  const getSortButtonText = () => {
    switch (currentSort) {
      case "a-z":
        return "A-Z";
      case "z-a":
        return "Z-A";
      case "cost-low":
        return "Cost ↑";
      case "cost-high":
        return "Cost ↓";
      default:
        return (
          <>
            <TbArrowsSort /> Sort
          </>
        );
    }
  };

  return (
    <BottomSheet baseHeightRatio={0.55} expandedHeightRatio={0.8}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2 mx-2">
          <h2 className="text-xl font-bold">Select Drivers</h2>
          <button
            onClick={() => setShowSortPopup(true)}
            className="flex text-base items-center px-3 py-1 gap-2 bg-delta-accent rounded-xl transition-colors"
          >
            {getSortButtonText()}
          </button>
        </div>
        {loading && <div className="text-center py-4">Loading drivers...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}
        {!loading &&
          !error &&
          sortedDrivers.map((driver) => (
            <DriverCardSelector driver={driver} key={driver.driverCode} />
          ))}
      </div>
      <SortPopup
        isOpen={showSortPopup}
        onClose={() => setShowSortPopup(false)}
        onSort={handleSort}
        currentSort={currentSort}
      />
    </BottomSheet>
  );
};

export default DriverSelector;
