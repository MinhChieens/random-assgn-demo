import React from "react";
import ImgService from "../assets/service.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
const CardMedicines = ({ props }) => {
  return (
    <>
      {/* {props ? ( */}
      <div className="wrap flex flex-row items-center h-14 w-[95%] bg-transparent border-2 pr-3  font-[poppins] font-bold hover:bg-[#FF2B54] hover:text-white cursor-pointer px-5">
        <div className="head flex flex-row w-[30%] items-center">
          <img src={ImgService} className="h-10 w-10 rounded-full" alt="" />
          <div className="info pl-3">
            <h3>DorFlex</h3>
            <p className=" text-[#B5B5C3]">DorFlex</p>
          </div>
        </div>
        <p className=" w-[15%]">10</p>
        <p className=" w-1/5">Capsula</p>
        <p className=" w-1/5">Oral</p>
        <p className="w-[20%]">Dipirona</p>
        <div className="flex items-center pr-5">
          <button onClick={() => checkDelete()} className="pr-5">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
      </div>
      {/* ) : ( */}
      {/* <div className="wrap flex flex-row items-center h-12 w-[95%] bg-[#FAFAFA] mx-auto  pr-3  font-[poppins] font-bold text-[#82828f]">
          <div className="head flex flex-row w-1/5">
            <div className="info pl-5">
              <h3>Name</h3>
            </div>
          </div>
          <p className="email w-[25%]">Quantity</p>
          <p className="phone w-1/5">Type</p>
          <p className="dateAdd w-1/5">Via</p>
          <p className="status w-[15%]">Active Principle</p> */}
      {/* </div> */}
      {/* )} */}
    </>
  );
};

export default CardMedicines;
