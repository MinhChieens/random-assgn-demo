import React from "react";
import { homePatient } from "../../constants/dashboardHome";
import DashboardHome from "../../components/Dashboard/DashboardHome";

const Dashboard = () => {
   return <DashboardHome title="Dashboard Patient" homeContent={homePatient} />;
};

export default Dashboard;
