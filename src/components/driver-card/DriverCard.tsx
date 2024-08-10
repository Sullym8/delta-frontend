import React from "react";
import { MdClose } from "react-icons/md";

const DriverCard = () => {
  return (
    <div className="w-[250px] h-[350px] rounded-2xl flex flex-col bg-rs-gray-dark ring-2 ring-[#DE6A10]/10 relative">
      <div className="absolute -right-2 -top-2 z-10 drop-shadow bg-red-600 rounded-full p-1">
        <MdClose size={16} />
      </div>
      <div className="w-full h-[250px] bg-[#DE6A10] rounded-t-2xl flex flex-col relative p-6 pb-0 overflow-hidden">
        <div className="text-black">
          <p className="text-xs">RTG</p>
          <p className="font-black text-4xl leading-none">84</p>
        </div>
        <div className="text-black">
          <p className="text-xs">RAC</p>
          <p className="font-black text-3xl leading-none">84</p>
        </div>
        <div className="text-black">
          <p className="text-xs">AWA</p>
          <p className="font-black text-3xl leading-none">84</p>
        </div>
        <div className="text-black">
          <p className="text-xs">OVE</p>
          <p className="font-black text-3xl leading-none">84</p>
        </div>
        <img
          className="w-[210px] absolute right-0 bottom-0 z-10"
          src="https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png"
          alt=""
        />
        <img
          className="w-64 absolute -right-24 -top-8 opacity-50"
          src="src\assets\mclaren.png"
          alt=""
        />
      </div>
      <div className="flex p-4 bg-gradient-to-b from-[#DE6A10]/10 align-middle">
        <div className="flex flex-col ">
          <p className="text-[#DE6A10] font-black text-3xl">Lando Norris</p>
          <p className="text-[#DE6A10] text-xs">McLaren Racing</p>
        </div>
        <div className="flex flex-col items-center text-center">
          {/* <div>
            <p className="text-[#DE6A10] text-xs text-end">Driver #14</p>
          </div> */}

          <p className="text-[#DE6A10] font-black text-6xl text-end">C1</p>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
