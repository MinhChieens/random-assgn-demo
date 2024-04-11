import React from "react";
import { homeAdmin } from "../../constants/dashboardHome";
import DashboardHome from "../../components/Dashboard/DashboardHome";

const DashboardAdmin = () => {
   return <DashboardHome title="Dashboard Admin" homeContent={homeAdmin} />;
};

export default DashboardAdmin;
