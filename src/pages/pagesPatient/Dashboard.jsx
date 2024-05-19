import React from "react";
import { homePatient } from "../../constants/dashboardHome";
import DashboardHome from "../../components/Dashboard/DashboardHome";
import UsageStatisticsChart from "../../components/Dashboard/UsageStatisticChart";
const Dashboard = () => {
    return (
        <div>
            
            <UsageStatisticsChart />
        </div>
    )
};

export default Dashboard;
