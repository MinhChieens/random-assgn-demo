import React from "react";

const DoctorHeader = () => {
   return (
      <div className="w-4/5 mx-auto my-1 grid grid-cols-12 gap-1 px-2 py-2">
         <p className="col-span-4">Name</p>
         <p className="col-span-2">Department</p>
         <p className="col-span-2">Date of Birth</p>
         <p className="col-span-3">Designation</p>
         <p className="col-span-1">Status</p>
      </div>
   );
};

export default DoctorHeader;
