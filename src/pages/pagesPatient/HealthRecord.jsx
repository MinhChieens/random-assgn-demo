import { useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";

const HealthRecord = () => {
   const [value, setValue] = useState({
      name: "a",
      /* dob: "12/12/2021", */
      age: "3",
      weight: "12",
      height: "12",
      SSN: "080204000421",
      hi: "HC4720001500041",
      blood: "A RH-",
   });
   const [history, setHistory] = useState(["anxiety", "depression", "", ""]);
   const [medication, setMedication] = useState(["aspirin", "", "", ""]);
   const [allergies, setAllergies] = useState(["paracetamol", "", "", ""]);
   const [surgery, setSurgery] = useState(["", "", "", ""]);
   const [Loading, setLoading] = useState(false);

   const handleHistoryChange = (e) => {
      e.preventDefault();
      setHistory((prev) => {
         let temp = [...prev];
         temp[e.target.id] = e.target.value;
         return temp;
      });
   };

   const handleMedicationChange = (e) => {
      e.preventDefault();
      setMedication((prev) => {
         let temp = [...prev];
         temp[e.target.id] = e.target.value;
         return temp;
      });
   };

   const handleAllergiesChange = (e) => {
      e.preventDefault();
      setAllergies((prev) => {
         let temp = [...prev];
         temp[e.target.id] = e.target.value;
         return temp;
      });
   };

   const handleSurgeryChange = (e) => {
      e.preventDefault();
      setSurgery((prev) => {
         let temp = [...prev];
         temp[e.target.id] = e.target.value;
         return temp;
      });
   };

   const handleChange = (e) => {
      e.preventDefault();
      setValue({ ...value, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(value);
      console.log(history);
      console.log(medication);
      console.log(allergies);
      console.log(surgery);
   };

   return (
      <>
         <form onSubmit={(e) => handleSubmit(e)}>
            <ul className="bg-white grid grid-cols-4 w-[90%] mx-auto items-stretch *:py-0 gap-3 mt-3 font-[poppins] border-2 rounded-2xl px-5 py-5">
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="name">
                     Full Name
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="text"
                     value={value.name}
                     name="name"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20">
                  <label className="pl-2 font-bold" htmlFor="age">
                     Age
                  </label>
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="number"
                     value={value.age}
                     name="age"
                  />
               </li>
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
                     value={value.blood}
                     name="blood"
                  />
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
                  <input
                     onChange={(e) => handleChange(e)}
                     className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                     type="text"
                     value={value.hi}
                     name="hi"
                  />
               </li>
               <li className="flex flex-col gap-1 h-20 col-span-4">
                  <label className="pl-2 font-bold" htmlFor="history">
                     Medical History
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                     {history.map((item, index) => (
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
                     {medication.map((item, index) => (
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
                     {allergies.map((item, index) => (
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
                     {surgery.map((item, index) => (
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
