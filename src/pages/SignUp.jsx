import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadInfo from "../components/HeadInfo";
import Google from "../assets/icons8-google.svg";
const SignUp = () => {
   const navigate = useNavigate();
   const [passValid, setPassValid] = useState(true);
   const [value, setValues] = useState({
      username: "",
      password: "",
      confirmPassword: "",
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
         <div className="wrap flex flex-col pt-28 items-center justify-center h-[28rem] w-[30rem] mx-auto gap-5 font-['Inter'] ">
            <div className="head"></div>
            <h2 className="text-black text-4xl font-bold font-['Inter']">
               Hospital check-in
            </h2>
            <span className="text-black text-opacity-80 text-2xl font-semibold font-['Inter']">
               Create an account to run wild through our curated experiences.
            </span>
            <button className="google w-4/5 rounded-[5px] border-4 border-black py-2 pl-3 font-bold flex flex-row item-center justify-center">
               <img src={Google} alt="" className="w-6 h-6 pr-1" />
               Continue with Google
            </button>
            <p className="text-[#5B5B5B]">or</p>
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
               <input
                  onChange={(e) => handleChange(e)}
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
               />
               <button
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="submit"
               >
                  Sign Up
               </button>
            </form>

            <p className="text-[#5B5B5B] font-['Inter'] tracking-[1.6px] text-base font-bold">
               You already have account?
               <span>
                  <a className=" underline text-black" href="login">
                     Log In
                  </a>
               </span>
            </p>
         </div>
      </>
   );
};

export default SignUp;
