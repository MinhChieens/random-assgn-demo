import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadInfo from "../components/HeadInfo";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const PageWraper = ({ items }) => {
   const { currentUser, userLoggedIn } = useAuth();
   const navigate = useNavigate();
   useEffect(() => {
      if (!userLoggedIn) navigate("/");
   }, []);
   return (
      <div>
         <HeadInfo currentUser={currentUser} />
         <div className="wrap grid grid-flow-col grid-cols-6 h-screen">
            <div className="sideBar bg-lightblue col-span-1">
               <Sidebar items={items} />
            </div>
            <div className="content col-span-5">
               <Outlet></Outlet>
            </div>
         </div>
      </div>
   );
};

export default PageWraper;
