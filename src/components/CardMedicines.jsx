import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../constants/firebase";
import Swal from "sweetalert2";
const CardMedicines = ({ uid, handleDeleteMed, props }) => {
  const checkDelete = () => {
    Swal.fire({
      title: "Enter a Number you want delete?",
      text: "Empty to delete all",
      // icon: "warning",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: (value) => {
        // Validate input if needed
        if (isNaN(value) || value < 0) {
          Swal.showValidationMessage("Please enter a valid number");
        }
        return value;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const numberValue = result.value;
        if (!numberValue) handleDelete(-1);
        else {
          handleDelete(numberValue);
        }
        // Do something with the numerical input
        console.log("You entered:", numberValue);
      }
    });
  };

  const handleDelete = async (num) => {
    const docRef = doc(db, "medicines", "general");
    const refMed = doc(db, "medicines", uid);
    const numMed = await getDoc(refMed).then((med) => {
      return med.data().quantity;
    });
    if (num == -1 || num >= numMed) {
      await deleteDoc(doc(db, "medicines", uid));
      await updateDoc(docRef, {
        ArrayMedicine: arrayRemove(uid),
        numOfMedicine: increment(-numMed),
      });
    } else {
      console.log("You entered:", num, numMed);
      await updateDoc(refMed, {
        quantity: numMed - num,
      });
      await updateDoc(docRef, {
        numOfMedicine: increment(-num),
      });
    }
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
    handleDeleteMed();
  };
  return (
    <>
      {props ? (
        <div className="wrap flex flex-row items-center h-14 w-[95%] bg-transparent border-2 pr-3  font-[poppins] font-bold hover:bg-[#FF2B54] hover:text-white cursor-pointer px-5">
          <div className="head flex flex-row w-[30%] items-center">
            <img
              src={props.value.PathImage}
              className="h-10 w-10 rounded-full"
              alt=""
            />
            <div className="info pl-3">
              <h3>{props.value.NameMedicine}</h3>
              <p className=" text-[#B5B5C3]">{props.value.NameMedicine}</p>
            </div>
          </div>
          <p className=" w-[15%]">{props.quantity}</p>
          <p className=" w-1/5">{props.value.Presentation}</p>
          <p className=" w-1/5">{props.value.Via}</p>
          <p className="w-[20%]">{props.value.PrincipleActive}</p>
          <div className="flex items-center pr-5">
            <button onClick={() => checkDelete()} className="pr-5">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </div>
      ) : (
        <div className="wrap flex flex-row items-center h-12 w-[95%] bg-[#FAFAFA] mx-auto  pr-3  font-[poppins] font-bold text-[#82828f]">
          <div className="head flex flex-row w-1/5">
            <div className="info pl-5">
              <h3>Name</h3>
            </div>
          </div>
          <p className="email w-[25%]">Quantity</p>
          <p className="phone w-1/5">Type</p>
          <p className="dateAdd w-1/5">Via</p>
          <p className="status w-[15%]">Active Principle</p>
          <p className="status w-[10%]">More</p>
        </div>
      )}
    </>
  );
};

export default CardMedicines;
