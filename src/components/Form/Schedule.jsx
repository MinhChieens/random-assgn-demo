import React from "react";
import { useState } from "react";

const Schedule = () => {
   const [value, setValues] = useState({
      contact: "",
      recurrence: false,
      frequency: "",
      frequencyDaily: "",
      startDate: "",
      startTime: "",
   });

   const handleSubmit = (e) => {};
   const handleChange = (e) => {
      setValues({ ...value, [e.target.name]: e.target.value });
   };
   const handleReset = () => {};

   return (
      <form
         onSubmit={(e) => handleSubmit(e)}
         onReset={handleReset}
         className="w-4/5 mx-auto my-4 flex flex-col"
      >
         <ul className="columns-2 gap-4 items-stretch *:py-2">
            <li className="flex flex-col gap-1">
               <label htmlFor="contact">Contact</label>
               <input
                  onChange={(e) => handleChange(e)}
                  type="tel"
                  name="contact"
                  id="contact"
                  className="border-2 border-gray-300 p-1 rounded-md"
                  required
                  placeholder="0123456789"
               />
            </li>
            <li className="flex gap-1 items-center">
               <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  id="recurrence"
                  name="recurrence"
                  value="recurrence"
               />
               <label htmlFor="recurrence">Recurrence</label>
            </li>
            <li className="flex gap-4 items-center">
               <label htmlFor="frequency">Frequency</label>
               <li className="flex gap-1">
                  <input
                     onChange={(e) => handleChange(e)}
                     label="Daily"
                     type="radio"
                     id="daily"
                     name="frequency"
                     value="daily"
                  />
                  <label htmlFor="daily">Daily</label>
               </li>
               <li className="flex gap-1">
                  <input
                     onChange={(e) => handleChange(e)}
                     label="Weekly"
                     type="radio"
                     id="weekly"
                     name="frequency"
                     value="weekly"
                  />
                  <label htmlFor="weekly">Weekly</label>
               </li>
               <li className="flex gap-1">
                  <input
                     onChange={(e) => handleChange(e)}
                     label="Monthly"
                     type="radio"
                     id="monthly"
                     name="frequency"
                     value="monthly"
                  />
                  <label htmlFor="monthly">Monthly</label>
               </li>
               <li className="flex gap-1">
                  <input
                     onChange={(e) => handleChange(e)}
                     label="Yearly"
                     type="radio"
                     id="yearly"
                     name="frequency"
                     value="yearly"
                  />
                  <label htmlFor="yearly">Yearly</label>
               </li>
            </li>
            {value.frequency === "daily" ? (
               <ul
                  onChange={(e) => handleChange(e)}
                  className="flex flex-col gap-1"
               >
                  <li className="flex gap-1 items-center">
                     <input
                        type="radio"
                        id="everyday"
                        name="frequencyDaily"
                        value="everyday"
                     />
                     <label htmlFor="everyday">Every Weekdays</label>
                  </li>
                  <li className="flex gap-1 items-center">
                     <input
                        type="radio"
                        id="oneday"
                        name="frequencyDaily"
                        value=""
                     />
                     <label htmlFor="oneday">Every</label>
                     <select
                        id="oneday"
                        name="frequencyDaily"
                        className="border-2 border-gray-300 p-1 rounded-md"
                     >
                        <option value="monday">Mondays</option>
                        <option value="tuesday">Tuesdays</option>
                        <option value="wednesday">Wednesdays</option>
                        <option value="thursday">Thursdays</option>
                        <option value="friday">Fridays</option>
                     </select>
                  </li>
               </ul>
            ) : (
               ""
            )}
            <li className="flex flex-col gap-1 break-before-all">
               <label htmlFor="startDate">Start Date</label>
               <div className="flex gap-1 items-stretch">
                  <input
                     type="date"
                     className="border-2 border-gray-300 p-1 rounded-md"
                     id="startDate"
                     name="startDate"
                     required
                  />
                  <input
                     type="time"
                     className="border-2 border-gray-300 p-1 rounded-md"
                     id="startTime"
                     name="startTime"
                     required
                  />
               </div>
            </li>
            <li className="flex flex-col gap-1">
               <label htmlFor="endDate">End Date</label>
               <div className="flex gap-1">
                  <input
                     type="date"
                     className="border-2 border-gray-300 p-1 rounded-md"
                     id="endDate"
                     name="endDate"
                     required
                  />
                  <input
                     type="time"
                     className="border-2 border-gray-300 p-1 rounded-md"
                     id="endTime"
                     name="endTime"
                     required
                  />
               </div>
            </li>
            <div className="self-end flex gap-2">
               <button
                  type="reset"
                  className=" text-skyblue rounded-md border-gray-300 hover:bg-gray-200  border-2 px-4 py-2"
               >
                  Reset
               </button>
               <button
                  type="submit"
                  className="bg-skyblue/80 hover:bg-skyblue text-white rounded-md px-4 py-2"
               >
                  Submit
               </button>
            </div>
         </ul>
      </form>
   );
};

export default Schedule;
