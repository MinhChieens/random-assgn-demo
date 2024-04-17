import React, { useEffect, useState } from "react";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth, storage } from "../../constants/firebase";
import { toast, Bounce } from "react-toastify";
import { updateProfile } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { v4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import CardInfoUsers from "../../components/CardInfoUsers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spin from "../../assets/spin-svgrepo-com.svg";
const ListDoctors = () => {
  const [btnAddDoc, setBtnAddDoc] = useState(true);
  const [imagePath, setImagePath] = useState(null);
  const { currentUser } = useAuth();
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
  const notifyFail = () =>
    toast.error("Failed! Gmail can existed", {
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
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [value, setValues] = useState({
    FirstName: "",
    LastName: "",
    Activity: "",
    Gmail: "",
    PassWord: "",
    PhoneNumber: "",
    Birthday: "",
    Gender: "",
    PathImage: "",
  });
  const getListDoctors = async (listUid) => {
    //console.log(listUid);
    const promises = listUid.map(async (doctorUid) => {
      const refDoctor = doc(db, "doctors", doctorUid);
      const data = await getDoc(refDoctor);
      if (data.exists()) {
        console.log(data.data());
        return { value: data.data(), uid: doctorUid };
      }
      return null;
    });

    const doctorValues = await Promise.all(promises);
    // Filter out any null values returned from documents that don't exist
    const validDoctorValues = doctorValues.filter((value) => value !== null);
    //console.log(validDoctorValues);
    setListOfDoctors(validDoctorValues);
  };
  const getList = async () => {
    console.log(currentUser.uid);
    if (currentUser) {
      const docRef = doc(db, "admin", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        getListDoctors(docSnap.data().listOfDoctors);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    getList();
  }, [btnAddDoc]);
  const handleDelDoc = () => {
    getList();
  };
  const handleImageUpload = async () => {
    const imgRef = ref(storage, `images/${v4()}`);
    await uploadBytes(imgRef, imagePath);
    const downloadURL = await getDownloadURL(imgRef);
    console.log("File available at", downloadURL);
    return downloadURL;
    // setValues((preValue) => ({ ...preValue, PathImage: downloadURL }));
  };
  const setUpInfoUser = async (uid) => {
    console.log(value);
    try {
      setDoc(doc(db, "doctors", uid), {
        value: value,
        status: true,
      });
      console.log("Send data");
    } catch (err) {
      console.log(err);
    }
  };
  const addListDoctor = async (uid) => {
    const docRef = doc(db, "admin", currentUser.uid);
    console.log(docRef);
    await updateDoc(docRef, {
      listOfDoctors: arrayUnion(uid),
    });
    signOut(auth);
  };
  const SignInAgain = async (preGmail) => {
    await signInWithEmailAndPassword(auth, preGmail, "111111")
      .then((userCredential) => {
        //.....Sign Up
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    value.PathImage = await handleImageUpload();
    console.log(value);
    const preGmail = currentUser.email;
    console.log(currentUser.uid);
    console.log(currentUser);

    await createUserWithEmailAndPassword(auth, value.Gmail, value.PassWord)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: value.FirstName + " " + value.LastName,
          photoURL: value.PathImage,
        }).catch((error) => {
          console.log(error);
        });
        setUpInfoUser(userCredential.user.uid);

        addListDoctor(userCredential.user.uid);

        setTimeout(() => SignInAgain(preGmail), 900);
        notifySuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notifyFail();
      });

    console.log(currentUser);
    setLoading(false);
  };
  const handleReset = () => {
    const reset = {
      FirstName: "",
      LastName: "",
      Activity: "",
      Gmail: "",
      PassWord: "",
      PhoneNumber: "",
      Birthday: "",
      Gender: "",
      PathImage: "",
    };
    setValues(reset);
    setImagePath(null);
    console.log;
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={`w-full h-full  mx-auto`}>
        <div className=" bg-darkblue h-14 flex items-center justify-between px-10 font-[poppins] text-base">
          {btnAddDoc ? (
            <div className="flex items-center gap-4">
              <h3 className="text-2xl  font-bold text-white">Doctors</h3>
              <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
                {listOfDoctors.length} doctors available
              </p>
            </div>
          ) : (
            <h3 className="text-lg  font-bold">ADD DOCTOR</h3>
          )}
          <button
            onClick={() => setBtnAddDoc(!btnAddDoc)}
            className="h-10 w-40 rounded bg-lightblue font-bold text-darkblue/80 hover:text-darkblue"
          >
            {btnAddDoc ? (
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
                Add Doctor
              </span>
            ) : (
              <p>List Doctors</p>
            )}
          </button>
        </div>
        <div>
          {btnAddDoc ? (
            <div className="">
              <CardInfoUsers />
              <div className="list flex flex-col justify-center items-center gap-5 pt-3">
                {listOfDoctors &&
                  listOfDoctors.map((doctor, index) => {
                    // console.log(doctor);
                    return (
                      doctor &&
                      doctor.value && (
                        <CardInfoUsers
                          key={index}
                          typeUser={"admin"}
                          uid={doctor.uid}
                          handleDeleteUser={handleDelDoc}
                          props={doctor.value}
                        ></CardInfoUsers>
                      )
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="">
              <form
                onSubmit={(e) => handleSubmit(e)}
                onReset={handleReset}
                className="flex flex-col w-4/5 mx-auto my-4 text-base font-yeseva gap-4"
              >
                <ul className="w-full mx-auto  columns-2 gap-4 items-stretch *:py-2 *">
                  <li className="flex flex-col gap-1">
                    <label htmlFor="physicianName">First Name</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      required
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      type="text"
                      name="FirstName"
                      id="physicianName"
                      placeholder="First Name"
                    />
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="Gmail">Gmail</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      required
                      name="Gmail"
                      type="email"
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      placeholder="Enter your email"
                    />
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="physicianName">Password</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      type="text"
                      name="PassWord"
                      id="physicianName"
                      required
                      placeholder="Password"
                    />
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="activity">Activity Type</label>
                    <select
                      onChange={(e) => handleChange(e)}
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      type="text"
                      name="Activity"
                      id="activity"
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select an activity
                      </option>
                      <option value="examination">Medical examination</option>
                      <option value="consultation">Consultation</option>
                      <option value="treatment">Treatment</option>
                      <option value="therapy">Therapy</option>
                    </select>
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="patient">Last Name</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      type="text"
                      name="LastName"
                      id="patient"
                      placeholder="Name"
                      required
                    />
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="Phone Numer">Phone Number</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      type="tel"
                      name="PhoneNumber"
                      id="patient"
                      placeholder="Phone number"
                      required
                    />
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="Gender"> Gender</label>
                    <select
                      onChange={(e) => handleChange(e)}
                      name="Gender"
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </li>
                  <li className="flex flex-col gap-1">
                    <label htmlFor="">Select your birthday</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="Birthday"
                      type="date"
                      className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                      placeholder="Select your birthday"
                    />
                  </li>
                </ul>
                <hr className="w-full h-px my-2 bg-white/50" />
                <div className="flex flex-row justify-between">
                  <input
                    name="ImagePath"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageInput"
                    onChange={(e) => setImagePath(e.target.files[0])}
                  />
                  <label
                    htmlFor="imageInput"
                    className={`flex w-1/3 h-36 justify-center items-center ${
                      !imagePath
                        ? "border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                        : ""
                    }`}
                  >
                    {imagePath ? (
                      <img
                        src={URL.createObjectURL(imagePath)}
                        alt="Uploaded"
                        className="w-40 h-40 rounded-full"
                      />
                    ) : (
                      <span>Select Image Avatar </span>
                    )}
                  </label>
                  <div className="self-end flex gap-2 justify-center">
                    <button
                      type="reset"
                      className=" text-skyblue rounded-md border-gray-300 border-2 px-4 py-2"
                    >
                      Reset
                    </button>
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
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListDoctors;
