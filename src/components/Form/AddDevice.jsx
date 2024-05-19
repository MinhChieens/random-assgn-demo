import React from "react";
import { useState } from "react";
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
import { v3, v4 } from "uuid";
const AddDevice = () => {
  const [value, setValue] = useState({
    deviceName: "",
    serialNumber: "",
    manufacturer: "",
    manufactureDate: "",
    maintenanceInfo: "",
    warrantyInfo: "",
    technicalInfo: "",
    num: "1",
  });
  const [Loading, setLoading] = useState(false);
  //const [imagePath, setImagePath] = useState(null);
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
    const imgRef = ref(storage, `images/divices${v4()}`);
    await uploadBytes(imgRef, imagePath);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    const idDevice = v4();
    //value.PathImage = await handleImageUpload();
    await setDoc(doc(db, "devices", idDevice), {
      value: value,
      quantity: value.num,
    })
      .then(() => {
        console.log("Set data");
      })
      .catch((err) => {
        console.log(err);
      });

    await updateDoc(doc(db, "devices", "general"), {
      numOfDevice: increment(value.num),
      ArrayDevice: arrayUnion(idDevice),
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
    <form className="" onSubmit={(e) => handleSubmit(e)}>
      <div className="wrap grid grid-cols-2 gap-6 p-8 font-[poppins]">
        <div>
          <label
            htmlFor="deviceName"
            className="block text-sm font-medium text-gray-700"
          >
            Device Name:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="deviceName"
            name="deviceName"
            required
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="serialNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Serial Number:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="serialNumber"
            name="serialNumber"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="manufacturer"
            className="block text-sm font-[bold] text-gray-700"
          >
            Manufacturer:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="manufacturer"
            name="manufacturer"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="manufactureDate"
            className="block text-sm font-medium text-gray-700"
          >
            Manufacture Date:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="date"
            id="manufactureDate"
            name="manufactureDate"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="">
          <label
            htmlFor="technicalInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Technical Information:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="technicalInfo"
            name="technicalInfo"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>
        <div className="">
          <label
            htmlFor="userManual"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="userManual"
            name="num"
            value={value.num}
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>

        <div className="">
          <label
            htmlFor="maintenanceInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Maintenance status:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="maintenanceInfo"
            name="maintenanceInfo"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>

        <div className="">
          <label
            htmlFor="warrantyInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Warranty Expiry:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="warrantyInfo"
            name="warrantyInfo"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddDevice;
