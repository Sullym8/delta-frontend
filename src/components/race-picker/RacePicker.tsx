const RacePicker = () => {
  return (
    <div className="flex flex-col shrink-0 ring-1 w-56 rounded-lg ring-white/10 p-4 bg-rs-gray-dark">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            src="https://flagcdn.com/16x12/in.png"
            width="16"
            height="12"
            alt="Belgium"
            className="self-center m-1"
          />
          <p className="text-xs">Round 1</p>
        </div>
        <div className="w-3 h-3 rounded-full bg-rs-green "></div>
      </div>
      <p className="font-bold text-2xl">Bahrain</p>
      <p className="text-xs">03 Mar - 05 Mar</p>
    </div>
  );
};

export default RacePicker;
