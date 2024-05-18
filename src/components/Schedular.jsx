import React, { useState, useCallback, useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import Scheduler, { View, Editing } from "devextreme-react/scheduler";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../constants/firebase";

const Schedular = ({ uid }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 18));
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
      <button onClick={handleSubmit}>SAVE</button>
    </>
  );
};

export default Schedular;
