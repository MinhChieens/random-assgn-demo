import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";
import { db } from "../constants/firebase";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

const CardInfoUsers = ({ typeUser, uid, handleDeleteUser, props, nav }) => {
  const { currentUser } = useAuth();
  const checkProfile = () => {
    nav(uid);
  };
  const checkDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! Enter password to continue",
      icon: "warning",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: (value) => {
        // Validate input if needed
        if (value != "111111") {
          console.log(value);
          Swal.showValidationMessage("Password is incorrect");
        }
        return value;
      },
      allowOutsideClick: () => !Swal.isLoading(),
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
    const docRef = doc(db, typeUser, currentUser.uid);

    if (typeUser === "admin") {
      await updateDoc(docRef, {
        listOfDoctors: arrayRemove(uid),
      });
    } else {
      await updateDoc(docRef, {
        ListOfPatients: arrayRemove(uid),
      });
    }
    await deleteDoc(doc(db, "doctors", uid));
    handleDeleteUser();
  };

  return (
    <>
      {props ? (
        <div className="wrap flex flex-row items-center h-13 w-[95%] bg-transparent border-2 pr-3 font-[poppins] font-bold hover:bg-darkblue hover:text-white">
          <div className="head flex flex-row w-1/5 items-center">
            <img
              src={props.value.PathImage}
              className="h-11 w-11 rounded-full"
              alt=""
            />
            <div className="info pl-3">
              <h3>{props.value.fullName}</h3>
              <p className=" text-[#B5B5C3]">{props.value.Specialist}</p>
            </div>
          </div>
          <p className="email w-[25%]">{props.value.Gmail}</p>
          <p className="phone w-1/5">{props.value.PhoneNumber}</p>
          <p className="dateAdd w-1/5">{props.value.Birthday}</p>
          <div className="status w-[15%]">
            {props.value.status == "true" ? (
              <p className=" w-16 h-6 bg-green-100 rounded text-green-500 text-center">
                Active
              </p>
            ) : (
              <p className=" w-16 h-6 bg-[#FFE2E5] rounded text-[#F64E60] text-center">
                Declined
              </p>
            )}
          </div>
          <button onClick={() => checkDelete()} className="pr-5">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <button onClick={() => checkProfile()} className="pr-5">
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </div>
      ) : (
        <div className="wrap flex flex-row items-center h-12 w-[95%] bg-[#FAFAFA] mx-auto  pr-3  font-[poppins] font-bold text-[#82828f]">
          <div className="head flex flex-row w-1/5">
            <div className="info pl-5">
              <h3>Name</h3>
              <p></p>
            </div>
          </div>
          <p className="email w-[25%]">Gmail</p>
          <p className="phone w-1/5">PhoneNumber</p>
          <p className="dateAdd w-1/5">Birthday</p>
          <p className="status w-[15%]">Status</p>
          <p className="details w-[7%]">Details</p>
        </div>
      )}
    </>
  );
};

export default CardInfoUsers;
