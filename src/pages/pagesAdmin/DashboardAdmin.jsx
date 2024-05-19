import React from "react";
import { homeAdmin } from "../../constants/dashboardHome";
import Leaderboard from "../../components/Dashboard/DashboardHome";
import HospitalSurveyChart from "../../components/Dashboard/HospitalSurveyChart";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import {
   faUserDoctor,
   faUser,
   faStaffAesculapius,
   faMicroscope,
   faSyringe
 } from "@fortawesome/free-solid-svg-icons";

const DashboardAdmin = () => {
   return (
   <div className="App flex flex-col justify-around my-4  gap-4">
      <div className="flex flex-row justify-around my-4  gap-4">
        <Leaderboard name="Doctor" number="Number" icon={faUserDoctor}  />
        <Leaderboard name="Patient" number="Top Scorer" icon={faUser}  />
        <Leaderboard name="Staff" number="Highest Points" icon={faStaffAesculapius} />
      </div>
      <div className="flex flex-row justify-around my-4  gap-4">
        <Leaderboard name="Medical Devices" number="Leaderboard" icon={faMicroscope}  />
        <Leaderboard name="Medicines" number="Number" icon={faSyringe}  />
        <Leaderboard name="Apponinment" number="Number" icon={faSyringe} /> 
      </div>
      <HospitalSurveyChart />
    </div>
   );
};

export default DashboardAdmin;
