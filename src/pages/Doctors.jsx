import React from "react";
import FrameDoctor from "../components/FrameDoctor";
import DoctorEntry from "../components/DoctorEntry";
import DoctorHeader from "../components/DoctorHeader";
import PageWraper from "../Layout/PageWraper";
import { items } from "../constants/Sidebar";
const Doctors = () => {
   return <PageWraper items={items} />;
};

export default Doctors;
