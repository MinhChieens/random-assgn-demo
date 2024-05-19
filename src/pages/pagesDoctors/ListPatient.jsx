import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardPatients from "../../components/CardPatients";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import AHealthRecord from "../../components/Form/AHealthRecord";
const ListPatient = () => {
   const [btnAdd, setBtnAdd] = useState(null);
   const [Loading, setLoading] = useState(false);
   const [listPatients, setListPatients] = useState(null);

   const getPatents = async (list) => {
      const relList = list.map(async (pId) => {
         const docPatient = await getDoc(doc(db, "users", pId));
         if (docPatient.exists()) {
            console.log(docPatient.data().healthRecord);
            return { healthInfo: docPatient.data().healthRecord, uid: pId };
         }
         return null;
      });
      const valuess = await Promise.all(relList);
      const validList = valuess.filter((v) => v !== null);
      setListPatients(validList);
   };
   const getListPatients = async () => {
      const CrtUser = getAuth().currentUser;
      const listPatients = await getDoc(doc(db, "doctors", CrtUser.uid));
      if (listPatients.exists()) {
         console.log(listPatients.data().ListPatient);
         getPatents(listPatients.data().ListPatient);
      }
   };
   useEffect(() => {
      getListPatients();
   }, []);
   const [value, setValue] = useState({
      name: "HCMUT",
      age: "57",
      diagnose: "Deadline",
      timeTreat: "4 years",
      gender: "other",
      level: "2",
      heartRate: "-1",
      bloodGroup: "A",
      bloodPressure: "1/1",
   });
   // redirect to user profile
   const handleChange = (e) => {
      e.preventDefault();

      setValue({ ...value, [e.target.name]: e.target.value });
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(value);
   };
   return (
      <>
         <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
            <div className="flex gap-5 items-center">
               <h3 className="text-2xl  font-bold text-white">My Patients</h3>
               <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
                  {1} Patients
               </p>
               <p className="text-white font-bold">
                  Date : {new Date().getDate()}/ {new Date().getMonth()}/
                  {new Date().getFullYear()}
               </p>
            </div>
            {btnAdd != null && (
               <button
                  onClick={() => setBtnAdd(null)}
                  className=" h-10 w-40 rounded bg-lightblue font-bold text-darkblue/80 hover:text-darkblue"
               >
                  <p>Return</p>
               </button>
            )}
         </div>
         {btnAdd == null ? (
            <div className="pt-2">
               <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
                  <div className="col-span-2 justify-self-start">Name</div>
                  <div className="col-span-2">Diagnose</div>
                  <div className="col-span-1">Age</div>
                  <div className="col-span-2">Gender</div>
                  <div className="col-span-2">Treatment Time</div>
                  <div className="col-span-2">Level</div>
                  <div className="col-span-1">Details</div>
               </div>
               <div className="flex flex-col justify-center items-center gap-4 pt-4">
                  {listPatients &&
                     listPatients.map((p) => {
                        console.log(p);
                        return (
                           <div
                              key={p.healthInfo.name}
                              className="w-[95%] mx-auto grid grid-cols-12 p-3 border-2 hover: items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white "
                           >
                              <div className="col-span-2 justify-self-start">
                                 {p.healthInfo.name}
                              </div>
                              <div className="col-span-2">
                                 {p.healthInfo.diagnose}
                              </div>
                              <div className="col-span-1">
                                 {p.healthInfo.age}
                              </div>
                              <div className="col-span-2">
                                 {p.healthInfo.gender}
                              </div>
                              <div className="col-span-2">
                                 {p.healthInfo.timeTreat}
                              </div>
                              <div className="col-span-2">
                                 {p.healthInfo.level}
                              </div>
                              <button
                                 onClick={() => setBtnAdd(p.uid)}
                                 className="col-span-1"
                              >
                                 <FontAwesomeIcon icon={faCircleInfo} />
                              </button>
                           </div>
                        );
                     })}
               </div>
            </div>
         ) : (
            <AHealthRecord userid={btnAdd} id={null} />
         )}
      </>
   );
};

export default ListPatient;
