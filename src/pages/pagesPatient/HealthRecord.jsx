import { useEffect, useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
import { set } from "firebase/database";

const HealthRecord = () => {
   const [value, setValue] = useState({
      name: "a",
      dob: "2024-04-17",
      age: 20,
      phone: "0123456789",
      gender: "other",
      weight: 60,
      height: 1.6,
      SSN: "080204000421",
      hi: "HC4720001500041",
      bloodGroup: "O",
      bloodRate: "120/80",
      history: ["anxiety", "depression", "", ""],
      medication: ["aspirin", "", "", ""],
      allergies: ["", "", "", ""],
      surgery: ["", "", "", ""],
   });
   const [Loading, setLoading] = useState(false);

   const handleHistoryChange = (e) => {
      e.preventDefault();
      setValue((prev) => {
         let temp = [...prev.history];
         temp[e.target.id] = e.target.value;
         return { ...prev, history: temp };
      });
   };

   const handleMedicationChange = (e) => {
      e.preventDefault();
      setValue((prev) => {
         let temp = [...prev.medication];
         temp[e.target.id] = e.target.value;
         return { ...prev, medication: temp };
      });
   };

   const handleAllergiesChange = (e) => {
      e.preventDefault();
      setValue((prev) => {
         let temp = [...prev.allergies];
         temp[e.target.id] = e.target.value;
         return { ...prev, allergies: temp };
      });
   };

   const handleSurgeryChange = (e) => {
      e.preventDefault();
      setValue((prev) => {
         let temp = [...prev.surgery];
         temp[e.target.id] = e.target.value;
         return { ...prev, surgery: temp };
      });
   };

   const handleChange = (e) => {
      e.preventDefault();
      setValue({ ...value, [e.target.name]: e.target.value });
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
         const currentUser = getAuth().currentUser;
         if (!currentUser) return;
         const docRef = doc(db, "users", currentUser.uid);
         const docSnap = await getDoc(docRef);
         if (!docSnap.exists()) {
            console.log("No such document!");
            return;
         }
         const data = docSnap.data();
         setValue({
            ...value,
            name: data.information.name,
            dob: data.information.birthday,
            age: data.information.age,
            phone: data.information.phone,
            gender: data.information.gender,
            hi: data.information.hi,
            SSN: data.healthRecord.SSN,
            weight: data.healthRecord.weight,
            height: data.healthRecord.height,
            bloodGroup: data.healthRecord.bloodGroup,
            bloodRate: data.healthRecord.bloodRate,
            history: data.healthRecord.history,
            medication: data.healthRecord.medication,
            allergies: data.healthRecord.allergies,
            surgery: data.healthRecord.surgery,
         });
      };
      updateRecord();
   }, []);

   const setData = async () => {
      setLoading(true);
      const currentUser = getAuth().currentUser;
      if (!currentUser) return;
      await updateDoc(doc(db, "users", currentUser.uid), {
         healthRecord: value,
      });
      setLoading(false);
      alertSuccess();
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(value);
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
                     {value.name}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="dob">
                     Day Of Birth
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {value.dob}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="age">
                     Age
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {value.age}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="gender">
                     Gender
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {value.gender}
                  </p>
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="phone">
                     Phone Number
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {value.phone}
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
                     value={value.SSN}
                     name="SSN"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-2">
                  <label className="pl-2 font-bold" htmlFor="hi">
                     Health Insurance
                  </label>
                  <p className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 ">
                     {value.hi}
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
                     value={value.weight}
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
                     value={value.height}
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
                     value={value.bloodGroup}
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
                     value={value.bloodRate}
                     name="bloodRate"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="history">
                     Medical History
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {value.history.map((item, index) => (
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
                     {value.medication.map((item, index) => (
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
                     {value.allergies.map((item, index) => (
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
                     {value.surgery.map((item, index) => (
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

export default HealthRecord;
