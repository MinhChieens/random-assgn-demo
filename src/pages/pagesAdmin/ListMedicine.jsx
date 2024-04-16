import React, { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardMedicines from "../../components/CardMedicines";
import AddMedicine from "../../components/Form/AddMedicine";
import { db } from "../../constants/firebase";
import { getDoc, doc } from "firebase/firestore";

const ListMedicine = () => {
  const [addList, setAddList] = useState(false);
  const [filter, setFilter] = useState(false);
  const [listFilter, setListFilter] = useState([]);
  const [listOfMedicine, setListOfMedicine] = useState([]);
  const [numMedicine, setNumMedicine] = useState(0);
  const [valueFilter, setValueFilter] = useState(false);
  const handleFilter = () => {
    if (!listOfMedicine.length) return;
    const rel = listOfMedicine.filter((med) => {
      return med.uid === valueFilter;
    });
    console.log(rel);
    if (!rel.length) {
      setFilter(false);
      return;
    }
    setListFilter(rel);
    setFilter(true);
  };
  const handleDeleteMed = () => {
    getListMedicines();
  };
  const getListMedicine = async (listMedicine) => {
    const promises = listMedicine.map(async (id) => {
      const refDoctor = doc(db, "medicines", id);
      const data = await getDoc(refDoctor);
      if (data.exists()) {
        console.log(data.data());
        return { value: data.data(), uid: id };
      }
      return null;
    });

    const doctorValues = await Promise.all(promises);
    // Filter out any null values returned from documents that don't exist
    const values = doctorValues.filter((value) => value !== null);
    //console.log(validDoctorValues);
    setListOfMedicine(values);
  };

  const getListMedicines = async () => {
    const docRef = doc(db, "medicines", "general");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      getListMedicine(docSnap.data().ArrayMedicine);
      setNumMedicine(docSnap.data().numOfMedicine);
    }
  };
  useEffect(() => {
    getListMedicines();
  }, [addList]);
  return (
    <>
      <div className="w-full h-full bg-sky-50 mx-auto">
        <div className="bg-orange-100 h-14 flex items-center justify-between px-10 font-[montserrat] text-base">
          <div className=" w-60 flex items-center">
            <h3 className="text-2xl  font-bold">Medicines</h3>
            {!addList ? (
              <p className="text-[#B5B5C3] text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
                {numMedicine} Item
              </p>
            ) : (
              ""
            )}
          </div>

          {!addList ? (
            <div className="filter border-2 rounded-lg font-bold">
              <input
                onChange={(e) => setValueFilter(e.target.value)}
                type="text"
                placeholder="Enter Name or Empty to all"
                className=" w-80 h-9 focus:outline-none px-3 bg-transparent"
              />
              <button
                onClick={(e) => handleFilter(e)}
                className="h-9 w-24 border-l-2 hover:bg-slate-200"
              >
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="px-2" />
                </span>
                Filter
              </button>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => setAddList(!addList)}
            className="h-9 w-32 bg-[#FF2B54] mx-10 rounded-md text-white"
          >
            {!addList ? (
              <span>
                <FontAwesomeIcon icon={faPlus} className="px-1" />
                Add Medicine
              </span>
            ) : (
              "List Medicine"
            )}
          </button>
        </div>
        {!filter ? (
          <>
            {!addList ? (
              <>
                <CardMedicines />
                <div className="item flex flex-col gap-2 items-center">
                  {listOfMedicine &&
                    listOfMedicine.map((element, index) => {
                      return (
                        element &&
                        element.value && (
                          <CardMedicines
                            key={index}
                            uid={element.uid}
                            handleDeleteMed={handleDeleteMed}
                            props={element.value}
                          />
                        )
                      );
                    })}
                </div>
              </>
            ) : (
              <AddMedicine />
            )}
          </>
        ) : (
          <>
            {!addList ? (
              <>
                <CardMedicines />
                <div className="item flex flex-col gap-2 items-center">
                  {listFilter &&
                    listFilter.map((element, index) => {
                      return (
                        element &&
                        element.value && (
                          <CardMedicines
                            key={index}
                            uid={element.uid}
                            handleDeleteMed={handleDeleteMed}
                            props={element.value}
                          />
                        )
                      );
                    })}
                </div>
              </>
            ) : (
              <AddMedicine />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListMedicine;
