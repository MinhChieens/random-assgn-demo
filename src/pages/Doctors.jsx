import React from "react";
import FrameDoctor from "../components/FrameDoctor";
import PageWraper from "../Layout/PageWraper";
import { SideDoctor } from "../constants/Sidebar";
const Doctors = () => {
   return <PageWraper items={SideDoctor} />;
};

export default Doctors;
