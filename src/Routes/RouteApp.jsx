import Dashboard from "../pages/pagesPatient/Dashboard";
import Support from "../pages/pagesPatient/Support";
import DashboardAdmin from "../pages/pagesAdmin/DashboardAdmin";
import SupportAdmin from "../pages/pagesAdmin/SupportAdmin";
import DashboardDoctor from "../pages/pagesDoctors/DashboardDoctor";
import SupportDoctor from "../pages/pagesDoctors/SupportDoctor";
import ListDoctors from "../pages/pagesAdmin/ListDoctors";
import DoctorScheduling from "../pages/pagesDoctors/DoctorScheduling";
import InfoDoctor from "../pages/pagesDoctors/InfoDoctor";
import ListMedicine from "../pages/pagesAdmin/ListMedicine";
import ListPatient from "../pages/pagesDoctors/ListPatient";
import Infomation from "../pages/pagesPatient/Infomation";
import ListDevice from "../pages/pagesAdmin/ListDevice";
import ListAppointment from "../pages/pagesDoctors/ListAppointment";
import Appointment from "../pages/pagesPatient/Appointment";
import ListPatientOfAdmin from "../pages/pagesAdmin/ListPatientOfAdmin";
import Staff from "../pages/pagesAdmin/Staff";
import StaffSchedule from "../pages/pagesAdmin/StaffSchedule";
export const RouteUser = [
  { path: "home", element: <Dashboard />, state: "home" },
  { path: "dashboard", element: <Dashboard />, sidebarProps: {} },
  { path: "support", element: <Support />, sidebarProps: {} },
  { path: "appointment", element: <Appointment />, sidebarProps: {} },
  { path: "information", element: <Infomation />, sidebarProps: {} },
];
export const RouteDoctor = [
  { path: "", element: <DashboardDoctor />, state: "home" },
  { path: "dashboard", element: <DashboardDoctor />, sidebarProps: {} },
  { path: "support", element: <SupportDoctor />, sidebarProps: {} },
  { path: "schedule", element: <DoctorScheduling />, sidebarProps: {} },
  { path: "profile", element: <InfoDoctor />, sidebarProps: {} },
  { path: "patientList", element: <ListPatient />, sidebarProps: {} },
  { path: "appointments", element: <ListAppointment />, sidebarProps: {} },
];

export const RouteAdmin = [
  { path: "home", element: <DashboardAdmin />, state: "home" },
  { path: "dashboard", element: <DashboardAdmin />, sidebarProps: {} },
  { path: "support", element: <SupportAdmin />, sidebarProps: {} },
  { path: "listDoctors", element: <ListDoctors />, sidebarProps: {} },
  { path: "medicines", element: <ListMedicine />, sidebarProps: {} },
  { path: "devices", element: <ListDevice />, sidebarProps: {} },
  { path: "allPatients", element: <ListPatientOfAdmin />, sidebarProps: {} },
  { path: "staff", element: <Staff />, sidebarProps: {} },
  { path: "staffSchedule", element: <StaffSchedule />, sidebarProps: {} },
];
