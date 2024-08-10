import React from "react";
import DriverWidget from "../components/driver-widget/DriverWidget";
import RaceCounter from "../components/race-counter/RaceCounter";
import TeamWidget from "../components/team-widget/TeamWidget";
import RaceMap from "../components/race-map/RaceMap";
import RaceTimesheet from "../components/race-timesheet/RaceTimesheet";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      <RaceCounter />
      <DriverWidget />
      <TeamWidget />
      <RaceMap />
      <RaceTimesheet />
    </div>
  );
};

export default Dashboard;
