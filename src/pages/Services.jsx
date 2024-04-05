import React from "react";
import CardService from "../components/CardService";

const Services = () => {
   return (
      <div className="flex flex-row flex-wrap gap-10">
         <CardService />
         <CardService />
         <CardService />
         <CardService />
         <CardService />
         <CardService />
      </div>
   );
};

export default Services;
