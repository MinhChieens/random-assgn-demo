import React from "react";
import { useState } from "react";

const AppointmentForm = () => {
   const [value, setValues] = useState({
      physicianName: "",
      activity: "",
      subject: "",
      patientName: "",
      patientPhone: "",
      HI: false,
      length: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      message: "",
   });

   const handleSubmit = (e) => {};
   const handleReset = () => {};
   const handleChange = (e) => {};

   return (
      <form
         onSubmit={(e) => handleSubmit(e)}
         onReset={handleReset}
         className="flex flex-col w-4/5 mx-auto my-4 text-base font-yeseva"
      >
         <ul className="w-full mx-auto  columns-2 gap-4  items-stretch *:py-2">
            <li className="flex flex-col gap-1">
               <label htmlFor="physicianName">Attending physician</label>
               <input
                  onChange={(e) => handleChange(e)}
                  className="border-2 border-gray-300 p-1 rounded-md"
                  type="text"
                  name="physicianName"
                  id="physicianName"
                  required
               />
            </li>
            <li className="flex flex-col gap-1">
               <label htmlFor="activity">Activity Type</label>
               <select
                  onChange={(e) => handleChange(e)}
                  className={`border-2 border-gray-300 px-1 py-2 rounded-md bg-white `}
                  type="text"
                  name="activity"
                  id="activity"
                  required
               >
                  <option value="" disabled selected hidden>
                     Select an activity
                  </option>
                  <option value="examination">Medical examination</option>
                  <option value="consultation">Consultation</option>
                  <option value="treatment">Treatment</option>
                  <option value="therapy">Therapy</option>
               </select>
            </li>
            <li className="flex flex-col gap-1">
               <label htmlFor="subject">Subject</label>
               <input
                  onChange={(e) => handleChange(e)}
                  className="border-2 border-gray-300 p-1 rounded-md"
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="SasS order time"
               />
            </li>
            <li className="flex flex-col gap-1">
               <label htmlFor="patient">Patient</label>
               <input
                  onChange={(e) => handleChange(e)}
                  className="border-2 border-gray-300 p-1 rounded-md"
                  type="text"
                  name="patientName"
                  id="patient"
                  placeholder="Name"
                  required
               />
               <input
                  onChange={(e) => handleChange(e)}
                  className="border-2 border-gray-300 p-1 rounded-md"
                  type="tel"
                  name="patientPhone"
                  id="patient"
                  placeholder="Phone number"
                  required
               />
            </li>
            <li className="flex gap-1 items-center">
               <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  id="HI"
                  name="HI"
                  value="HI"
               />
               <label htmlFor="HI">Home Isolation</label>
            </li>
            <li className="flex flex-col gap-1">
               <label htmlFor="length">Time length (minutes)</label>
               <input
                  onChange={(e) => handleChange(e)}
                  className="border-2 border-gray-300 p-1 rounded-md"
                  type="number"
                  min="0"
                  name="length"
                  id="length"
                  placeholder="15 Minutes"
                  required
               />
            </li>
         </ul>
         <hr className="w-full h-px my-2 bg-white/50" />
         <ul className="w-full mx-auto  columns-2 gap-4  items-stretch *:py-2">
            <li className="flex flex-col gap-1 ">
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
         </ul>
         <textarea
            className="border-2 border-gray-300 my-2 p-2 rounded-md"
            rows="3"
            placeholder="Message"
         ></textarea>
         <div className="self-end flex gap-2">
            <button
               type="reset"
               className=" text-skyblue rounded-md border-gray-300 border-2 px-4 py-2"
            >
               Reset
            </button>
            <button
               type="submit"
               className="bg-skyblue text-white rounded-md px-4 py-2"
            >
               Submit
            </button>
         </div>
      </form>
   );
};

export default AppointmentForm;
