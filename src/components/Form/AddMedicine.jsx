import React, { useState } from "react";
import { Form } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db, storage } from "../../constants/firebase";
import { toast, Bounce } from "react-toastify";
import Spin from "../../assets/spin-svgrepo-com.svg";
import {
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const AddMedicine = () => {
  const [value, setValue] = useState({
    NameMedicine: "",
    Description: "",
    Via: "",
    AddActionPrinciple: "",
    PrincipleActive: "",
    Unit: "",
    Presentation: "",
    PathImage: "",
  });
  const [Loading, setLoading] = useState(false);
  const notifySuccess = () =>
    toast.success("Add Successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const handleImageUpload = async () => {
    const imgRef = ref(storage, `images/medicines${v4()}`);
    await uploadBytes(imgRef, imagePath);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };

  const [imagePath, setImagePath] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(value.NameMedicine);
    value.PathImage = await handleImageUpload();
    const docRef = doc(db, "medicines", value.NameMedicine);
    const docNap = await getDoc(docRef);
    if (!docNap.exists()) {
      await setDoc(doc(db, "medicines", value.NameMedicine), {
        value: value,
        quantity: value.Unit,
      })
        .then(() => {
          console.log("Set data");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await updateDoc(docRef, {
        quantity: increment(value.Unit),
      }).then(() => {
        console.log("Update Medicine");
      });
    }
    await updateDoc(doc(db, "medicines", "general"), {
      numOfMedicine: increment(value.Unit),
      ArrayMedicine: arrayUnion(value.NameMedicine),
    });
    console.log(value);
    setLoading(false);
    notifySuccess();
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrap m-5 font-[poppins]">
      <form className="grid grid-cols-6">
        <div className=" col-span-4 flex flex-col  items-center gap-4">
          <div className="w-4/5 ">
            <h2 className=" font-[Montserrat] text-[#212121] italic">
              Medicine Name
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="NameMedicine"
              id="nameMedicine"
              required
              placeholder="ex: Dipiroma"
              className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
            />
          </div>
          <div className="w-4/5">
            <h2 className=" font-[Montserrat]text-[#212121] italic">
              Description
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="Description"
              required
              placeholder="Description Remedy"
              className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
            />
          </div>
          <div className="flex flex-row justify-between w-4/5">
            <div className="w-[45%]">
              <h2 className=" font-[Montserrat] text-[#212121] italic">
                Via Administration{" "}
              </h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                placeholder="Via Administration"
                className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
                name="Via"
              />
            </div>
            <div className="w-[45%]">
              <h2 className=" font-[Montserrat] text-[#212121] italic">
                Form Presentation
              </h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                placeholder="Form Presentation"
                className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
                name="Presentation"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between w-4/5">
            <div className="w-[45%]">
              <h2 className=" font-[Montserrat] text-[#212121] italic">
                Add Action Principle
              </h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                placeholder="Add Action Principle"
                className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
                name="AddActionPrinciple"
              />
            </div>
            <div className="w-[45%]">
              <h2 className=" font-[Montserrat] text-[#212121] italic">Unit</h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                placeholder="Unit"
                className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
                name="Unit"
              />
            </div>
          </div>
          <div className="w-4/5">
            <h2 className=" font-[Montserrat]  text-[#212121] italic">
              Principle Active
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              required
              placeholder="Principle Active"
              name="PrincipleActive"
              className="pl-4 p-2 block w-full outline-none border-2 rounded-lg"
            />
          </div>
          <div className="w-4/5 flex flex-row justify-between">
            <button
              type="reset"
              className="h-12 w-32 rounded-lg border-2 text-skyblue hover:text-white hover:bg-skyblue"
            >
              Reset
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="h-12 w-32 bg-skyblue/80 hover:bg-skyblue text-white rounded-lg"
            >
              <div className="flex flex-row items-center justify-center gap-2">
                {Loading && (
                  <img
                    src={Spin}
                    className="h-6 w-6 motion-reduce:hidden animate-spin"
                    alt=""
                  />
                )}
                <p> Submit </p>
              </div>
            </button>
          </div>
        </div>
        <div className="col-span-2 mx-auto  ">
          <div className="Image mt-6">
            <input
              name="ImagePath"
              type="file"
              accept="image/*"
              className="hidden "
              required
              id="imageInput"
              onChange={(e) => setImagePath(e.target.files[0])}
            />
            <label
              htmlFor="imageInput"
              className={`flex w-72 h-72  justify-center items-center ${
                !imagePath
                  ? "border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                  : ""
              }`}
            >
              {imagePath ? (
                <img
                  src={URL.createObjectURL(imagePath)}
                  alt="Uploaded"
                  className="w-72 h-72 rounded-3xl border-2"
                />
              ) : (
                <span>Select Image Medicine </span>
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
