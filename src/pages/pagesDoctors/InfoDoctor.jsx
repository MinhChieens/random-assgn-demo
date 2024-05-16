import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../constants/firebase";
const InfoDoctor = ({ idDoctor }) => {
  const [value, setValue] = useState("");
  const getValueDoctor = async () => {
    let id = getAuth().currentUser.uid;
    if (idDoctor) id = idDoctor;
    console.log(id);
    const docValue = await getDoc(doc(db, "doctors", id));
    setValue(docValue.data().value);
  };
  useEffect(() => {
    getValueDoctor();
  }, []);

  return (
    <div className="w-[95%] mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4 font-[poppins]">
      <div className="flex flex-col md:flex-row p-10 justify-around">
        <div className=" flex items-center justify-center p-6">
          <img
            className="rounded-full w-48 h-48"
            src={value.PathImage}
            alt="Doctor Avatar"
          />
        </div>
        <div className="flex flex-col items-center justify-center pr-20">
          <h2 className="text-2xl font-bold mb-2">{value.fullName}</h2>
          <p className="text-gray-700 mb-4">Chuyên Khoa {value.Specialist}</p>
        </div>
      </div>
      <div className="p-6 flex flex-row justify-around">
        <div className="v">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Thông tin cá nhân</h3>
            <p>Ngày sinh: {value.Birthday}</p>
            <p>Giới tính: {value.Gender}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Thông tin liên lạc</h3>
            <p>Email: {value.Gmail}</p>
            <p>Số điện thoại: {value.PhoneNumber}</p>
            <p>Địa chỉ: Số nhà, Đường, TP</p>
          </div>
        </div>
        <div className="">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Thông tin chuyên môn</h3>
            <p>Bằng cấp: Bác sĩ Y khoa</p>
            <p>Trường đào tạo: Đại học Y</p>
            <p>Chứng chỉ: Chứng chỉ A, B, C</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Dịch vụ cung cấp</h3>
            <p>Khám tổng quát</p>
            <p>Tư vấn sức khỏe</p>
            <p>Điều trị bệnh Z</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDoctor;
