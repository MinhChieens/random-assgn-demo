import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ConfirmAccept = ({ conFirm, setLogoutPara }) => {
   return (
      <>
         <div className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36rem] h-[24rem] bg-slate-300 flex flex-col justify-center items-center gap-5 z-50">
            <button onClick={setLogoutPara} className="absolute top-2 right-3">
               <FontAwesomeIcon icon={faX} />
            </button>
            <h2 className="text-black text-4xl font-bold font-['Inter']">
               Confirm Accept
            </h2>
            <p className="text-[#5B5B5B] font-['Inter'] tracking-[1.6px] text-base font-bold">
               Please confirm your action
            </p>
            <button
               onClick={() => conFirm()}
               className="w-2/5 rounded-[5px] h-12 border-2 text-white py-2 font-bold bg-[#1F2B6C] hover:bg-blue-500"
            >
               Yes
            </button>
            <p className="text-[#5B5B5B] font-['Inter']">or</p>
            <button
               onClick={() => setLogoutPara()}
               className="w-2/5 rounded-[5px] h-12 border-2  border-black py-2 font-bold hover:bg-gray-200"
            >
               No
            </button>
         </div>
      </>
   );
};

export default ConfirmAccept;
