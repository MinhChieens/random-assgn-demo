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
const CardMedicines = ({ type, uid, handleDeleteMed, props }) => {
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
    const docRef = doc(db, type, "general");
    const refMed = doc(db, type, uid);
    const numMed = await getDoc(refMed).then((med) => {
      return med.data().quantity;
    });
    if (type == "devices") {
      if (num == -1 || num >= numMed) {
        await deleteDoc(doc(db, type, uid));
        await updateDoc(docRef, {
          ArrayDevice: arrayRemove(uid),
          numOfDevice: increment(-numMed),
        });
      } else {
        console.log("You entered:", num, numMed);
        await updateDoc(refMed, {
          quantity: numMed - num,
        });
        await updateDoc(docRef, {
          numOfDevice: increment(-num),
        });
      }
    } else {
      if (num == -1 || num >= numMed) {
        await deleteDoc(doc(db, type, uid));
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
        <div className="wrap grid grid-cols-12 items-center justify-items-center h-14 w-[95%] bg-transparent border-2 font-[poppins] font-bold hover:bg-darkblue rounded-md hover:text-white px-2">
          <div className="head flex flex-row items-center justify-self-start col-span-4 gap-2">
            <img
              src={props.value.PathImage}
              className="h-10 w-10 rounded-full"
              alt=""
            />
            <div className="info">
              <h3>{props.value.NameMedicine || props.value.deviceName}</h3>
              <p className=" text-[#B5B5C3]">{props.value.NameMedicine}</p>
            </div>
          </div>
          <p className="col-span-1 ">{props.quantity}</p>
          <p className="col-span-2">
            {props.value.Presentation || props.value.maintenanceInfo}
          </p>
          <p className="col-span-2 ">
            {props.value.Via || props.value.warrantyInfo}
          </p>
          <p className="col-span-2 ">
            {props.value.PrincipleActive || props.value.manufacturer}
          </p>
          <div className="col-span-1 flex items-center gap-3">
            <button onClick={() => checkDelete()} className="">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CardMedicines;
