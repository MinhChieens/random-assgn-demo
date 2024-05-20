import React, { useEffect, useState } from "react";

import UsageStatisticsChart from "../../components/Dashboard/UsageStatisticChart";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import TreatmentSchedule from "../../components/TimelineTreat";

const Dashboard = () => {
  const crtUser = getAuth().currentUser;
  const [dataUser, setDataUser] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getDoc(doc(db, "users", crtUser.uid));
      console.log(data.data());
      setDataUser(data.data());
    };
    getData();
  }, []);
  return (
    <div>
      <div className="h-12 w-full bg-sky-300 font-[poppins] font-bold">
        <p className="pt-2 pl-4 text-2xl">
          Hello : {dataUser.information && dataUser.information.name}
        </p>
      </div >
      <div className="flex flex-row gap-4 ml-2 mr-2">
      <UsageStatisticsChart />
      <TreatmentSchedule />
      </div>
      

    </div>
  );
};

export default Dashboard;
