import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { db, auth } from "../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import HeadInfo from "../components/HeadInfo";
import { storage } from "../constants/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { toast, Bounce } from "react-toastify";
const SignUp = () => {
  const notifySuccess = () =>
    toast.success("Sign Up Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const navigate = useNavigate();
  const reff = useRef();
  const [passValid, setPassValid] = useState(true);
  const [upImage, setUpImage] = useState(false);
  const { currentUser, type } = useAuth();
  const [checkIn, setCheckIn] = useState(false);
  const [valueAccount, setValuesAccont] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [value, setValue] = useState({
    name: "",
    age: "",
    birthday: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    hi: "",
    pathImage: "",
  });
  useEffect(() => {
    if (!currentUser) return;
    console.log(currentUser);
    navigate(`/login`);
  }, []);
  const setUpInfoUser = (userCredential) => {
    try {
      setDoc(doc(db, "users", userCredential.user.uid), {
        information: value,
        healthRecord: {
          name: value.name,
          age: value.age,
          gender: value.gender,
        },
      });
      console.log("Send data");
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    setCheckIn(!checkIn);
    value.pathImage = await setPathImage();
    console.log(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    valueAccount.email = value.email;
    console.table(valueAccount);
    valueAccount.email = value.email;
    if (valueAccount.password != valueAccount.confirmPassword) {
      setPassValid(false);
      reff.current.focus();
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      valueAccount.email,
      valueAccount.password
    )
      .then((userCredential) => {
        setUpInfoUser(userCredential);
        navigate(`/users`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use")
          alert("Email already used");
      });
    notifySuccess();
    console.log(currentUser);
  };

  const setPathImage = async () => {
    if (!upImage) return;
    const imgRef = ref(storage, `images/patients/${v4()}`);
    await uploadBytes(imgRef, upImage);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };
  const handleChange = (e) => {
    setValuesAccont({ ...valueAccount, [e.target.name]: e.target.value });
    setPassValid(true);
  };
  const handleChangeInfo = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <HeadInfo />
      <div className="">
        {!checkIn ? (
          <div className="wrap w-[90%] h-full mx-auto mt-12  grid grid-cols-3">
            <div className="image flex flex-col items-center  gap-5 col-span-1">
              <input
                name="ImagePath"
                type="file"
                accept="image/*"
                className="hidden"
                id="imageInput"
                onChange={(e) => setUpImage(e.target.files[0])}
              />
              <label
                htmlFor="imageInput"
                className={`flex w-2/3 h-64 mt-16 justify-center items-center ${
                  !upImage
                    ? "border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                    : ""
                }`}
              >
                {upImage ? (
                  <img
                    src={URL.createObjectURL(upImage)}
                    alt="Uploaded"
                    className="w-60 h-60"
                  />
                ) : value.pathImage ? (
                  <img src={value.pathImage} className="w-60 h-60" alt="" />
                ) : (
                  <span>Select Image Avatar </span>
                )}
              </label>
              <p></p>
            </div>
            <form
              onSubmit={(e) => handleSubmitInfo(e)}
              className="info col-span-2"
            >
              <ul className="columns-2 w-[90%] mx-auto gap-8 items-stretch *:py-3* mt-10 font-[poppins] border-2 rounded-2xl px-5 py-5">
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3 ">
                  <label className="pl-2 font-bold" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="text"
                    value={value.name}
                    name="name"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label className="pl-2 font-bold border-t-2" htmlFor="age">
                    Age
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="number"
                    value={value.age}
                    name="age"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label
                    className="pl-2 font-bold border-t-2"
                    htmlFor="birthday"
                  >
                    Day Of Birthday
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    name="birthday"
                    value={value.birthday}
                    type="date"
                    placeholder="Select your birthday"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label className="pl-2 font-bold border-t-2" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    value={value.gender}
                    onChange={(e) => handleChangeInfo(e)}
                    name="gender"
                    required
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  >
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label className="pl-2 font-bold " htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="number"
                    value={value.phone}
                    name="phone"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label className="pl-2 font-bold border-t-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="email"
                    value={value.email}
                    name="email"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label
                    className="pl-2 font-bold border-t-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="text"
                    value={value.address}
                    name="address"
                    required
                  />
                </li>
                <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                  <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                    Health Insurance
                  </label>
                  <input
                    onChange={(e) => handleChangeInfo(e)}
                    className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    type="text"
                    value={value.hi}
                    name="hi"
                    required
                  />
                </li>
              </ul>

              <button
                type="submit"
                className="ml-16 mt-4 h-12 w-24 rounded-lg bg-red-500 font-[poppins] font-bold"
              >
                Continue
              </button>
            </form>
          </div>
        ) : (
          <div className="wrap flex flex-col pt-28 items-center justify-center h-[28rem] w-[30rem] mx-auto gap-5 font-['Inter'] ">
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
                className="w-4/5 rounded-[5px] border-4 border-black pl-3 py-2 font-bold"
                type="email"
                placeholder="Gmail"
                name="email"
                value={value.email}
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
        )}
      </div>
    </>
  );
};

export default SignUp;
