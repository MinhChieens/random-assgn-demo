import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteDoc } from "firebase/firestore";
import { storage } from "../../constants/firebase";
import { v4 } from "uuid";
import { db } from "../../constants/firebase";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast, Bounce } from "react-toastify";
const Card = ({ props, uid, setUpload }) => {
  const tempInfor = props && props.information;
  console.log(tempInfor);
  const checkProfile = () => {
    // redirect to user profile
  };
  const checkDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        handleDelete();
      }
    });
  };
  const handleDelete = async () => {
    // const docRef = doc(db, typeUser, currentUser.uid);
    await deleteDoc(doc(db, "staff", uid));
    setUpload();
  };
  return (
    <div className="w-[95%] mx-auto  h-14 grid grid-cols-12 p-1 border-2 items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white ">
      <div className="head flex flex-row w-full col-span-2 items-center">
        <img
          src={tempInfor.pathImage}
          className="h-11 w-11 rounded-full"
          alt=""
        />

        <div className="info pl-3">
          <h3>{tempInfor.name}</h3>
          <p className=" text-[#B5B5C3]">{tempInfor.position}</p>
        </div>
      </div>
      <div className="col-span-2">{tempInfor.qualification}</div>
      <div className="col-span-1">{tempInfor.age}</div>
      <div className="col-span-2">{tempInfor.gender}</div>
      <div className="col-span-2">{tempInfor.phoneNumber}</div>
      <div className="col-span-2">{tempInfor.dateStart}</div>
      <div className="col-span-1">
        <button
          onClick={() => checkDelete()}
          className="pr-5 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <button onClick={() => checkProfile()} className="pr-5">
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
      </div>
    </div>
  );
};

const Staff = () => {
  const [btnAdd, setBtnAdd] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [listStaff, setListStaff] = useState(null);

  const getStaff = async () => {
    const queryStaff = await getDocs(collection(db, "staff"));
    let relList = [];
    queryStaff.forEach((doc) => {
      console.log(doc.id);
      relList = [...relList, { patient: doc.data(), uid: doc.id }];
    });
    const valuess = await Promise.all(relList);
    const validList = valuess.filter((v) => v !== null);
    console.log(relList);
    setListStaff(validList);
  };
  const setUpload = () => {
    getStaff();
  };
  useEffect(() => {
    getStaff();
  }, []);
  const [value, setValue] = useState({
    name: "Hoang Van A",
    age: "20",
    position: "Nurse",
    qualification: "bacholar",
    pathQualification: "",
    gender: "other",
    phoneNumber: "3873874923",
    address: "",
    dateStart: "",
    pathImage: "",
  });
  // redirect to user profile
  const [upImage, setUpImage] = useState(false);
  const [upImageQuali, setUpImageQuali] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();

    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const alertImage = () => {
    toast.error("Please up all image!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const alertSuccess = () => {
    toast.success("Add Successfull!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const setPathImage = async (inImage) => {
    if (!inImage) return;
    const imgRef = ref(storage, `images/staff/${v4()}`);
    await uploadBytes(imgRef, inImage);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!upImage || !upImageQuali) alertImage();
    setLoading(true);
    value.pathImage = await setPathImage(upImage);
    value.pathQualification = await setPathImage(upImageQuali);
    console.log(value);

    await addDoc(collection(db, "staff"), {
      information: value,
    });
    setLoading(false);
    alertSuccess();
  };
  return (
    <>
      <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
        <div className="flex gap-5 items-center">
          <h3 className="text-2xl  font-bold text-white">All Staff</h3>
          <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
            {listStaff && listStaff.length} Totals
          </p>
        </div>

        <button
          onClick={() => setBtnAdd(!btnAdd)}
          className=" h-10 w-40 rounded bg-lightblue font-bold text-darkblue/80 hover:text-darkblue"
        >
          {btnAdd ? (
            <span>
              <FontAwesomeIcon icon={faUserPlus} className="pr-2" />
              Add Staff
            </span>
          ) : (
            <p>Back </p>
          )}
        </button>
      </div>
      {btnAdd ? (
        <div className="pt-2">
          <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
            <div className="col-span-2 justify-self-start">Name</div>
            <div className="col-span-2">Qualifications</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-2">Gender</div>
            <div className="col-span-2">Phone number</div>
            <div className="col-span-2">Start Date</div>
            <div className="col-span-1">Details</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            {listStaff &&
              listStaff.map((p) => {
                return (
                  <Card props={p.patient} uid={p.uid} setUpload={setUpload} />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="info col-span-2 ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <ul className="bg-white columns-2 w-[90%] mx-auto gap-8 items-stretch *:py-3* mt-3 font-[poppins] border-2 shadow-md px-5 py-5">
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
                  required
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="age">
                  Age
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="number"
                  value={value.age}
                  name="age"
                  required
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2">
                  Qualification
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  name="qualification"
                  value={value.qualification}
                  type="text"
                  placeholder="Bachelor"
                  required
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
                  required
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
                  required
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.phoneNumber}
                  name="phoneNumber"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="email">
                  Address
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.address}
                  name="address"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="address">
                  Position
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.position}
                  name="position"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                  Date Start
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="date"
                  value={value.dateStart}
                  name="dateStart"
                />
              </li>
            </ul>
            <div className="flex flex-row justify-around font-[poppins]">
              <div className="image flex flex-col items-center gap-5 col-span-1">
                <input
                  name="pathImageQualification"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="qualification"
                  onChange={(e) => setUpImageQuali(e.target.files[0])}
                />
                <label
                  htmlFor="qualification"
                  className={`flex w-32 h-32 mt-8 justify-center items-center ${
                    !upImageQuali
                      ? "border border-gray-300  shadow-sm cursor-pointer hover:bg-gray-100"
                      : ""
                  }`}
                >
                  {upImageQuali ? (
                    <img
                      src={URL.createObjectURL(upImageQuali)}
                      alt="Uploaded"
                      className="w-32 h-32"
                    />
                  ) : value.pathQualification ? (
                    <img
                      src={value.pathQualification}
                      className="w-32 h-32"
                      alt=""
                    />
                  ) : (
                    <p>Select Image Qualification </p>
                  )}
                </label>
              </div>
              <div className="image flex flex-col items-center  gap-5 col-span-1 ">
                <input
                  name="pathImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="imageInput"
                  onChange={(e) => setUpImage(e.target.files[0])}
                />
                <label
                  htmlFor="imageInput"
                  className={`flex w-32 h-32 mt-8 justify-center items-center ${
                    !upImage
                      ? "border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50"
                      : ""
                  }`}
                >
                  {upImage ? (
                    <img
                      src={URL.createObjectURL(upImage)}
                      alt="Uploaded"
                      className="w-32 h-32 "
                    />
                  ) : value.pathImage ? (
                    <img src={value.pathImage} className="w-32 h-32" alt="" />
                  ) : (
                    <p>Select Image Avatar </p>
                  )}
                </label>
              </div>
            </div>
            <div className="self-end flex justify-center pt-5">
              <button
                type="submit"
                className="bg-skyblue flex flex-row text-white rounded-md px-4 py-2"
              >
                {Loading && (
                  <img
                    src={Spin}
                    className="h-6 w-6 motion-reduce:hidden animate-spin"
                    alt=""
                  />
                )}
                <p className=""> Submit</p>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Staff;
