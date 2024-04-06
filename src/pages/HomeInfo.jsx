import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Contact from "../components/Contact";

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
