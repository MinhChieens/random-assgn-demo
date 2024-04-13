import Dashboard from "../pages/pagesPatient/Dashboard";
import Support from "../pages/pagesPatient/Support";
import DashboardAdmin from "../pages/pagesAdmin/DashboardAdmin";
import SupportAdmin from "../pages/pagesAdmin/SupportAdmin";
import DashboardDoctor from "../pages/pagesPatient/Dashboard";
import SupportDoctor from "../pages/pagesDoctors/SupportDoctor";
import AppointmentForm from "../components/Form/AppointmentForm";
import ListDoctors from "../pages/pagesAdmin/ListDoctors";
import DoctorScheduling from "../pages/pagesDoctors/DoctorScheduling";

export const RouteUser = [
   { path: "home", element: <Dashboard />, state: "home" },
   { path: "dashboard", element: <Dashboard />, sidebarProps: {} },
   { path: "support", element: <Support />, sidebarProps: {} },
   { path: "appointment", element: <AppointmentForm />, sidebarProps: {} },
];
export const RouteDoctor = [
   { path: "home", element: <DashboardDoctor />, state: "home" },
   { path: "dashboard", element: <DashboardDoctor />, sidebarProps: {} },
   { path: "support", element: <SupportDoctor />, sidebarProps: {} },
   { path: "schedule", element: <DoctorScheduling />, sidebarProps: {} },
];

export const RouteAdmin = [
   { path: "home", element: <DashboardAdmin />, state: "home" },
   { path: "dashboard", element: <DashboardAdmin />, sidebarProps: {} },
   { path: "support", element: <SupportAdmin />, sidebarProps: {} },
   { path: "listDoctors", element: <ListDoctors />, sidebarProps: {} },
];
