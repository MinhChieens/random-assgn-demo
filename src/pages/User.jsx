import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { SidePatient } from "../constants/Sidebar";

import PageWraper from "../Layout/PageWraper";
const User = () => {
  return (
    <>
      <PageWraper items={SidePatient} />;
    </>
  );
};

export default User;
