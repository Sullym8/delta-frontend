import axios from "axios";
import { useEffect, useState } from "react";

type RaceMapData = {
  locality: string;
  country: string;
};

const RaceMap = () => {
  const [raceMapData, setRaceMapData] = useState<RaceMapData | undefined>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await axios.get("http://localhost:3000/races/next");
      const upcoming = response.data;
      console.log(upcoming);
      setRaceMapData(upcoming.Circuit.Location);
      // setIsLoading(false);
    };
    fetchUpcomingEvent();
  }, []);

  return (
    <div className="w-full p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 col-span-1 md:col-span-2">
      <img
        className="h-24 lg:max-h-20 mx-auto"
        src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Belgium"
        alt=""
      />
      <div className="flex justify-between items-center align-middle">
        <div>
          <p className="font-bold text-xl">{raceMapData?.locality}</p>
          <p className="text-xs">{raceMapData?.country}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">72</p>
          <p className="text-xs">Laps</p>
        </div>
      </div>
    </div>
  );
};

export default RaceMap;
