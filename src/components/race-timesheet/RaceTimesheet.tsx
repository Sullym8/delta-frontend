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
      const response = await axios.get(
        // "https://ergast.com/api/f1/current/next.json"
        "http://api.jolpi.ca/ergast/f1/current/next.json"
      );
      const upcoming = response.data.MRData.RaceTable.Races[0];
      console.log(upcoming);

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
        <>Loading</>
      ) : (
        <div className="grid grid-rows-3">
          {timesheetData?.slice(0, 3).map((e) => (
            <div className="flex gap-4">
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
