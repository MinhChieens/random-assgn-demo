import React, { useEffect, useState } from "react";
import Doctor from "../../assets/doctor.png";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../constants/firebase";
import { db } from "../../constants/firebase";
import { v4 } from "uuid";
const Infomation = () => {
  const [change, setChange] = useState(false);
  const [upImage, setUpImage] = useState(false);

  const [value, setValue] = useState({
    name: "",
    age: "20",
    birthday: "20/1/2020",
    gender: "",
    phone: "7834862",
    email: "",
    address: "HCMUT",
    hi: "None",
    pathImage: "",
  });

  useEffect(() => {
    const updateV = async () => {
      const currentUser = getAuth().currentUser;
      if (!currentUser) return;
      const valueDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (valueDoc.exists()) {
        console.log(valueDoc.data().information);
        setValue(valueDoc.data().information);
      }
    };
    updateV();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (!change) return;
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const setData = async () => {
    const currentUser = getAuth().currentUser;
    const pth = await setPathImage();
    if (pth) value.pathImage = pth;
    console.log(currentUser.uid);
    await updateDoc(doc(db, "users", currentUser.uid), {
      information: value,
    }).then(() => {
      console.log("Updated doc");
    });
  };
  const setPathImage = async () => {
    if (!upImage) return null;
    const imgRef = ref(storage, `images/patients/${v4()}`);
    await uploadBytes(imgRef, upImage);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };
  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Successfully!",
          icon: "success",
        });
      }

      setData();
    });
    setChange(!change);
  };
  return (
    <>
      <div className="wrap w-[95%] h-full mx-auto grid grid-cols-3">
        <div className="image flex flex-col items-center  gap-5 col-span-1">
          <input
            name="ImagePath"
            type="file"
            accept="image/*"
            className="hidden"
            id="imageInput"
            onChange={(e) => change && setUpImage(e.target.files[0])}
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
          <p>{value.name}</p>
        </div>
        <div className="info col-span-2">
          <ul className="columns-2 w-[90%] mx-auto gap-8 items-stretch *:py-3* mt-10 font-[poppins] border-2 rounded-2xl px-5 py-5">
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3 ">
              <label className="pl-2 font-bold" htmlFor="name">
                Full Name
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.name}
                name="name"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="age">
                Age
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.age}
                name="age"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="birthday">
                Day Of Birthday
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                name="birthday"
                value={value.birthday}
                type="date"
                placeholder="Select your birthday"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="gender">
                Gender
              </label>
              <select
                value={value.gender}
                onChange={(e) => handleChange(e)}
                name="gender"
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold " htmlFor="phone">
                Phone Number
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.phone}
                name="phone"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.email}
                name="email"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="address">
                Address
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.address}
                name="address"
              />
            </li>
            <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
              <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                Health Insurance
              </label>
              <input
                onChange={(e) => handleChange(e)}
                className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                type="text"
                value={value.hi}
                name="hi"
              />
            </li>
          </ul>

          {!change ? (
            <button
              onClick={() => setChange(!change)}
              className="ml-16 mt-4 h-12 w-24 rounded-lg bg-red-500 font-[poppins] font-bold"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => handleSubmit()}
              className="ml-16 mt-4 h-12 w-24 rounded-lg bg-red-500 font-[poppins] font-bold"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Infomation;
