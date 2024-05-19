import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardPatients from "../../components/CardPatients";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import AHealthRecord from "../../components/Form/AHealthRecord";
const ListPatient = () => {
  const [btnAdd, setBtnAdd] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [listPatients, setListPatients] = useState(null);

  const getPatents = async (list) => {
    const relList = list.map(async (pId) => {
      const docPatient = await getDoc(doc(db, "users", pId));
      if (docPatient.exists()) {
        console.log(docPatient.data().healthRecord);
        return { healthInfo: docPatient.data().healthRecord, uid: pId };
      }
      return null;
    });
    const valuess = await Promise.all(relList);
    const validList = valuess.filter((v) => v !== null);
    setListPatients(validList);
  };
  const getListPatients = async () => {
    const CrtUser = getAuth().currentUser;
    const listPatients = await getDoc(doc(db, "doctors", CrtUser.uid));
    if (listPatients.exists()) {
      console.log(listPatients.data().ListPatient);
      getPatents(listPatients.data().ListPatient);
    }
  };
  useEffect(() => {
    getListPatients();
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
          <h3 className="text-2xl  font-bold text-white">My Patients</h3>
          <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
            {1} Patients
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
            <div className="col-span-2">Level</div>
            <div className="col-span-1">Details</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            {listPatients &&
              listPatients.map((p) => {
                console.log(p);
                return <CardPatients props={p.healthInfo} uid={p.uid} />;
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

export default ListPatient;
