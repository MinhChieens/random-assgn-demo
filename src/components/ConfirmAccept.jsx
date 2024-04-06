import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ConfirmAccept = () => {
   return (
      <>
         <div className="relative w-[36rem] h-[24rem] bg-slate-300 flex flex-col justify-center items-center gap-5">
            <button className="absolute top-2 right-3">
               <FontAwesomeIcon icon={faX} />
            </button>
            <h2 className="text-black text-4xl font-bold font-['Inter']">
               Confirm Accept
            </h2>
            <p className="text-[#5B5B5B] font-['Inter'] tracking-[1.6px] text-base font-bold">
               Please confirm your action
            </p>
            <button className="w-2/5 rounded-[5px] h-12 border-2 text-white py-2 font-bold bg-[#1F2B6C]">
               Yes
            </button>
            <p className="text-[#5B5B5B] font-['Inter']">or</p>
            <button className="w-2/5 rounded-[5px] h-12 border-2  border-black py-2 font-bold">
               No
            </button>
         </div>
      </>
   );
};

export default ConfirmAccept;
