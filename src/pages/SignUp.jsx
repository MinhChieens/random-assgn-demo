import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../constants/firebase";
import { auth } from "../constants/firebase";
import HeadInfo from "../components/HeadInfo";
import Google from "../assets/icons8-google.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
const SignUp = () => {
   const navigate = useNavigate();
   const reff = useRef();
   const [passValid, setPassValid] = useState(true);
   const { currentUser } = useAuth();
   const [value, setValues] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });

   useEffect(() => {
      if (!currentUser) return;
      const uid = currentUser.uid;
      const type = ["admin", "users", "doctors"];
      console.log(uid);
      type.map(async (type) => {
         const docRef = doc(db, type, uid);
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
            navigate(`/${type}`);
         }
      });
   }, []);
   const setUpInfoUser = (userCredential) => {
      try {
         setDoc(doc(db, "users", userCredential.user.uid), {
            name: "",
            state: "active",
            content: "",
         });
         console.log("Send data");
      } catch (err) {
         console.log(err);
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.table(value);

      if (value.password != value.confirmPassword) {
         setPassValid(false);
         reff.current.focus();
         return;
      }

      await createUserWithEmailAndPassword(auth, value.email, value.password)
         .then((userCredential) => {
            setUpInfoUser(userCredential);
            navigate("/about");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use")
               alert("Email already used");
         });

      console.log(currentUser);
   };

   const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUpInfoUser(result);
            navigate("/about");
            // IdP data available using getAdditionalUserInfo(result)
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
   };
   const handleChange = (e) => {
      setValues({ ...value, [e.target.name]: e.target.value });
      setPassValid(true);
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
            <button
               onClick={signInWithGoogle}
               className=" google w-4/5 rounded-[5px] border-4 border-black py-2 pl-3 font-bold flex flex-row item-center justify-center"
            >
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
                  type="email"
                  placeholder="Gmail"
                  name="email"
               />
               <input
                  onChange={(e) => handleChange(e)}
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                  type="password"
                  placeholder="Password"
                  name="password"
               />
               <input
                  ref={reff}
                  onChange={(e) => handleChange(e)}
                  className={
                     "w-4/5 rounded-[5px] border-4 pl-3 border-black py-2 font-bold" +
                     (!passValid && reff.current == document.activeElement
                        ? " border-red-700"
                        : "")
                  }
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
               />
               <button
                  className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold hover:bg-slate-300"
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
