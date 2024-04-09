import React from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";
import Hero from "../components/HomeComponents/Hero";
import Contact from "../components/HomeComponents/Contact";
import Appointment from "../components/HomeComponents/Appointment";

const HomeInfo = () => {
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
