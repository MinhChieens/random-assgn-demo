import React from "react";

const DoctorEntry = () => {
   const doctorTemp = {
      name: "ABC ABC",
      image: "../src/assets/doctor.png",
      department: "Emergency",
      dateOfBirth: "02/07/1970",
      designation: "Professor, Doctor of Philosophy",
      status: "Active",
   };
   return (
      <section className="w-4/5 mx-auto grid grid-cols-12 my-1 gap-1 bg-gray-100 px-2 py-2">
         <div className="flex col-span-4 gap-2">
            <img src={doctorTemp.image} width="20" height="20" />
            <p>{doctorTemp.name}</p>
         </div>
         <p className="col-span-2">{doctorTemp.department}</p>
         <p className="col-span-2">{doctorTemp.dateOfBirth}</p>
         <p className="col-span-3">{doctorTemp.designation}</p>
         <p className="col-span-1">{doctorTemp.status}</p>
      </section>
   );
};

export default DoctorEntry;
