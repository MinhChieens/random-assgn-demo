import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { collection, doc, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const CardPatient = ({ props, uid, setUpload }) => {
  const tempInfor = props.healthRecord || props.information;
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
    await deleteDoc(doc(db, "users", uid));
    setUpload();
  };
  return (
    <div className="w-[95%] mx-auto h-14 grid grid-cols-12 p-2 border-2  justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white ">
      <div className="head flex flex-row w-full col-span-2 items-center">
        <img
          src={tempInfor.pathImage}
          className="h-10 w-10 rounded-full"
          alt=""
        />

        <h3 className="pl-3">{tempInfor.name}</h3>
      </div>
      <div className="col-span-2">{tempInfor.diagnose}</div>
      <div className="col-span-1">{tempInfor.age}</div>
      <div className="col-span-2">{tempInfor.gender}</div>
      <div className="col-span-2">{tempInfor.timeTreat}</div>
      <div className="col-span-2">{tempInfor.birthday}</div>
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

const ListPatientOfAdmin = () => {
  const [btnAdd, setBtnAdd] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [listPatients, setListPatients] = useState(null);

  const getPatents = async () => {
    const queryPatients = await getDocs(collection(db, "users"));
    let relList = [];
    queryPatients.forEach((doc) => {
      console.log(doc.id);
      relList = [...relList, { patient: doc.data(), uid: doc.id }];
    });
    const valuess = await Promise.all(relList);
    const validList = valuess.filter((v) => v !== null);
    console.log(relList);
    setListPatients(validList);
  };
  const setUpload = () => {
    getPatents();
  };
  useEffect(() => {
    getPatents();
  }, []);
  const [value, setValue] = useState({
    name: "HCMUT",
    age: "57",
    diagnose: "Deadline",
    timeTreat: "4 years",
    gender: "other",
    level: "2",
    heartRate: "-1",
    bloodGroup: "A",
    bloodPressure: "1/1",
  });
  // redirect to user profile
  const handleChange = (e) => {
    e.preventDefault();

    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <>
      <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
        <div className="flex gap-5 items-center">
          <h3 className="text-2xl  font-bold text-white">List Patients</h3>
          <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
            {listPatients && listPatients.length} Patients
          </p>
          <p className="text-white font-bold">
            Date : {new Date().getDate()}/ {new Date().getMonth()}/
            {new Date().getFullYear()}
          </p>
        </div>

        <button
          onClick={() => setBtnAdd(!btnAdd)}
          className=" h-10 w-40 rounded bg-lightblue font-bold text-darkblue/80 hover:text-darkblue"
        >
          {btnAdd ? (
            <span>
              <FontAwesomeIcon icon={faUserPlus} className="pr-2" />
              Edit Patient
            </span>
          ) : (
            <p>My Patients</p>
          )}
        </button>
      </div>
      {btnAdd ? (
        <div className="pt-2">
          <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
            <div className="col-span-2 justify-self-start">Name</div>
            <div className="col-span-2">Diagnose</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-2">Gender</div>
            <div className="col-span-2">Treatment Time</div>
            <div className="col-span-2">Start Date</div>
            <div className="col-span-1">Details</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            {listPatients &&
              listPatients.map((p) => {
                return (
                  <CardPatient
                    props={p.patient}
                    uid={p.uid}
                    setUpload={setUpload}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="info col-span-2 ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <ul className="bg-white columns-2 w-[90%] mx-auto gap-8 items-stretch *:py-3* mt-3 font-[poppins] border-2 rounded-2xl px-5 py-5">
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
                <label className="pl-2 font-bold border-t-2">Diagnose</label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  name="diagnose"
                  value={value.diagnose}
                  type="text"
                  placeholder="Diagnose"
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
                  Time treatment
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.timeTreat}
                  name="timeTreat"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="email">
                  Level
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.level}
                  name="level"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="address">
                  Heart rate
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.heartRate}
                  name="heartRate"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                  Blood pressure
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.bloodPressure}
                  name="bloodPressure"
                />
              </li>{" "}
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                  Blood group
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={value.bloodGroup}
                  name="bloodGroup"
                />
              </li>
              <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                <label className="pl-2 font-bold border-t-2" htmlFor="hi">
                  Blood group
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                  type="text"
                  value={"A"}
                  name="bloodGroup"
                />
              </li>
            </ul>
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

export default ListPatientOfAdmin;
