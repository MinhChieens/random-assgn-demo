import React from "react";
import { homeDoctor } from "../../constants/dashboardHome";
import DashboardHome from "../../components/Dashboard/DashboardHome";

const DashboardDoctor = () => {
   return <DashboardHome title="Dashboard Doctor" homeContent={homeDoctor} />;
};

export default DashboardDoctor;
