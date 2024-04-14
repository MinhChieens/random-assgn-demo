import React from "react";
import FrameDoctor from "../components/FrameDoctor";
import DoctorEntry from "../components/DoctorEntry";
import DoctorHeader from "../components/DoctorHeader";
import PageWraper from "../Layout/PageWraper";
import { SideDoctor } from "../constants/Sidebar";
const Doctors = () => {
  return <PageWraper items={SideDoctor} />;
};

export default Doctors;
