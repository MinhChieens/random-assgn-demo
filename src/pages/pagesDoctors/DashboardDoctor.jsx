import React from "react";
import { homeDoctor } from "../../constants/dashboardHome";
import DashboardHome from "../../components/Dashboard/DashboardHome";
import { getAuth } from "firebase/auth";

const DashboardDoctor = () => {
  const crtUser = getAuth().currentUser;
  return (
    <>
      <div className="">
        <h1 className="font-[poppins] w-10 h-10 mt-2 pl-12 font-bold text-lg">
          Hello,
          <span className="pl-5">
            {crtUser.displayName ? crtUser.displayName : crtUser.email}
          </span>
        </h1>
        <div className="w-11/12 h-44 m-auto flex flex-row gap-10 items-center g bg-orange-100 font-[poppins]">
          <div className="patient w-52 h-28 bg-sky-300 pl-3  flex items-center">
            <img src="" alt="Icon" />
            <div className="pl-3">
              <p className="">Total Patients</p>
              <p className="font-bold text-4xl pt-3">{100} </p>
            </div>
          </div>
          <div className="patient w-52 h-28 bg-sky-300 pl-3  flex items-center">
            <img src="" alt="Icon" />
            <div className="pl-3">
              <p className="">Total Appointments</p>
              <p className="font-bold text-4xl pt-3">{100} </p>
            </div>
          </div>
          <div className="patient w-52 h-28 bg-sky-300 pl-3  flex items-center">
            <img src="" alt="Icon" />
            <div className="pl-3">
              <p className="">Total Test</p>
              <p className="font-bold text-4xl pt-3">{100} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDoctor;
