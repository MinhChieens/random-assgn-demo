import React from "react";
import { contact } from "../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faLocationDot,
   faClock,
   faPhone,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
   return (
      <section className="relative flex flex-col items-center justify-stretch">
         <p className="text-skyblue uppercase font-bold">Get in touch</p>
         <h3 className="text-darkblue font-bold font-yeseva text-2xl">
            Contact
         </h3>
         <div className="flex w-3/4 justify-stretch items-center gap-8 mt-8 mb-4">
            {contact.map((item) => (
               <div
                  key={item.id}
                  className="flex flex-col basis-1/4 grow-0 justify-center items-start mx-auto bg-lightblue rounded-md aspect-square gap-2"
               >
                  <FontAwesomeIcon
                     icon={item.icon}
                     className="text-darkblue px-4"
                     size="2x"
                  ></FontAwesomeIcon>
                  <p className="font-bold uppercase text-darkblue text-sm px-4">
                     {item.title}
                  </p>
                  <p className="text-sm text-darkblue px-4">
                     {item.main_entry}
                  </p>
                  <p className="text-sm  text-darkblue px-4">
                     {item.sub_entry}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Contact;
