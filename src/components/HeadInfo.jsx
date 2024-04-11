import {
   faPhoneVolume,
   faClock,
   faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import Doctor from "../assets/doctor.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmAccept from "./ConfirmAccept";
import { useState } from "react";

const HeadInfo = ({ currentUser }) => {
   const navigate = useNavigate();
   const [logout, setLogout] = useState(false);
   const conFirm = () => {
      signout();
   };
   const setLogoutPara = () => {
      setLogout(false);
   };
   const signout = () => {
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
            navigate("/");
         })
         .catch((error) => {
            // An error happened.
            console.log("Error: " + error);
         });
   };
   return (
      <>
         <div className="header">
            <div className="bg-slate-100 p-3 head_info flex flex-row justify-center items-center">
               <div className="title flex flex-row pl-10 basis-1/3 justify-center items-center">
                  <p className="text-[#1F2B6C] text-3xl font-bold font-serif">
                     MED
                  </p>
                  <p className="text-sky-400 text-3xl font-bold font-serif">
                     DICAL
                  </p>
               </div>

               {currentUser ? (
                  <div className="users basis-3/4 flex flex-row justify-end px-10 items-center  ">
                     <img
                        src={Doctor}
                        alt="Doctor"
                        className=" h-10 w-10 rounded-full"
                     />
                     <p className=" px-4">
                        {currentUser.displayName
                           ? currentUser.displayName
                           : currentUser.email}
                     </p>
                     <div className="logout hover:bg-slate-200 h-10 flex items-center p-2">
                        <button onClick={() => setLogout(true)}>
                           Sign Out
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="main_info font-worksans font-bold text-xs flex flex-row pr-20 basis-2/3 justify-around">
                     <div className="emergency flex items-center justify-center">
                        <div className="image pr-4">
                           <FontAwesomeIcon
                              icon={faPhoneVolume}
                              size="2x"
                              color="#159EEC"
                           />
                        </div>
                        <div className="info">
                           <h5 className="text-[#1F2B6C]">EMERGENCY</h5>
                           <p className="text-[#159EEC] font-worksans">
                              (237) 681-812-255{" "}
                           </p>
                        </div>
                     </div>
                     <div className="work_hour flex items-center justify-center">
                        <div className="image pr-4">
                           <FontAwesomeIcon
                              icon={faClock}
                              size="2x"
                              color="#159EEC"
                           />
                        </div>
                        <div className="info">
                           <h5 className="text-[#1F2B6C]">WORK HOUR</h5>
                           <p className="text-[#159EEC]">5h - 19h</p>
                        </div>
                     </div>
                     <div className="location flex items-center justify-center">
                        <div className="image pr-4">
                           <FontAwesomeIcon
                              icon={faLocationDot}
                              size="2x"
                              color="#159EEC"
                           />
                        </div>
                        <div className="info">
                           <h5 className="text-[#1F2B6C]">LOCATION</h5>
                           <p className="text-[#159EEC]">Hcmut</p>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            <div className="nav"></div>
         </div>
         {logout && (
            <ConfirmAccept conFirm={conFirm} setLogoutPara={setLogoutPara} />
         )}
      </>
   );
};
export default HeadInfo;
