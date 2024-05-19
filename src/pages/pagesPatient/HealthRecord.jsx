import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../constants/firebase";
import { getAuth } from "firebase/auth";

import AHealthRecord from "../../components/Form/AHealthRecord";

const HealthRecord = () => {
  const [id, setId] = useState(null);
  const [records, setRecords] = useState([]);
  const getRecords = async () => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) return;
    console.log(currentUser.uid);
    const docRef = collection(db, "healthRecords", currentUser.uid, "records");
    const docSnap = await getDocs(docRef);
    if (docSnap.empty) {
      console.log("No such document!");
      return;
    }
    const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    setRecords(data);
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <>
      {id === null ? (
        <>
          <div className="bg-darkblue h-14 flex justify-between items-center px-10 font-[poppins] text-base gap-4">
            <div className="flex gap-5 items-center">
              <h3 className="text-2xl  font-bold text-white">
                All Health Records
              </h3>
              <p className="text-darkblue text-base ml-3 px-[10px] py-1 bg-stone-200 rounded-full italic">
                {records.length} Totals
              </p>
            </div>
          </div>
          <div className="pt-2">
            <div className="w-[95%] mx-auto grid grid-cols-12 p-3 bg-gray-100 items-center justify-items-center justify-center font-[poppins] font-bold text-gray-500 ">
              <div className="col-span-1">Date</div>
              <div className="col-span-3">Diagnosis</div>
              <div className="col-span-6">Message</div>
              <div className="col-span-2">Action</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 pt-4">
              {records &&
                records.map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="w-[95%] mx-auto  h-14 grid grid-cols-12 p-1 border-2 items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white "
                    >
                      <div className="col-span-1">{p.date}</div>
                      <div className="col-span-3">{p.diagnosis}</div>
                      <div className="col-span-6">{p.message}</div>
                      <div className="col-span-2">
                        <button onClick={() => setId(p.id)} className="pr-5">
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              {/* <div className="w-[95%] mx-auto  h-14 grid grid-cols-12 p-1 border-2 items-center justify-items-center justify-center font-[poppins] font-bold hover:bg-darkblue hover:text-white ">
                        <div className="col-span-1">1</div>
                        <div className="col-span-5">Demo</div>
                        <div className="col-span-4">Date</div>
                        <div className="col-span-2">
                           <button onClick={() => setId(0)} className="pr-5">
                              <FontAwesomeIcon icon={faCircleInfo} />
                           </button>
                        </div>
                     </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-darkblue h-12 flex items-center justify-between px-10 font-[poppins] text-base">
            <div className="flex items-center gap-5">
              <h3
                onClick={() => setId(null)}
                className="text-2xl  font-bold text-white hover:bg-lightblue py-1 px-2 rounded-lg cursor-pointer"
              >
                <span>
                  <FontAwesomeIcon icon={faArrowCircleLeft} className="pr-3" />
                </span>{" "}
                Back
              </h3>
            </div>
          </div>
          <AHealthRecord userid={getAuth().currentUser.uid} id={id} />
        </>
      )}
    </>
  );
};

export default HealthRecord;
