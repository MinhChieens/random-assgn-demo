import Footer from "../components/Footer";
import HeadInfo from "../components/HeadInfo";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
   const navigate = useNavigate();
   const [passValid, setPassValid] = useState(true);
   const [value, setValues] = useState({
      username: "",
      password: "",
   });
   const handleSubmit = (e) => {
      e.preventDefault();
      console.table(value);
   };

   const handleChange = (e) => {
      setValues({ ...value, [e.target.name]: e.target.value });
   };
   return (
      <>
         <HeadInfo />
         <div className="wrap flex flex-col pt-24 items-center justify-center h-[28rem] w-[30rem] mx-auto gap-5 font-['Inter'] ">
            <div className="head"></div>
            <h2 className="text-black text-4xl font-bold font-['Inter']">
               Hospital check-in
            </h2>
            <span className="text-black text-opacity-80 text-2xl font-semibold font-['Inter']">
               Create an account to run wild through our curated experiences.
            </span>
            <form
               onSubmit={(e) => handleSubmit(e)}
               className="flex flex-col justify-center items-center w-full gap-5"
            >
               <input
                  onChange={(e) => handleChange(e)}
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="text"
                  placeholder="Username"
                  name="username"
               />
               <input
                  onChange={(e) => handleChange(e)}
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="password"
                  placeholder="Password"
                  name="password"
               />
               <button
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="submit"
               >
                  Log In
               </button>
            </form>

            <a className="underline" href="forgotPassword">
               Forgot Password
            </a>
            <p className="text-[#5B5B5B] font-['Inter'] tracking-[1.6px] text-base font-bold">
               You do not have account yet?
               <span>
                  <a className=" underline text-black" href="signup">
                     Sign In
                  </a>
               </span>
            </p>
         </div>
      </>
   );
};

export default Login;
