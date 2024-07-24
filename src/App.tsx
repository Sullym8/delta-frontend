import DriverCard from "./components/driver-card/DriverCard";
import Navigation from "./components/nav/Navigation";
import RaceCounter from "./components/race-counter/RaceCounter";
import RaceMap from "./components/race-map/RaceMap";
import RaceTimesheet from "./components/race-timesheet/RaceTimesheet";
import TeamCard from "./components/team-card/TeamCard";

function App() {
  return (
    <div>
      <header className="w-full">
        <Navigation />
      </header>
      <main>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <RaceCounter />
            <DriverCard />
            <TeamCard />
            <RaceMap />
            <RaceTimesheet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
