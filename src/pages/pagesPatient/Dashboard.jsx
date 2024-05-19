import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebase";
const Dashboard = () => {
  const crtUser = getAuth().currentUser;
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await getDoc(doc(db, "users", crtUser.uid));
      setUserData(data.data());
      console.log(data.data());
    };
    getData();
  }, []);
  return (
    <>
      <div className="h-12 w-full bg-amber-200 font-[poppins] font-bold text-xl ">
        <p className="pt-2 pl-3">
          Hello{" "}
          {userData.information ? userData.information.name : crtUser.email}
        </p>
      </div>
    </>
  );
};

export default Dashboard;
