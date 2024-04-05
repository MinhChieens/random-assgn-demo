import React from "react";
import FrameDoctor from "../components/FrameDoctor";
const Doctors = () => {
   return (
      <div className="doc p-10 flex flex-row gap-10 flex-wrap justify-center">
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
         <FrameDoctor />
      </div>
   );
};

export default Doctors;
