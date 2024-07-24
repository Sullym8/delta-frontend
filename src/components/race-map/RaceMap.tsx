import React from "react";

const RaceMap = () => {
  return (
    <div className="w-full p-4 bg-rs-gray-dark text-white rounded-lg ring-1 ring-white/10 col-span-1 md:col-span-2">
      <img
        className="h-fit"
        src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Belgium"
        alt=""
      />
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-xl">Spa</p>
          <p className="text-xs">Belgium</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">72</p>
          <p className="text-xs">Laps</p>
        </div>
      </div>
    </div>
  );
};

export default RaceMap;
