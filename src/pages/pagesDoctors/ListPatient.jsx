import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faEdit,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CardPatients from "../../components/CardPatients";
import Spin from "../../assets/spin-svgrepo-com.svg";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
import AHealthRecord from "../../components/Form/AHealthRecord";
import Swal from "sweetalert2";
const ListPatient = () => {
  const CrtUser = getAuth().currentUser;
  const [btnAdd, setBtnAdd] = useState(null);
  const [btnAddRecord, setAddRecord] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [listPatients, setListPatients] = useState(null);
  const checkDelete = (uid) => {
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
        handleDelete(uid);
      }
    });
  };
  const notifySuccess = () =>
    toast.success("Updated Successfully!", {
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
  const handleDelete = async (uid) => {
    await updateDoc(doc(db, "doctors", CrtUser.uid), {
      ListPatient: arrayRemove(uid),
    });
    getPatents();
  };
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
    age: "",
    diagnose: "",
    timeTreat: "",
    medicine: "",

    heartRate: "100",
    bloodGroup: "A",
    bloodPressure: "1/1",
  });
  // redirect to user profile
  const handleChange = (e) => {
    e.preventDefault();

    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleAddBtn = (healthInfo, uid) => {
    setValue(healthInfo);
    setBtnAdd(uid);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", btnAdd), {
      healthRecord: value,
    });
    notifySuccess();
    getListPatients();
  };
  const handleSetNull = () => {
    setBtnAdd(null);
    setAddRecord(null);
  };
  return (
    <>
      <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
        <div className="flex gap-5 items-center">
          <h3 className="text-2xl  font-bold text-white">My Patients</h3>
          <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
            {listPatients && listPatients.length} Patients
          </p>
          <p className="text-white font-bold">
            Date : {new Date().getDate()}/ {new Date().getMonth() + 1}/
            {new Date().getFullYear()}
          </p>
        </div>
        {(btnAdd != null || btnAddRecord != null) && (
          <button
            onClick={handleSetNull}
            className=" h-10 w-40 rounded bg-lightblue font-bold text-darkblue/80 hover:text-darkblue"
          >
            <p>Return</p>
          </button>
        )}
      </div>
      {!btnAdd && !btnAddRecord ? (
        <div className="pt-2">
          <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
            <div className="col-span-2 justify-self-start">Name</div>
            <div className="col-span-3">Diagnose</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-3">Medicine</div>
            <div className="col-span-2">Treatment Time</div>

            <div className="col-span-1">Details</div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            {listPatients &&
              listPatients.map((p) => {
                console.log(p);
                if (p.healthInfo)
                  return (
                    <div
                      key={p.healthInfo.name}
                      className="w-[95%] mx-auto grid grid-cols-12 p-3 border-2 hover: items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white "
                    >
                      <div className="col-span-2 justify-self-start">
                        {p.healthInfo.name}
                      </div>
                      <div className="col-span-3">{p.healthInfo.diagnose}</div>
                      <div className="col-span-1">{p.healthInfo.age}</div>
                      <div className="col-span-3">{p.healthInfo.medicine}</div>
                      <div className="col-span-2">{p.healthInfo.timeTreat}</div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleAddBtn(p.healthInfo, p.uid)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="ml-3"
                          onClick={() => setAddRecord(p.uid)}
                        >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </button>
                        <button
                          className="ml-3 hover:text-red-600"
                          onClick={() => checkDelete(p.uid)}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </div>
                    </div>
                  );
              })}
          </div>
        </div>
      ) : (
        <>
          {btnAdd ? (
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
                      type="number"
                      value={value.age}
                      name="age"
                    />
                  </li>
                  <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                    <label className="pl-2 font-bold border-t-2">
                      Diagnose
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                      name="diagnose"
                      value={value.diagnose}
                      type="text"
                    />
                  </li>
                  <li className="flex flex-col gap-1 h-20 pt-3 pl-3">
                    <label
                      className="pl-2 font-bold border-t-2"
                      htmlFor="gender"
                    >
                      Medicine
                    </label>
                    <input
                      value={value.medicine}
                      type="text"
                      onChange={(e) => handleChange(e)}
                      name="medicine"
                      className="block w-full h-10 px-4 py-2 border bg-transparent rounded-md shadow-sm outline-none opacity-80 "
                    ></input>
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
                    <label
                      className="pl-2 font-bold border-t-2"
                      htmlFor="address"
                    >
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
          ) : (
            <AHealthRecord userid={btnAddRecord} />
          )}
        </>
      )}
    </>
  );
};

export default ListPatient;
