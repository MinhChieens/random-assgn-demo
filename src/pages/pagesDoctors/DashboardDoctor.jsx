import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Schedular from "../../components/Schedular";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebase";
const DashboardDoctor = () => {
  const crtUser = getAuth().currentUser;
  const [dataDoctor, setDataDoctor] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getDoc(doc(db, "doctors", crtUser.uid));
      const appt = await getDoc(doc(db, "doctors", "appointments"));
      const numPatients = data.data().ListPatient.length;
      const numAppt = appt.data()[data.data().value.Specialist].length;
      console.log(numPatients, numAppt);
      setDataDoctor({
        numPatients,
        numAppt,
      });
    };
    getData();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="font-[poppins] w-10 h-10 mt-2 pl-12 font-bold text-lg">
          Hello,
          <span className="pl-5">
            {crtUser.displayName ? crtUser.displayName : crtUser.email}
          </span>
        </h1>
        <div className="w-11/12 h-44 m-auto flex flex-row gap-10 items-center justify-around bg-orange-100 font-[poppins]">
          <div className="patient w-52 h-28 bg-sky-200 pl-3  flex items-center shadow-md">
            <FontAwesomeIcon icon={faHospitalUser} size="2xl" />
            <div className="pl-6">
              <p className="font-bold">Total Patients</p>
              <p className="font-bold text-4xl pt-3">
                {dataDoctor.numPatients}{" "}
              </p>
            </div>
          </div>
          <div className="patient w-52 h-28 bg-sky-200 pl-3  flex items-center shadow-md">
            <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />
            <div className="pl-6">
              <p className="font-bold">Total Appointments</p>
              <p className="font-bold text-4xl pt-3">{dataDoctor.numAppt} </p>
            </div>
          </div>
          <div className="patient w-52 h-28 bg-sky-200 pl-3  flex items-center shadow-md">
            <FontAwesomeIcon icon={faNotesMedical} size="2xl" />
            <div className="pl-6">
              <p className="font-bold">Total Test</p>
              <p className="font-bold text-4xl pt-3 ">{100} </p>
            </div>
          </div>
        </div>
      </div>
      <Schedular uid={crtUser.uid} />
    </>
  );
};

export default DashboardDoctor;
