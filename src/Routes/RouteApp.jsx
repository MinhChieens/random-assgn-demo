import Dashboard from "../pages/pagesPatient/Dashboard";
import Support from "../pages/pagesPatient/Support";
import DashboardAdmin from "../pages/pagesAdmin/DashboardAdmin";
import SupportAdmin from "../pages/pagesAdmin/SupportAdmin";
import DashboardDoctor from "../pages/pagesPatient/Dashboard";
import SupportDoctor from "../pages/pagesDoctors/SupportDoctor";

export const RouteUser = [
   { path: "home", element: <Dashboard />, state: "home" },
   { path: "dashboard", element: <Dashboard />, sidebarProps: {} },
   { path: "support", element: <Support />, sidebarProps: {} },
];
export const RouteAdmin = [
   { path: "home", element: <DashboardAdmin />, state: "home" },
   { path: "dashboard", element: <DashboardAdmin />, sidebarProps: {} },
   { path: "support", element: <SupportAdmin />, sidebarProps: {} },
];
export const RouteDoctor = [
   { path: "home", element: <DashboardDoctor />, state: "home" },
   { path: "dashboard", element: <DashboardDoctor />, sidebarProps: {} },
   { path: "support", element: <SupportDoctor />, sidebarProps: {} },
];
