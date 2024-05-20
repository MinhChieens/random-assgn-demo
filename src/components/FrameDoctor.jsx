import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
// Import images individually
import image1 from "../assets/frame/image1.png";
import image2 from "../assets/frame/image2.jpg";
import image3 from "../assets/frame/image3.jpg"

const sampleImages = [image1, image2,image3];
const sampleName=["A","Stephen Strange","Frankenstein"]
const sampleMajor=["Surgery","Surgery","Surgery"]

const FrameDoctor = () => {
   const [currentFrame, setCurrentFrame] = useState(0);
 
   const handleNextFrame = () => {
     setCurrentFrame((prevFrame) => (prevFrame === sampleImages.length - 1 ? 0 : prevFrame + 1));
   };
 
   const handlePrevFrame = () => {
     setCurrentFrame((prevFrame) => (prevFrame === 0 ? sampleImages.length - 1 : prevFrame - 1));
   };
 
   const transitions = useTransition(currentFrame, {
     from: { opacity: 0, transform: "translate3d(100%,0,0)" },
     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
     leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
     config: { duration: 500 }
   });
 
   const prevFrameIndex = (currentFrame === 0) ? sampleImages.length - 1 : currentFrame - 1;
   const nextFrameIndex = (currentFrame === sampleImages.length - 1) ? 0 : currentFrame + 1;
 
   return (
    <div className="w-full flex flex-col items-center">
            <div className="ourDoctor mt-[7rem]">
              
            </div>
            <div className="relative w-full flex justify-center items-center ">
       <button
         onClick={handlePrevFrame}
         className="absolute left-0 p-2 bg-blue-500 text-white rounded opacity-50 hover:opacity-100"
         style={{ transform: 'translateY(-50%)', top: '50%' }}
       >
         Previous
       </button>
 
       {transitions((style, i) => (
         <animated.div style={style} key={i} className="absolute inset-0 flex justify-center items-center">
           {/* Previous Frame */}
           <div className="wrap flex flex-col w-50 shadow-lg rounded-lg" style={{ opacity: 0.5 }}>
             <img
               className="object-cover rounded-t w-50 h-40"
               src={sampleImages[prevFrameIndex]}
               alt="previous doctor"
             />
             <div className="infoDoctor flex flex-col justify-center items-center w-full p-6 bg-[#BFD2F8] font-worksans">
               <h4 className="doctor_name text-[#1F2B6C]">{sampleName[prevFrameIndex]}</h4>
               <p className="pt-1 factorial font-worksans font-[800] text-[#1F2B6C] tracking-[2.88px] text-lg">
                 {sampleMajor[prevFrameIndex]}
               </p>
             </div>
           </div>
           {/* Current Frame */}
           <div className="wrap flex flex-col w-60 shadow-lg rounded-lg">
             <img
               className="object-cover rounded-t w-60 h-60"
               src={sampleImages[currentFrame]}
               alt="current doctor"
             />
             <div className="infoDoctor flex flex-col justify-center items-center w-full p-6 bg-[#BFD2F8] font-worksans">
               <h4 className="doctor_name text-[#1F2B6C]">{sampleName[currentFrame]}</h4>
               <p className="pt-1 factorial font-worksans font-[800] text-[#1F2B6C] tracking-[2.88px] text-lg">
               {sampleMajor[currentFrame]}
               </p>
             </div>
             <a
               href="/profile"
               className="text-center hover:bg-[#1F2B4F] p-3 text-base rounded-b font-worksans text-[#BFD2F8] bg-[#1F2B6C]"
             >
               View Profile
             </a>
           </div>
           {/* Next Frame */}
           <div className="wrap flex flex-col w-50 shadow-lg rounded-lg" style={{ opacity: 0.5 }}>
             <img
               className="object-cover rounded-t w-50 h-40"
               src={sampleImages[nextFrameIndex]}
               alt="next doctor"
             />
             <div className="infoDoctor flex flex-col justify-center items-center w-full p-6 bg-[#BFD2F8] font-worksans">
               <h4 className="doctor_name text-[#1F2B6C]">{sampleName[nextFrameIndex]}</h4>
               <p className="pt-1 factorial font-worksans font-[800] text-[#1F2B6C] tracking-[2.88px] text-lg">
                 {sampleMajor[nextFrameIndex]}
               </p>
             </div>
           </div>
         </animated.div>
       ))}
 
       <button
         onClick={handleNextFrame}
         className="absolute right-0 p-2 bg-blue-500 text-white rounded opacity-50 hover:opacity-100"
         style={{ transform: 'translateY(-50%)', top: '50%' }}
       >
         Next
       </button>
       </div>
       <div className="ourDoctor mt-60">
              
            </div>
     </div>
   );
 };
 
 export default FrameDoctor;
 

