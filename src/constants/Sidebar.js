import { icon } from "@fortawesome/fontawesome-svg-core";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faLock,
  faMessage,
  faPenSquare,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottleMedical } from "@fortawesome/free-solid-svg-icons";

import { faCapsules } from "@fortawesome/free-solid-svg-icons";
export const SidePatient = [
  {
    title: "DashBoard",
    path: "dashboard",
    icon: faHouseMedical,
  },
  {
    title: "Medical appointments",
    path: "appointment",
    icon: faPenSquare,
  },
  { title: "Health Records", path: "records", icon: faBookMedical },
  {
    title: "Test Result",
    path: "test",
    icon: faNotesMedical,
  },
  {
    title: "Information",
    path: "information",
    icon: faUsers,
  },
  {
    title: "More",
    path: "",
    icon: faAngleRight,
  },
  {
    title: "Messages",
    path: "messages",
    icon: faMessage,
  },
  {
    title: "Change password",
    path: "forgot",
    icon: faLock,
  },
];

export const SideAdmin = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: faHouseMedical,
  },
  {
    title: "Doctor List",
    path: "listDoctors",
    icon: faBookMedical,
  },
  {
    title: "All Patients",
    path: "allPatients",
    icon: faBookMedical,
  },
  {
    title: "Medical device",
    path: "devices",
    icon: faKitMedical,
  },
  {
    title: "Medicines",
    path: "medicines",
    icon: faCapsules,
  },
  { title: "Staff", path: "staff", icon: faUsers },
  { title: "Staff Schedule", path: "staffSchedule", icon: faCalendar },
  {
    title: "Messages",
    path: "messages",
    icon: faMessage,
  },
];

export const SideDoctor = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: faHouseMedical,
  },
  {
    title: "Doctors Profile",
    path: "profile",
    icon: faUserDoctor,
  },
  { title: "Patient List", path: "patientList", icon: faFileMedical },

  {
    title: "Appointments",
    path: "appointments",
    icon: faListAlt,
  },
  {
    title: "Messages",
    path: "messages",
    icon: faMessage,
  },
  {
    title: "Change password",
    path: "forgot",
    icon: faLock,
  },
];
