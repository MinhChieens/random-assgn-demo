import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const ListPatient = () => {
   const listPatient = [
      {
         name: "John Doe",
         uid: "ZEbLWn8jMTYAL6y2j2NwhrKcblz1",
         phoneNumber: "0123456789",
         age: "50",
         gender: "male",
         nextAppointment: {
            date: "2021-09-01",
            time: "10:00",
         },
      },
      {
         name: "John Doe",
         uid: "ZEbLWn8jMTYAL6y2j2NwhrKcblz1",
         phoneNumber: "0123456789",
         age: "50",
         gender: "male",
         nextAppointment: {
            date: "2021-09-01",
            time: "10:00",
         },
      },
   ];

   const handleDetails = (uid) => {
      console.log(uid);
   };

   return (
      <div className="flex flex-col gap-4 items-center w-full mx-auto my-4">
         <div className="w-11/12 mx-auto grid grid-cols-12 p-2 bg-gray-100 items-center justify-center font-[poppins] font-bold text-gray-500">
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Phone Number</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-2">Appointment Date</div>
            <div className="col-span-2">Appointment Time</div>
            <div className="col-span-1">Details</div>
         </div>
         <div className="w-11/12 mx-auto flex flex-col gap-2">
            {listPatient.map((patient, index) => (
               <div
                  key={index}
                  className="grid grid-cols-12 p-2 items-center justify-center font-bold font-yeseva border-2  rounded-sm"
               >
                  <div className="col-span-4">{patient.name}</div>
                  <div className="col-span-2">{patient.phoneNumber}</div>
                  <div className="col-span-1">{patient.age}</div>
                  <div className="col-span-2">
                     {patient.nextAppointment.date}
                  </div>
                  <div className="col-span-2">
                     {patient.nextAppointment.time}
                  </div>
                  <div className="col-span-1">
                     <button onClick={() => handleDetails(patient.uid)}>
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ListPatient;
