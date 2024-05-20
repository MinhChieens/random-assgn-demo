import React, { useState, useCallback, useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import Scheduler, { View, Editing } from "devextreme-react/scheduler";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../constants/firebase";
import { toast, Bounce } from "react-toastify";
const notifySuccess = () =>
  toast.success("Updated Successfully!", {
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
const Schedular = ({ uid }) => {
  const crtDate =
    new Date().getFullYear() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getDate();
  console.log(crtDate);
  const [currentDate, setCurrentDate] = useState(crtDate);
  const [listCalender, setListCalender] = useState([]);

  useEffect(() => {
    const getCl = async () => {
      const docDoctor = await getDoc(doc(db, "doctors", uid));
      console.log(docDoctor.data().calendar);
      setListCalender(docDoctor.data().calendar);
    };
    getCl();
  }, []);
  const handleAppointmentAdded = (e) => {
    if (!e.appointmentData) return;
    let temp = e.appointmentData;
    temp.endDate = e.appointmentData.endDate.toString();
    temp.startDate = e.appointmentData.startDate.toString();
    console.log(temp.endDate);
    console.log("Appointment added:", temp);
    setListCalender([...listCalender, temp]);
  };

  const handleAppointmentDeleting = (e) => {
    if (!e.appointmentData) return;
    console.log("Appointment Delete:", e.appointmentData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(listCalender);
    const docDoctor = await getDoc(doc(db, "doctors", uid));
    await updateDoc(doc(db, "doctors", uid), {
      calendar: listCalender,
    });
    console.log(docDoctor.data());
    notifySuccess();
  };
  return (
    <>
      <Scheduler
        currentDate={currentDate}
        dataSource={listCalender}
        height={500}
        onAppointmentAdded={handleAppointmentAdded}
        onAppointmentDeleting={handleAppointmentDeleting}
        defaultCurrentView="week"
      >
        <View type="week" startDayHour={7} endDayHour={17} />
        <Editing allowAdding={true} allowDeleting={true} />
      </Scheduler>
      <div className=" h-10 font-[poppins] flex justify-center">
        <button
          onClick={handleSubmit}
          className="item-center bg-sky-400 cursor-pointer h-10 w-24"
        >
          SAVE
        </button>
      </div>
    </>
  );
};

export default Schedular;
