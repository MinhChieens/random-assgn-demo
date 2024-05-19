import React, { useEffect, useState } from "react";
import { homeAdmin } from "../../constants/dashboardHome";
import Leaderboard from "../../components/Dashboard/DashboardHome";
import HospitalSurveyChart from "../../components/Dashboard/HospitalSurveyChart";

import {
  faUserDoctor,
  faUser,
  faStaffAesculapius,
  faMicroscope,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";

const DashboardAdmin = () => {
  const [total, setTotal] = useState({});
  const crtUser = getAuth().currentUser;
  const getPatents = async () => {
    const queryPatients = await getDocs(collection(db, "users"));
    let count = 0;
    queryPatients.forEach((doc) => {
      count += 1;
    });
    return count;
  };
  const getStaff = async () => {
    const queryStaff = await getDocs(collection(db, "staff"));
    let relList = 0;
    queryStaff.forEach((doc) => {
      relList += 1;
    });
    return relList;
  };
  useEffect(() => {
    const getData = async () => {
      const numMedicine = (await getDoc(doc(db, "medicines", "general"))).data()
        .numOfMedicine;
      const numDevice = (await getDoc(doc(db, "devices", "general"))).data()
        .numOfDevice;
      const numDoctor = (await getDoc(doc(db, "admin", crtUser.uid))).data()
        .listOfDoctors.length;
      const numStaff = await getStaff();
      const numPatients = await getPatents();

      setTotal({
        numDevice,
        numDoctor,
        numMedicine,
        numPatients,
        numStaff,
      });
    };
    getData();
  }, []);

  return (
    <div className="App flex flex-col justify-around my-4 w-11/12 mx-auto gap-4">
      {console.log(total)}
      <div className="flex flex-row justify-around my-4  gap-4">
        <Leaderboard
          name="Doctor"
          number={total.numDoctor}
          icon={faUserDoctor}
        />
        <Leaderboard name="Patient" number={total.numPatients} icon={faUser} />
        <Leaderboard
          name="Staff"
          number={total.numStaff}
          icon={faStaffAesculapius}
        />
      </div>
      <div className="flex flex-row justify-around my-4  gap-4">
        <Leaderboard
          name="Medical Devices"
          number={total.numDevice}
          icon={faMicroscope}
        />
        <Leaderboard
          name="Medicines"
          number={total.numMedicine}
          icon={faSyringe}
        />
        <Leaderboard name="Apponinment" number={100} icon={faSyringe} />
      </div>
      <HospitalSurveyChart />
    </div>
  );
};

export default DashboardAdmin;
