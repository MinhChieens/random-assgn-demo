import React from "react";
import sampleImage from "../assets/doctor.png";
const FrameDoctor = ({ children }) => {
   return (
      <div className="wrap flex flex-col w-80 shadow-lg rounded-lg hover:translate-y-1 hover:shadow-2xl">
         <img
            className="object-fill rounded-t-lg"
            src={sampleImage}
            alt="doctors"
         />

         <div className="infoDoctor flex flex-col justify-center items-center w-full p-6 bg-[#BFD2F8] font-worksans">
            <h4 className="doctor_name text-[#1F2B6C]">Doctor's Name</h4>
            <p className="pt-1 factorial font-worksans font-bold text-[#1F2B6C]">
               NEUROLOLY
            </p>
         </div>
         <a
            href="/profile"
            className="text-center hover:bg-[#1F2B4F] p-3 text-base rounded-b-lg font-worksans text-[#BFD2F8] bg-[#1F2B6C]"
         >
            View Profile
         </a>
      </div>
   );
};

export default FrameDoctor;
