import React from "react";
import avt from "../assets/doctor.png";
const CardInfoUsers = ({ props }) => {
  return (
    <>
      {props ? (
        <div className="wrap flex flex-row items-center h-12 w-[95%] bg-transparent border-2 pr-3 rounded-lg font-[poppins] font-bold">
          <div className="head flex flex-row w-1/5">
            <img src={avt} className="h-12 w-12 rounded-lg" alt="" />
            <div className="info pl-3">
              <h3>{props.FirstName}</h3>
              <p className=" text-[#B5B5C3]">{props.Activity}</p>
            </div>
          </div>
          <p className="email w-[25%]">{props.Gmail}</p>
          <p className="phone w-1/5">{props.PhoneNumber}</p>
          <p className="dateAdd w-1/5">{props.Birthday}</p>
          <p className="status w-[15%]">Approved</p>
          <button>More</button>
        </div>
      ) : (
        <div className="wrap flex flex-row items-center h-12 w-[95%] bg-transparent mx-auto  pr-3  font-[poppins] font-bold">
          <div className="head flex flex-row w-1/5">
            <div className="info">
              <h3>Name</h3>
              <p></p>
            </div>
          </div>
          <p className="email w-[25%]">Gmail</p>
          <p className="phone w-1/5">PhoneNumber</p>
          <p className="dateAdd w-1/5">Birthday</p>
          <p className="status w-[15%]">Approved</p>
          <button>More</button>
        </div>
      )}
    </>
  );
};

export default CardInfoUsers;
