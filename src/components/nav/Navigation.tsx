import React from "react";

const Navigation = () => {
  return (
    <div className="container mx-auto my-4">
      <p className="font-black text-3xl text-center mb-2">RaceSpace</p>
      <div className="flex flex-row text-xs justify-center">
        <button className="bg-rs-gray-dark text-white px-4 py-1 rounded-full">
          Dashboard
        </button>
        <button className="px-4 py-1">Fantasy</button>
        <button className="px-4 py-1">Drivers</button>
        <button className="px-4 py-1">Teams</button>
      </div>
    </div>
  );
};

export default Navigation;
