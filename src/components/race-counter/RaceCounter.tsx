import { useEffect, useState } from "react";
import axios from "axios";

type TimeLeft = {
  days?: number;
  hours?: number;
  mins?: number;
  secs?: number;
};

const RaceCounter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [raceName, setRaceName] = useState<string>("");
  const [round, setRound] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const response = await axios.get("http://localhost:3000/races/next");
      const upcoming = response.data;
      setRaceName(upcoming.raceName);
      setRound(upcoming.round);

      const startDate = new Date(upcoming.FirstPractice.date);
      const endDate = new Date(upcoming.date);

      setStartDate(startDate);
      setEndDate(endDate);
      setIsLoading(false);
    };
    fetchUpcomingEvent();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.valueOf() - Date.now();
      let timeLeft: TimeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="w-full p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 col-span-2 md:col-span-4">
      <div className="mb-2">
        <div className="flex justify-center">
          {isLoading ? (
            <div className="flex animate-pulse space-x-2 mb-1">
              <div className="bg-white/10 h-6 w-16 rounded-full"></div>
            </div>
          ) : (
            <>
              <img
                src="https://flagcdn.com/16x12/be.png"
                width="16"
                height="12"
                alt="Belgium"
                className="self-center m-1"
              />
              <p className="font-bold">
                {raceName} • R{round}
              </p>
            </>
          )}
        </div>
        {isLoading ? (
          <div className="flex animate-pulse space-x-2 mb-1 justify-center">
            <div className="bg-white/10 h-4 w-8 rounded-full"></div>
          </div>
        ) : (
          <p className="text-xs text-center text-gray-50">
            {monthNames[startDate.getMonth()]} {startDate.getDate()} -{" "}
            {monthNames[endDate.getMonth()]} {endDate.getDate()}
          </p>
        )}
      </div>
      <div className="bg-rs-green rounded-lg p-2">
        {isLoading || Object.keys(timeLeft).length === 0 ? (
          <div className="flex animate-pulse justify-center">
            <div className="bg-white/10 h-10 w-full m-2 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-4 divide-x-2 divide-white/10">
            {Object.keys(timeLeft).map((unit: string) => {
              return (
                <div className="text-center" key={unit}>
                  <p className="text-3xl font-bold">
                    {timeLeft[unit as keyof TimeLeft]}
                  </p>
                  <p className="text-xs">
                    {unit[0].toUpperCase() + unit.substring(1)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceCounter;
