import { icon } from "@fortawesome/fontawesome-svg-core";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faPenSquare, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
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
    title: "Physician Directory",
    path: "doctors",
    icon: faNotesMedical,
  },
  {
    title: "Prescription",
    path: "prescriptions",
    icon: faPrescriptionBottleMedical,
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
    title: "Medical device",
    path: "medicalDevice",
    icon: faKitMedical,
  },
];

export const SideDoctor = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: faHouseMedical,
  },
  {
    title: "Doctors Information",
    path: "profile",
    icon: faUserDoctor,
  },
  { title: "Patient List", path: "patientList", icon: faFileMedical },
  {
    title: "Patients Information",
    path: "patients/profile",
    icon: faNotesMedical,
  },
  {
    title: "Schedule",
    path: "schedule",
    icon: faPenSquare,
  },
  {
    title: "Patient Schedule",
    path: "patient/schedule",
    icon: faListAlt,
  },
];
