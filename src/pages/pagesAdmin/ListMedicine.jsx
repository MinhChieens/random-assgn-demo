import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardMedicines from "../../components/CardMedicines";
import AddMedicine from "../../components/Form/AddMedicine";
const ListMedicine = () => {
  const [addList, setAddList] = useState(false);
  return (
    <>
      <div className="w-full h-full bg-sky-50 mx-auto">
        <div className="bg-orange-100 h-14 flex items-center justify-between px-10 font-[montserrat] text-base">
          <div className=" w-60 flex items-center">
            <h3 className="text-2xl  font-bold">Medicines</h3>
            <p className="text-[#B5B5C3] text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
              Number Item
            </p>
          </div>

          <div className="filter border-2 rounded-lg font-bold">
            <input
              type="text"
              placeholder="BusCar"
              className=" w-80 h-9 focus:outline-none px-3 bg-transparent"
            />
            <button className="h-9 w-24 border-l-2">
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="px-2" />
              </span>
              Filte
            </button>
          </div>
          <button
            onClick={() => setAddList(!addList)}
            className="h-9 w-32 bg-[#FF2B54] mx-10 rounded-md text-white"
          >
            <span>
              <FontAwesomeIcon icon={faPlus} className="px-1" />
            </span>
            Add Medicine
          </button>
        </div>

        {!addList ? (
          <div className="item flex flex-col gap-2 items-center">
            <CardMedicines />
            <CardMedicines />
            <CardMedicines />
            <CardMedicines />
            <CardMedicines />
            <CardMedicines />
          </div>
        ) : (
          <AddMedicine />
        )}
      </div>
    </>
  );
};

export default ListMedicine;
