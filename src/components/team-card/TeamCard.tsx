import { useEffect, useState } from "react";
import axios from "axios";

type TeamData = {
  position: number;
  points: number;
  wins: number;
  Constructor: {
    constructorId: string;
    name: string;
  };
};

type TeamDrivers = Array<{
  permanentNumber: number;
  code: string;
}>;

const TeamCard = () => {
  const [teamData, setTeamData] = useState<TeamData | null>();
  const [teamDrivers, setTeamDrivers] = useState<TeamDrivers>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const auxTeamData = {
    red_bull: { carName: "RB20", imageName: "red-bull-racing" },
    ferrari: { carName: "SF-24", imageName: "ferrari" },
    mclaren: { carName: "MCL38", imageName: "mclaren" },
    mercedes: { carName: "W15", imageName: "mercedes" },
    aston_martin: { carName: "AMR24", imageName: "aston-martin" },
    rb: { carName: "VCARB01", imageName: "rb" },
    haas: { carName: "VF-24", imageName: "haas" },
    alpine: { carName: "A524", imageName: "alpine" },
    williams: { carName: "FW46", imageName: "williams" },
    sauber: { carName: "C44", imageName: "kick-sauber" },
  };

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await axios.get(
        "http://10.169.154.6:3000/constructor/mercedes"
      );
      setTeamData(response.data);
    };
    fetchUpcomingEvent();
  }, []);

  useEffect(() => {
    console.log(teamData);
    const fetchDrivers = async () => {
      const response = await axios.get(
        "http://10.169.154.6:3000/constructor/mercedes/drivers"
      );
      setTeamDrivers(response.data);
      setIsLoading(false);
    };
    fetchDrivers();
  }, [teamData]);

  return (
    <div
      className={`w-full h-40 p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 relative col-span-2 md:col-span-4 overflow-hidden`}
    >
      {isLoading ? (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex animate-pulse space-x-2">
              <div className="bg-white/10 h-4 w-32 rounded-full"></div>
            </div>
            <div className="flex animate-pulse space-x-2">
              <div className="bg-white/10 h-9 w-32 rounded-full"></div>
            </div>
          </div>
          <div className="text-right flex flex-col gap-2">
            {[...Array(3)].map((_, index) => {
              return (
                <div key={index} className="animate-pulse">
                  <div className="bg-white/10 h-8 w-8 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between h-full">
          <div className="">
            <p className="text-xs">{teamData?.Constructor?.name}</p>
            <p className="font-bold truncate text-3xl">
              {teamData &&
                auxTeamData[
                  teamData.Constructor.constructorId as keyof typeof auxTeamData
                ].carName}
            </p>
          </div>
          <div className="text-right flex flex-col">
            <div>
              <p className="font-bold">
                {teamDrivers
                  .reduce((a, x) => {
                    return a + ` #${x.permanentNumber} ${x.code} •`;
                  }, "")
                  .slice(0, -1)}
              </p>
              <p className="text-xs  text-gray-50">Drivers</p>
            </div>
            <div>
              <p className="font-bold">{teamData?.points}</p>
              <p className="text-xs  text-gray-50">Points</p>
            </div>
            <div>
              <p className="font-bold">{teamData?.wins}</p>
              <p className="text-xs  text-gray-50">Wins</p>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="absolute left-4 bottom-4 animate-pulse">
          <div className="bg-white/10 h-14 w-64 rounded"></div>
        </div>
      ) : (
        // <></>
        <img
          src={`https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/${
            teamData &&
            auxTeamData[
              teamData.Constructor.constructorId as keyof typeof auxTeamData
            ].imageName
          }.png`}
          alt=""
          className="h-20 md:h-32 absolute left-0 bottom-0"
        />
      )}
    </div>
  );
};

export default TeamCard;
