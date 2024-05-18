import { useEffect, useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCircleInfo,
   faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
   doc,
   updateDoc,
   getDoc,
   addDoc,
   setDoc,
   collection,
   getDocs,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import { toast, Bounce } from "react-toastify";

const AHealthRecord = ({ id }) => {
   const [user, setUser] = useState({
      name: "a",
      dob: "2024-04-17",
      age: 20,
      phone: "0123456789",
      gender: "other",
      hi: "HC4720001500041",
   });

   const [record, setRecord] = useState({
      SSN: "080204000421",
      weight: 0,
      height: 0,
      bloodGroup: "",
      bloodRate: "",
      history: ["", "", "", ""],
      medication: ["", "", "", ""],
      allergies: ["", "", "", ""],
      surgery: ["", "", "", ""],
   });

   const [Loading, setLoading] = useState(false);

   const handleHistoryChange = (e) => {
      e.preventDefault();
      setRecord((prev) => {
         let temp = [...prev.history];
         temp[e.target.id] = e.target.value;
         return { ...prev, history: temp };
      });
   };

   const handleMedicationChange = (e) => {
      e.preventDefault();
      setRecord((prev) => {
         let temp = [...prev.medication];
         temp[e.target.id] = e.target.value;
         return { ...prev, medication: temp };
      });
   };

   const handleAllergiesChange = (e) => {
      e.preventDefault();
      setRecord((prev) => {
         let temp = [...prev.allergies];
         temp[e.target.id] = e.target.value;
         return { ...prev, allergies: temp };
      });
   };

   const handleSurgeryChange = (e) => {
      e.preventDefault();
      setRecord((prev) => {
         let temp = [...prev.surgery];
         temp[e.target.id] = e.target.value;
         return { ...prev, surgery: temp };
      });
   };

   const handleChange = (e) => {
      e.preventDefault();
      setRecord({ ...user, [e.target.name]: e.target.value });
   };

   const alertSuccess = () => {
      toast.success("🦄 Wow so easy!", {
         position: "top-right",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
         transition: Bounce,
      });
   };

   useEffect(() => {
      console.log(id);
      const updateRecord = async () => {
         const currentUser = getAuth().currentUser;
         if (!currentUser) return;
         const recordSnap = await getDoc(
            doc(db, "healthRecords", currentUser.uid, "records", id.toString())
         );
         if (!recordSnap.exists()) {
            console.log("No such record!");
            return;
         }
         const userSnap = await getDoc(doc(db, "users", currentUser.uid));
         if (!userSnap.exists()) {
            console.log("No such user!");
            return;
         }
         const userData = userSnap.data();
         setUser({
            ...user,
            name: userData.information.name,
            dob: userData.information.birthday,
            age: userData.information.age,
            phone: userData.information.phone,
            gender: userData.information.gender,
            hi: userData.information.hi,
         });
         if (userData.healthRecord)
            setRecord({ ...user, ...recordSnap.data() });
      };
      updateRecord();
   }, []);

   const setData = async () => {
      setLoading(true);
      setRecord({ ...record, date: new Date().toISOString() });
      const currentUser = getAuth().currentUser;
      if (!currentUser) return;
      await setDoc(
         // change fix id to dynamic id
         doc(db, "healthRecords", currentUser.uid, "records", id.toString()),
         record
      );
      setLoading(false);
      alertSuccess();
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(user);
      setData();
   };

   return (
      <>
         <form onSubmit={(e) => handleSubmit(e)}>
            <ul className="bg-white grid grid-cols-4 w-[90%] mx-auto items-stretch *:py-0 gap-3 mt-3 font-[poppins] border-2 rounded-2xl px-5 py-5">
               <p className="col-span-4">
                  - above hline is const (taken from user.information, except
                  for SSN which isnt in user.information), below is editable
                  (but should be changed to be edited by doctors only).
               </p>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="name">
                     Full Name
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.name}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="dob">
                     Day Of Birth
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.dob}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="age">
                     Age
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.age}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="gender">
                     Gender
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.gender}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="phone">
                     Phone Number
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.phone}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-2">
                  <label className="pl-2 font-bold" htmlFor="SSN">
                     SSN
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="text"
                     value={record.SSN}
                     name="SSN"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-2">
                  <label className="pl-2 font-bold" htmlFor="hi">
                     Health Insurance
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {user.hi}
                  </p>
               </li>
               <hline className="col-span-4 border-t-2"></hline>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="weight">
                     Weight
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="number"
                     value={record.weight}
                     name="weight"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="height">
                     Height
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="number"
                     value={record.height}
                     name="height"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="blood">
                     Blood Type
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="text"
                     value={record.bloodGroup}
                     name="blood"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="bloodRate">
                     Blood Pressure
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="text"
                     value={record.bloodRate}
                     name="bloodRate"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="history">
                     Medical History
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {record.history.map((item, index) => (
                        <input
                           key={index}
                           id={index}
                           onChange={(e) => handleHistoryChange(e)}
                           className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                           type="text"
                           value={item}
                        />
                     ))}
                  </div>
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="medication">
                     Medication
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {record.medication.map((item, index) => (
                        <input
                           key={index}
                           id={index}
                           onChange={(e) => handleMedicationChange(e)}
                           className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                           type="text"
                           value={item}
                        />
                     ))}
                  </div>
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="allergies">
                     Allergies
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {record.allergies.map((item, index) => (
                        <input
                           key={index}
                           id={index}
                           onChange={(e) => handleAllergiesChange(e)}
                           className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                           type="text"
                           value={item}
                        />
                     ))}
                  </div>
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="surgery">
                     Surgery
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {record.surgery.map((item, index) => (
                        <input
                           key={index}
                           id={index}
                           onChange={(e) => handleSurgeryChange(e)}
                           className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                           type="text"
                           value={item}
                        />
                     ))}
                  </div>
               </li>
            </ul>
            <div className="self-end flex justify-center py-5">
               <button
                  type="submit"
                  className="bg-skyblue flex flex-row text-white rounded-md px-4 py-2"
               >
                  {Loading && (
                     <img
                        src={Spin}
                        className="h-6 w-6 motion-reduce:hidden animate-spin"
                        alt=""
                     />
                  )}
                  <p className=""> Submit</p>
               </button>
            </div>
         </form>
      </>
   );
};

