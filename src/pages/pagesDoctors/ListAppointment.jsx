import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardPatients from "../../components/CardPatients";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
const ListAppointment = () => {
  const [Loading, setLoading] = useState(false);
  const [ListAppointment, setListAppointment] = useState(null);

  const getInfoAppt = async (list) => {
    const listAppt = list.map(async (item) => {
      const dataPatient = await getDoc(doc(db, "users", item));
      console.log(dataPatient.data());
      if (dataPatient.exists)
        return {
          information: dataPatient.data().information,
          appt: dataPatient.data().myAppointment,
        };
      return null;
    });

    const valuee = await Promise.all(listAppt);
    const validList = valuee.filter((v) => v != null);
    console.log(validList);
    setListAppointment(validList);
  };

  const getListAppointment = async () => {
    const CrtUser = getAuth().currentUser;
    const data = await getDoc(doc(db, "doctors", CrtUser.uid));
    const appt = await getDoc(doc(db, "doctors", "appointments"));
    const type = data.data().value.Specialist;
    console.log(appt.data()[type]);
    getInfoAppt(appt.data()[type]);
  };
  useEffect(() => {
    getListAppointment();
  }, []);

  // redirect to user profile

  return (
    <>
      <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
        <div className="flex gap-5 items-center">
          <h3 className="text-2xl  font-bold text-white">Appointments</h3>
          <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
            {ListAppointment && ListAppointment.length} Appointment
          </p>
        </div>
      </div>
      <div className="pt-2">
        <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
          <div className="col-span-2 justify-self-start">Patient Name</div>
          <div className="col-span-2 justify-self-start">Phone Number</div>
          <div className="col-span-1 justify-self-start">Gender</div>
          <div className="col-span-2 justify-self-start">Date of visit</div>
          <div className="col-span-2 justify-self-start">Time of visit</div>
          <div className="col-span-2 justify-self-start ml-[-2rem]">Reason</div>
          <div className="col-span-1 justify-self-start ml-[-4rem]">Action</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 pt-4">
          {ListAppointment &&
            ListAppointment.map((p, index) => {
              return (
                <div
                  key={index}
                  className="w-[95%] mx-auto grid grid-cols-12 p-3 border-2 hover: items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white"
                >
                  <div className="col-span-2 justify-self-start">{p.name}</div>
                  <div className="col-span-2 justify-self-start">{p.phone}</div>
                  <div className="col-span-1 justify-self-start">
                    {p.gender}
                  </div>
                  <div className="col-span-2 justify-self-start">
                    {p.dateVisit}
                  </div>
                  <div className="col-span-2 justify-self-start">
                    {p.timeVisit}
                  </div>
                  <div className="col-span-2 justify-self-start ml-[-2rem]">
                    {p.reason}
                  </div>
                  <div className="col-span-1 flex justify-self-start ml-[-4rem]">
                    <p className=" w-[90px]">{p.action} </p>
                    <button className="px-1 h-6 bg-green-400 text-white rounded-md">
                      <Request></Request>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ListAppointment;
