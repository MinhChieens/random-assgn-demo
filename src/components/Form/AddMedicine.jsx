import React, { useState } from "react";
import { Form } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../constants/firebase";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
const AddMedicine = () => {
  const [value, setValue] = useState({
    NameMedicine: "",
    Description: "",
    Via: "",
    AddActionPrinciple: "",
    PrincipleActive: "",
    Unit: "",
    Presentation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "medicines", value.NameMedicine);
    const docNap = await getDoc(docRef);
    if (!docNap.exists()) {
      await setDoc(doc(db, "medicines", value.NameMedicine), {
        value: value,
        quantity: 1,
      }).then(() => {
        console.log("Set data");
      });
    } else {
      await updateDoc(docRef, {
        quantity: increment(1),
      }).then(() => {
        console.log("Update Medicine");
      });
    }
    console.log(value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrap m-5 pl-4 font-[poppins]">
      <form className="grid grid-cols-6">
        <div className=" col-span-4 flex flex-col items-center gap-4">
          <div className="w-4/5">
            <h2 className=" font-[Montserrat] text-xl text-[#212121] italic">
              Name Medicine
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="NameMedicine"
              id="nameMedicine"
              required
              placeholder="ex: Dipiroma"
              className="h-12 pl-4 block w-full outline-none border-2 rounded-lg"
            />
          </div>
          <div className="w-4/5">
            <h2 className=" font-[Montserrat] text-xl text-[#212121] italic">
              Description
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="Description"
              required
              placeholder="Description Remedy"
              className="h-12 pl-4 block w-full outline-none border-2 rounded-lg"
            />
          </div>
          <div className="w-4/5 flex flex-row justify-between">
            <div className="flex flex-col ">
              <h2 className=" font-[Montserrat] text-xl text-[#212121] italic outline-none">
                Via de Administração
              </h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                className="h-12 pl-4 w-72 rounded-lg border-2 outline-none"
                name="Via"
              />
            </div>
            <div className="flex flex-col ">
              <h2 className=" font-[Montserrat] text-xl text-[#212121] italic">
                Forma de Apresentação
              </h2>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                required
                className="h-12 pl-4 w-72 rounded-lg border-2 outline-none"
                name="Presentation"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mt-5 w-4/5">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Add Action Principle"
              className="h-12 pl-4 w-60 rounded-lg border-2 outline-none"
              name="AddActionPrinciple"
            />
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Unit"
              className="h-12 pl-4 w-60 rounded-lg border-2 outline-none"
              name="Unit"
            />
            <button className="h-12 w-20 bg-[#FF2C53] text-white rounded-md">
              <FontAwesomeIcon icon={faPlus} size="xl"></FontAwesomeIcon>
            </button>
          </div>
          <div className="w-4/5">
            <h2 className=" font-[Montserrat] text-xl text-[#212121] italic">
              Description
            </h2>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Principle Active"
              name="PrincipleActive"
              className="w-full h-12 rounded-lg border-2 pl-4 outline-none"
            />
          </div>
          <div className="font-bold w-4/5 flex flex-row justify-between">
            <button className="h-12 w-32 rounded-lg border-2">Cancel</button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="h-12 w-32 bg-[#FF2C53] text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col-span-2 mx-auto">
          <img src="" alt="" className=" h-72 w-72" />
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
