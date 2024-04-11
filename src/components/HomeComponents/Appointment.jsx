import React from "react";
import { useState } from "react";
import Button from "../Button";

const Appointment = () => {
   const [value, setValues] = useState({
      name: "",
      gender: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      doctor: "",
      department: "",
      message: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      console.table(value);
   };

   const handleChange = (e) => {
      setValues({ ...value, [e.target.name]: e.target.value });
   };

   return (
      <div className="relative m-auto w-3/4 aspect-video grid grid-cols-2 auto-cols-max items-center justify-stretch gap-2">
         <div className="flex flex-col items-start justify-center">
            <h3 className="font-bold text-2xl text-skyblue">
               Book an Appointment
            </h3>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
               placerat scelerisque tortor ornare ornare. Convallis felis vitae
               tortor augue. Velit nascetur proin massa in. Consequat faucibus
               porttitor enim et.
            </p>
         </div>

         <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full bg-darkblue rounded-md px-3 py-3 gap-2 *:text-white/80 *:placeholder:text-white/80 *:bg-darkblue flex flex-col items-center">
               <div className="w-full grid grid-cols-2 auto-cols-max gap-2 items-center justify-start  *:text-white/80 *:placeholder:text-white/80 *:bg-darkblue">
                  <input
                     onChange={(e) => handleChange(e)}
                     type="text"
                     placeholder="Name"
                     name="name"
                  />
                  <select
                     onChange={(e) => handleChange(e)}
                     name="gender"
                     placeholder="Gender"
                  >
                     <option value="">Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                  </select>
                  <input
                     onChange={(e) => handleChange(e)}
                     type="email"
                     placeholder="Email"
                     name="email"
                  />
                  <input
                     onChange={(e) => handleChange(e)}
                     type="tel"
                     placeholder="Phone"
                     name="phone"
                  />
                  <input
                     onChange={(e) => handleChange(e)}
                     type="date"
                     placeholder="Date"
                     name="date"
                  />
                  <input
                     onChange={(e) => handleChange(e)}
                     type="time"
                     placeholder="Time"
                     name="time"
                  />
                  <input
                     onChange={(e) => handleChange(e)}
                     type="text"
                     placeholder="Doctor"
                     name="doctor"
                  />
                  <input
                     onChange={(e) => handleChange(e)}
                     type="text"
                     placeholder="Department"
                     name="Department"
                  />
               </div>
               <textarea
                  onChange={(e) => handleChange(e)}
                  className="w-full"
                  rows="5"
                  type="text"
                  placeholder="Message"
                  name="message"
               />
               <Button className="mt-4 m-auto hover:text-white" type="submit">
                  Submit
               </Button>
            </div>
         </form>
      </div>
   );
};

export default Appointment;
