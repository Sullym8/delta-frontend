import axios from "axios";
import React, { useEffect, useState } from "react";

export type TimeSheetData = Array<{
  event: string;
  date: string;
  time: string;
  dateTime: Date;
}>;

const RaceTimesheet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timesheetData, setTimesheetData] = useState<TimeSheetData>([]);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await axios.get("http://10.169.154.6:3000/race/next");
      const upcoming = response.data;

      let tsData = [
        { ...upcoming.FirstPractice, event: "Practice 1" },
        { ...upcoming.SecondPractice, event: "Practice 2" },
        { ...upcoming.ThirdPractice, event: "Practice 3" },
        { ...upcoming.Sprint, event: "Sprint" },
        { ...upcoming.SprintQualifying, event: "Sprint Qualifying" },
        { ...upcoming.Qualifying, event: "Qualifying" },
        { date: upcoming.date, time: upcoming.time, event: "Race" },
      ];

      tsData.map((x) => {
        x.dateTime = new Date(`${x.date}T${x.time}`);
      });

      tsData = tsData.filter((x) => x.dateTime >= Date.now());
      setTimesheetData(tsData);
      setIsLoading(false);
    };
    fetchUpcomingEvent();
  }, []);

  return (
    <div className="w-full p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 col-span-1 md:col-span-2">
      {isLoading ? (
        <div className="grid grid-rows-3 gap-2">
          {[0, 1, 2].map((e) => (
            <div className="flex gap-4" key={e}>
              <div className="flex flex-col gap-1 ">
                <div className="flex animate-pulse">
                  <div className="bg-white/10 h-5 w-28 rounded-full"></div>
                </div>
                <div className="flex animate-pulse">
                  <div className="bg-white/10 h-4 w-16 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-rows-3">
          {timesheetData?.slice(0, 3).map((e, index) => (
            <div className="flex gap-4" key={index}>
              <div className="flex flex-col ">
                <p className="font-bold">{e.dateTime.getDate()}</p>
                <p className="text-xs">
                  {e.dateTime
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-bold">{e.event}</p>
                <p className="text-xs">
                  {e.dateTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RaceTimesheet;