const HealthRecord = () => {
   const [id, setId] = useState(null);
   const [records, setRecords] = useState([]);
   const getRecords = async () => {
      const currentUser = getAuth().currentUser;
      if (!currentUser) return;
      const docRef = collection(
         db,
         "healthRecords",
         currentUser.uid,
         "records"
      );
      const docSnap = await getDocs(docRef);
      if (docSnap.empty) {
         console.log("No such document!");
         return;
      }
      const data = docSnap.docs.map((doc) => doc.data());
      console.log(data);
      setRecords(data);
   };
   useEffect(() => {
      getRecords();
      console.log(records);
   }, []);

   return (
      <>
         {id === null ? (
            <>
               <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
                  <div className="flex gap-5 items-center">
                     <h3 className="text-2xl  font-bold text-white">
                        All Health Records
                     </h3>
                     <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
                        {1} Totals
                     </p>
                  </div>
               </div>
               <div className="pt-2">
                  <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
                     <div className="col-span-1"></div>
                     <div className="col-span-5">Name</div>
                     <div className="col-span-4">Date</div>
                     <div className="col-span-2">Action</div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4 pt-4">
                     {records &&
                        records.map((p) => {
                           return (
                              <div
                                 key={p.id}
                                 className="w-[95%] mx-auto  h-14 grid grid-cols-12 p-1 border-2 items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white "
                              >
                                 <div className="col-span-1">{p.id}</div>
                                 <div className="col-span-5">{p.name}</div>
                                 <div className="col-span-4">{p.date}</div>
                                 <div className="col-span-2">
                                    <button
                                       onClick={() => setId(p.id)}
                                       className="pr-5"
                                    >
                                       <FontAwesomeIcon icon={faCircleInfo} />
                                    </button>
                                 </div>
                              </div>
                           );
                        })}
                     {/* <div className="w-[95%] mx-auto  h-14 grid grid-cols-12 p-1 border-2 items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white ">
                        <div className="col-span-1">1</div>
                        <div className="col-span-5">Demo</div>
                        <div className="col-span-4">Date</div>
                        <div className="col-span-2">
                           <button onClick={() => setId(0)} className="pr-5">
                              <FontAwesomeIcon icon={faCircleInfo} />
                           </button>
                        </div>
                     </div> */}
                  </div>
               </div>
            </>
         ) : (
            <>
               <div className="bg-darkblue h-12 flex items-center justify-between px-10 font-[poppins] text-base">
                  <div className="flex items-center gap-5">
                     <h3
                        onClick={() => setId(null)}
                        className="text-2xl  font-bold text-white hover:bg-lightblue py-1 px-2 rounded-lg cursor-pointer"
                     >
                        <span>
                           <FontAwesomeIcon
                              icon={faArrowCircleLeft}
                              className="pr-3"
                           />
                        </span>{" "}
                        Back
                     </h3>
                  </div>
               </div>
               <AHealthRecord id={id} />
            </>
         )}
      </>
   );
};

AHealthRecord.propTypes = {
   id: PropTypes.number.isRequired,
};

export default HealthRecord;
