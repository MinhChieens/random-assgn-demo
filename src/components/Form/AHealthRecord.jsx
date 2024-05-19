import { useEffect, useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "../../constants/firebase";
import { toast, Bounce } from "react-toastify";

// uid is patientid, required
// if no id, assume doctor filling a new form
const AHealthRecord = ({ userid, id }) => {
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
      date: "",
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
      setRecord({ ...record, [e.target.name]: e.target.value });
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
      const updateRecord = async () => {
         const userSnap = await getDoc(doc(db, "users", userid));
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
         if (id != null) {
            const recordSnap = await getDoc(
               doc(db, "healthRecords", userid, "records", id.toString())
            );
            if (!recordSnap.exists()) {
               console.log("No such record!");
               return;
            }
            setRecord({ ...record, ...recordSnap.data() });
         }
      };
      updateRecord();
   }, []);

   const setData = async () => {
      setLoading(true);
      setRecord({ ...record, date: new Date().toString() });
      await addDoc(
         // change fix id to dynamic id
         collection(db, "healthRecords", userid, "records"),
         record
      );
      setLoading(false);
      alertSuccess();
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setData();
   };

   return (
      <>
         <form onSubmit={(e) => handleSubmit(e)}>
            <ul className="bg-white grid grid-cols-4 w-[90%] mx-auto items-stretch *:py-0 gap-3 my-3 font-[poppins] border-2 rounded-2xl px-5 py-5">
               <p className="col-span-4">
                  - above hline is const (taken from user.information, except
                  for SSN which isnt in user.information), below is editable
                  (but should be changed to be edited by doctors only).
               </p>
               <p className="col-span-2 justify-self-center self-stretch flex gap-1">
                  <p className="font-bold">Record date: </p>
                  <p>{record.date}</p>
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
            {id == null && (
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
            )}
         </form>
      </>
   );
};

AHealthRecord.propTypes = {
   userid: PropTypes.string.isRequired,
   id: PropTypes.string,
};

export default AHealthRecord;
