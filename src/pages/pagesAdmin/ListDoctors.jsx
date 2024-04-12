import React, { useState } from "react";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { db, auth } from "../../constants/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
const ListDoctors = () => {
   const [btnAddDoc, setBtnAddDoc] = useState(false);
   const [imagePath, setImagePath] = useState(null);
   const { currentUser } = useAuth();
   const [value, setValues] = useState({
      FirstName: "",
      LastName: "",
      Activity: "",
      Gmail: "",
      PassWord: "",
      PhoneNumber: "",
      Birthday: "",
      Gender: "",
   });

   const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
         const imageData = reader.result;
         const imgExtension = file.name.split(".").pop().toLowerCase();
         const validExtensions = ["jpg", "jpeg", "png", "gif"];

         if (validExtensions.includes(imgExtension)) {
            const imageName = `${Date.now()}.${imgExtension}`;
            const imagePath = `src/assets/imageDoctors/${imageName}`;

            setImagePath(imagePath);

            // Lưu trữ hình ảnh trong thư mục assets
            saveImage(imagePath, imageData);
         } else {
            alert("Invalid file format. Please upload an image file.");
         }
      };

      reader.readAsDataURL(file);
   };
   const saveImage = (path, data) => {
      // Thực hiện lưu trữ hình ảnh vào thư mục assets của dự án
      // Trong ứng dụng thực tế, bạn có thể sử dụng một backend để lưu trữ hình ảnh
      // hoặc sử dụng các thư viện quản lý hình ảnh như Cloudinary, Firebase Storage, ...

      console.log("Image saved at:", path);
      console.log("Image data:", data);
   };
   const setUpInfoUser = (uid) => {
      try {
         setDoc(doc(db, "doctors", uid), {
            value,
         });
         console.log("Send data");
      } catch (err) {
         console.log(err);
      }
   };
   const addListDoctor = async (uid) => {
      console.log(currentUser.uid);
      const docRef = doc(db, "admin", currentUser.uid);
      await updateDoc(docRef, {
         listOfDoctors: arrayUnion(uid),
      });
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         console.log("Document data:", docSnap.data());
      } else {
         // docSnap.data() will be undefined in this case
         console.log("No such document!");
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(value);
      const mainUid = currentUser.uid;
      console.log(currentUser.uid);
      await createUserWithEmailAndPassword(auth, value.Gmail, value.PassWord)
         .then((userCredential) => {
            setUpInfoUser(userCredential.user.uid);
            addListDoctor(userCredential.user.uid);
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use")
               alert("Email already used");
         });
   };
   const handleReset = () => {
      const reset = {
         FirstName: "",
         LastName: "",
         Activity: "",
         Gmail: "",
         PassWord: "",
         PhoneNumber: "",
         Birthday: "",
         Gender: "",
      };
      setValues(reset);
   };
   const handleChange = (e) => {
      e.preventDefault();
      setValues({ ...value, [e.target.name]: e.target.value });
   };
   return (
      <>
         <div className={`w-11/12 h-5/6 bg-sky-300 mx-auto mt-5`}>
            <div className=" bg-orange-300 h-14 flex items-center justify-between px-10">
               {btnAddDoc ? <h3>List Of Doctor</h3> : <h3>ADD DOCTOR</h3>}
               <button
                  onClick={() => setBtnAddDoc(!btnAddDoc)}
                  className="h-10"
               >
                  Add Doctor
               </button>
            </div>
            <div>
               {btnAddDoc ? (
                  <div className="">LIST</div>
               ) : (
                  <div className="">
                     <form
                        onSubmit={(e) => handleSubmit(e)}
                        onReset={handleReset}
                        className="flex flex-col w-4/5 mx-auto my-4 text-base font-yeseva gap-4"
                     >
                        <ul className="w-full mx-auto  columns-2 gap-4 items-stretch *:py-2 *">
                           <li className="flex flex-col gap-1">
                              <label htmlFor="physicianName">First Name</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 type="text"
                                 name="FirstName"
                                 id="physicianName"
                                 required
                                 placeholder="First Name"
                              />
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="Gmail">Gmail</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 name="Gmail"
                                 type="email"
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 placeholder="Enter your email"
                              />
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="physicianName">Password</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 type="text"
                                 name="PassWord"
                                 id="physicianName"
                                 required
                                 placeholder="Password"
                              />
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="activity">Activity Type</label>
                              <select
                                 onChange={(e) => handleChange(e)}
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 type="text"
                                 name="Activity"
                                 id="activity"
                                 required
                              >
                                 <option value="" disabled selected hidden>
                                    Select an activity
                                 </option>
                                 <option value="examination">
                                    Medical examination
                                 </option>
                                 <option value="consultation">
                                    Consultation
                                 </option>
                                 <option value="treatment">Treatment</option>
                                 <option value="therapy">Therapy</option>
                              </select>
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="patient">Last Name</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 type="text"
                                 name="LastName"
                                 id="patient"
                                 placeholder="Name"
                                 required
                              />
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="Phone Numer">Phone Number</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 type="tel"
                                 name="PhoneNumber"
                                 id="patient"
                                 placeholder="Phone number"
                                 required
                              />
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="Gender"> Gender</label>
                              <select
                                 onChange={(e) => handleChange(e)}
                                 name="Gender"
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                              >
                                 <option value="male">Male</option>
                                 <option value="female">Female</option>
                                 <option value="other">Other</option>
                              </select>
                           </li>
                           <li className="flex flex-col gap-1">
                              <label htmlFor="">Select your birthday</label>
                              <input
                                 onChange={(e) => handleChange(e)}
                                 name="Birthday"
                                 type="date"
                                 className="block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-sky-300 focus:border-sky-300 opacity-80 "
                                 placeholder="Select your birthday"
                              />
                           </li>
                        </ul>
                        <hr className="w-full h-px my-2 bg-white/50" />
                        <div className="flex flex-row justify-between">
                           <input
                              name="ImagePath"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="imageInput"
                              onChange={handleImageUpload}
                           />
                           <label
                              htmlFor="imageInput"
                              className="block w-1/3 h-32 px-4 pt-12 border border-gray-300 rounded-md shadow-sm text-center cursor-pointer hover:bg-gray-100"
                           >
                              {imagePath ? (
                                 <img
                                    src={imagePath}
                                    alt="Uploaded"
                                    className="max-w-full max-h-full"
                                 />
                              ) : (
                                 <span>Select Image Avatar </span>
                              )}
                           </label>
                           <div className="self-end flex gap-2">
                              <button
                                 type="reset"
                                 className=" text-skyblue rounded-md border-gray-300 border-2 px-4 py-2"
                              >
                                 Reset
                              </button>
                              <button
                                 type="submit"
                                 className="bg-skyblue text-white rounded-md px-4 py-2"
                              >
                                 Submit
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default ListDoctors;
