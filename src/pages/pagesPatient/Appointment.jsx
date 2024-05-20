import {
  getDocs,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
const Appointment = () => {
  const crtUser = getAuth().currentUser;
  const [value, setValues] = useState({
    activity: "",
    activa: "",
    time: "",
    date: "",
    message: "",
    hi: "",
    state: false,
  });
  const notifySuccess = () =>
    toast.success("Appoitments Success!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", crtUser.uid), {
      myAppointment: value,
    });
    await updateDoc(doc(db, "doctors", "appointments"), {
      [value.activity]: arrayUnion(crtUser.uid),
    });
    console.log(value);
    notifySuccess();
  };

  const handleReset = () => {
    const reset = {
      activity: "",
      time: "",
      date: "",
      message: "",
      doctor: "",
    };
    setValues(reset);
  };
  const handleChange = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onReset={handleReset}
      className="flex flex-col w-4/5 mx-auto my-4 text-base font-[poppins] rounded-2xl"
    >
      <ul className="w-full mx-auto  grid grid-cols-2 gap-2  items-stretch  p-5">
        <li className="flex flex-col gap-1">
          <label htmlFor="activity">Department</label>
          <select
            onChange={(e) => handleChange(e)}
            className={
              "block w-full h-10 px-4 py-2 border border-black bg-transparent rounded-md shadow-sm outline-none opacity-80"
            }
            type="text"
            name="activity"
            id="activity"
            required
          >
            <option value="" selected hidden>
              Select a Department
            </option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Obstetrics and Gynecology">
              Obstetrics and Gynecology
            </option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Cardiology">Cardiology</option>
          </select>
        </li>
        <li className="flex flex-col gap-1">
          <label htmlFor="activa">Activity</label>
          <select
            onChange={(e) => handleChange(e)}
            className={
              "block w-full h-10 px-4 py-2 border border-black bg-transparent rounded-md shadow-sm outline-none opacity-80"
            }
            type="text"
            name="activa"
            id="activa"
            required
          >
            <option value="" selected hidden>
              Select an activity
            </option>
            <option value="examination">Examination</option>
            <option value="consultation">Consultation</option>
          </select>
        </li>
        <li className="flex flex-col gap-1 ">
          <label htmlFor="date">Date</label>
          <div className="flex gap-1 items-stretch">
            <input
              onChange={(e) => handleChange(e)}
              type="date"
              className="block w-full h-10 px-4 py-2 border-black border bg-transparent rounded-md shadow-sm outline-none opacity-80"
              id="date"
              name="date"
              required
            />
          </div>
        </li>
        <li className="flex flex-col gap-1">
          <label htmlFor="time">Time</label>
          <select
            onChange={(e) => handleChange(e)}
            className={`block w-full h-10 px-4 py-2 border-black border bg-transparent rounded-md shadow-sm outline-none opacity-80`}
            name="time"
            id="time"
            required
          >
            <option value="" selected hidden>
              Select time
            </option>
            <option value="8AM - 10AM">8AM - 10AM</option>
            <option value="10AM - 12AM">10AM - 12AM</option>
            <option value="1PM - 3PM">1PM - 3PM</option>
            <option value="3PM - 5PM">3PM - 5PM</option>
          </select>
        </li>
      </ul>
      <hr className="w-full h-px my-2 bg-white/50" />
      <textarea
        onChange={(e) => handleChange(e)}
        className="border-2 border-gray-300 my-2 p-2  rounded-md bg-transparent"
        name="message"
        id="message"
        rows="3"
        placeholder="Message"
      ></textarea>
      <div className="self-end flex gap-2">
        <button
          type="reset"
          className=" text-skyblue rounded-md hover:bg-gray-200 border-black  border-2 px-4 py-2"
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
    </form>
  );
};

export default Appointment;
