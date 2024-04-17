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
    <form className="">
      <div className="wrap grid grid-cols-2 gap-6 p-8 font-[poppins]">
        <div>
          <label
            htmlFor="deviceName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên thiết bị:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="deviceName"
            name="deviceName"
            required
            className="mt-1 h-8 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="serialNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Số hiệu thiết bị:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="serialNumber"
            name="serialNumber"
            className="mt-1 h-8 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="manufacturer"
            className="block text-sm font-[bold] text-gray-700"
          >
            Nhà sản xuất:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="manufacturer"
            name="manufacturer"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="manufactureDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày sản xuất:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="date"
            id="manufactureDate"
            name="manufactureDate"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="">
          <label
            htmlFor="technicalInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin kỹ thuật:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="technicalInfo"
            name="technicalInfo"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>
        <div className="">
          <label
            htmlFor="userManual"
            className="block text-sm font-medium text-gray-700"
          >
            Số Lượng
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="userManual"
            name="num"
            value={value.num}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>

        <div className="">
          <label
            htmlFor="maintenanceInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin bảo trì và bảo dưỡng:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="maintenanceInfo"
            name="maintenanceInfo"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>

        <div className="">
          <label
            htmlFor="warrantyInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin bảo hành:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            id="warrantyInfo"
            name="warrantyInfo"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Thêm Thiết Bị
        </button>
      </div>
    </form>
  );
};

export default AddDevice;
