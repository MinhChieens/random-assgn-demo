import React from "react";

const CardPatients = ({ props, uid }) => {
  return (
    <div className="w-[95%] mx-auto grid grid-cols-12 p-3 border-2 hover: items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white ">
      <div className="col-span-2 justify-self-start">{props.name}</div>
      <div className="col-span-2">{props.diagnose}</div>
      <div className="col-span-1">{props.age}</div>
      <div className="col-span-2">{props.gender}</div>
      <div className="col-span-2">{props.timeTreat}</div>
      <div className="col-span-2">{props.level}</div>
      <div className="col-span-1">Details</div>
    </div>
  );
};

export default CardPatients;
