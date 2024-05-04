import React, { useState } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";
import Hero from "../components/HomeComponents/Hero";
import Contact from "../components/HomeComponents/Contact";
import Appointment from "../components/HomeComponents/Appointment";

const HomeInfo = () => {
  const [pick, setPick] = useState(false);
  const handlePick = () => {
    setPick(true);
  };
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>

      <Contact></Contact>
      <Footer></Footer>
    </>
  );
};

export default HomeInfo;
