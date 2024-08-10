import { useEffect, useState } from "react";
import axios from "axios";

export type DriverData = {
  position: number;
  points: number;
  wins: number;
  Driver: {
    driverId: string;
    permanentNumber: number;
    code: string;
    givenName: string;
    familyName: string;
  };
  Constructors: [
    {
      constructorId: string;
      name: string;
    }
  ];
};

const DriverWidget = () => {
  const [driverData, setDriverData] = useState<DriverData | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await axios.get("http://localhost:3000/drivers/sainz");
      setDriverData(response.data);
      setIsLoading(false);
    };
    fetchUpcomingEvent();
  }, []);

  return (
    <div className="w-full p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 relative overflow-hidden col-span-2 md:col-span-4">
      {isLoading ? (
        <>
          <div className="flex animate-pulse space-x-2 mb-2">
            <div className="bg-white/10 h-7 w-32 rounded-full"></div>
          </div>
          <div className="flex animate-pulse space-x-2 mb-4">
            <div className="bg-white/10 h-4 w-24 rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 text-center w-6/12">
            {[...Array(3)].map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center animate-pulse space-x-2 mb-1"
                >
                  <div className="bg-white/10 h-8 w-8 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6 w-7/12">
            <div>
              <p className="font-bold text-xl">
                {driverData?.Driver.givenName} {driverData?.Driver.familyName}
              </p>
              <p className="text-xs text-gray-50">
                {driverData?.Constructors[0].name} •{" #"}
                {driverData?.Driver.permanentNumber}
              </p>
            </div>
            <div className="grid grid-cols-3 justify-center text-center">
              <div>
                <p className="font-bold">{driverData?.points}</p>
                <p className="text-xs text-gray-50">Points</p>
              </div>
              <div>
                <p className="font-bold">{driverData?.wins}</p>
                <p className="text-xs text-gray-50">Wins</p>
              </div>
              <div>
                <p className="font-bold">{driverData?.position}</p>
                <p className="text-xs text-gray-50">Position</p>
              </div>
            </div>
          </div>
        </>
      )}
      {isLoading ? (
        <div className="absolute right-4 top-4 animate-pulse ">
          <div className="bg-white/10 h-24 w-32 rounded"></div>
        </div>
      ) : (
        <img
          src={`https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${driverData?.Driver.givenName
            .charAt(0)
            .toUpperCase()}/${driverData?.Driver.givenName
            .slice(0, 3)
            .toUpperCase()}${driverData?.Driver.familyName
            .slice(0, 3)
            .toUpperCase()}01_${driverData?.Driver.givenName}_${
            driverData?.Driver.familyName
          }/${driverData?.Driver.givenName
            .slice(0, 3)
            .toLowerCase()}${driverData?.Driver.familyName
            .slice(0, 3)
            .toLowerCase()}01.png`}
          alt=""
          className="w-44 absolute right-0 top-0"
        />
      )}
    </div>
  );
};

export default DriverWidget;
