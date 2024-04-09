import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadInfo from "../components/HeadInfo";
import { useAuth } from "../context/AuthContext";
const User = () => {
   const { currentUser, userLoggedIn } = useAuth();
   const navigate = useNavigate();
   useEffect(() => {
      if (!userLoggedIn) navigate("/");
   }, []);
   return (
      <div>
         <HeadInfo children={{}} />
         <div className="wrap grid grid-flow-col grid-cols-5 h-screen px-6">
            <div className="sideBar bg-slate-400 col-span-1 "></div>
            <div className="content bg-black col-span-4">b</div>
         </div>
      </div>
   );
};

export default User;
