import React from "react";
import FrameDoctor from "../components/FrameDoctor";
import DoctorEntry from "../components/DoctorEntry";
import DoctorHeader from "../components/DoctorHeader";
const Doctors = () => {
   return (
      <div className="doc p-10 flex flex-row flex-wrap justify-center">
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <DoctorHeader />
         <DoctorEntry />
         <DoctorEntry />
      </div>
   );
};

export default Doctors;
