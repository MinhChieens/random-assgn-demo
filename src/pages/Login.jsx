import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../constants/firebase";
import HeadInfo from "../components/HeadInfo";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn, loading, type } = useAuth();
  const focusRef = useRef([]);
  const [logInSuccess, setLogInSuccess] = useState(true);
  const [value, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) return;
    routeUserLogin(currentUser);
  }, []);

  const routeUserLogin = (user) => {
    if (!user) return;
    const uid = user.uid;
    const types = ["admin", "users", "doctors"];
    console.log(uid);
    types.map(async (tp) => {
      const docRef = doc(db, tp, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate(`/${tp}`);
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(value);

    await signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        //.....Sign Up
        const user = userCredential.user;
        routeUserLogin(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setLogInSuccess(false);
        if (errorCode == "auth/invalid-email") {
          focusRef.current[0].focus();
        } else {
          focusRef.current[1].focus();
        }
      });
  };

  const handleChange = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
    setLogInSuccess(true);
  };
  return (
    <>
      <HeadInfo />
      <div className="wrap flex flex-col pt-24 items-center justify-center h-[28rem] w-[30rem] mx-auto gap-5 font-['Inter']">
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
            ref={(el) => (focusRef.current[0] = el)}
            onChange={(e) => handleChange(e)}
            className={
              "w-4/5 rounded-[5px] border-4 pl-3 border-black py-2 font-bold" +
              (!logInSuccess && focusRef.current[0] == document.activeElement
                ? " border-red-700"
                : "")
            }
            type="email"
            placeholder="Gmail"
            name="email"
          />
          <input
            ref={(el) => (focusRef.current[1] = el)}
            onChange={(e) => handleChange(e)}
            className={
              "w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold" +
              (!logInSuccess && focusRef.current[1] == document.activeElement
                ? " border-red-700"
                : "")
            }
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold hover:bg-slate-300"
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
