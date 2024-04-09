import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

import {
   faCalendar,
   faUser,
   faMoneyBill1,
   faHeart,
} from "@fortawesome/free-regular-svg-icons";

const HeroButton = ({ children, className }) => {
   return (
      <div
         className={`group flex flex-col justify-center items-center gap-3 bg-white text-black hover:bg-darkblue hover:text-white py-3 px-6 rounded-sm ${className || ""}`}
      >
         <FontAwesomeIcon
            icon={faHeart}
            className="text-skyblue group-hover:text-lightblue"
            size="2x"
         />
         <p className="text-nowrap">{children}</p>
      </div>
   );
};

const Hero = () => {
   return (
      <>
         <section className="relative min-w-full aspect-[1125/512] bg-[url('../src/assets/bg-doctor.png')] bg-no-repeat bg-cover flex flex-col justify-center">
            <div className="px-36">
               <p className="text-skyblue uppercase font-bold my-2">
                  Caring for life
               </p>
               <h1 className="text-darkblue font-bold  text-5xl my-2 font-yeseva">
                  Leading the Way <br /> in Medical Excellence
               </h1>
               <Button
                  className="bg-lightblue rounded-full font-bold font-sm px-4 py-2 my-2"
                  href="services"
               >
                  Our Services
               </Button>
            </div>
         </section>

         <div className="welcome relative flex flex-col justify-center items-center">
            <div className="appointment relative top-[-3rem] flex flex-row justify-center items-center gap-12">
               <Button
                  href="appointment"
                  className="book w-[20rem] rounded h-[6rem] bg-[#1F2B6C] flex items-center justify-around text-white/80 hover:text-white"
               >
                  <p>Book an Appointment</p>
                  <FontAwesomeIcon icon={faCalendar} size="2x" />
               </Button>
               <Button
                  href="appointment"
                  className="book w-[20rem] rounded h-[6rem] bg-[#BFD2F8] flex items-center justify-around text-darkblue/80 hover:text-darkblue"
               >
                  <p>Book an Appointment</p>
                  <FontAwesomeIcon icon={faUser} size="2x" />
               </Button>
               <Button
                  href="appointment"
                  className="book w-[20rem] rounded h-[6rem] bg-[#159EEC] flex items-center justify-around text-white/80 hover:text-white"
               >
                  <p>Book an Appointment</p>
                  <FontAwesomeIcon icon={faMoneyBill1} size="2x" />
               </Button>
            </div>
            <div className="content w-[40rem] flex flex-col justify-center items-center ">
               <h4 className="  font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
                  Welcome To Meddical
               </h4>
               <h3 className="text-center text-blue-950 text-[32px]  font-bold font-yeseva">
                  A Great Place to Receive Care
               </h3>
               <p className="text-center line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque placerat scelerisque tortor ornare ornare. Convallis
                  felis vitae tortor augue. Velit nascetur proin massa in.
                  Consequat faucibus porttitor enim et.
               </p>
               <a
                  href=""
                  className="text-sky-500 text-base font-normal font-['Work Sans'] leading-snug p-8"
               >
                  Learn More
               </a>
            </div>
            <img
               src="https://via.placeholder.com/992x250"
               alt="image"
               className=""
            />
         </div>
         <section className="w-3/4 mx-auto flex flex-col items-center justify-stretch my-16 gap-4">
            <div className="">
               <h4 className="  font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
                  Care you can believe in
               </h4>
               <h3 className="text-center text-blue-950 text-[32px]  font-bold font-yeseva">
                  Our Services
               </h3>
            </div>
            <div className="flex gap-4">
               <div className="flex flex-col border-darkblue border-2 rounded-sm">
                  <HeroButton>Free Checkup</HeroButton>
                  <HeroButton>Cardiogram</HeroButton>
                  <HeroButton>Dna Testing</HeroButton>
                  <HeroButton>Blood Bank</HeroButton>
               </div>
               <article className="flex flex-col gap-3 my-6">
                  <h5 className="text-xl font-bold">
                     A passion for putting patients first.
                  </h5>
                  <ul className="grid grid-cols-2 list-inside list-disc">
                     <li>A Passion for Healing</li>
                     <li>All our best</li>
                     <li>A Legacy of Excellence</li>
                     <li>5-Star Care</li>
                     <li>Believe in Us</li>
                     <li>Always Caring</li>
                  </ul>
                  <p className="text-sm">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Quisque placerat scelerisque tortor ornare ornare. Quisque
                     placerat scelerisque tortor ornare ornare Convallis felis
                     vitae tortor augue. Velit nascetur proin massa in.
                     Consequat faucibus porttitor enim et.
                  </p>
                  <p className="text-sm">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Quisque placerat scelerisque. Convallis felis vitae tortor
                     augue. Velit nascetur proin massa in.
                  </p>
               </article>
               <div className="flex flex-col gap-2">
                  <img src="./assets/doctor.png" width="480" height="480" />
                  <img src=".../assets/doctor.png" width="480" height="480" />
               </div>
            </div>
         </section>

         <section className="w-3/4 mx-auto flex flex-col items-stretch justify-center gap-4">
            <div>
               <h4 className="font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
                  Always caring
               </h4>
               <h3 className="text-center text-blue-950 text-[32px]  font-bold font-yeseva">
                  Our Specialties
               </h3>
            </div>
            <div className="grid grid-cols-4 gap-1 *:py-8">
               <HeroButton>Neurology</HeroButton>
               <HeroButton>Bones</HeroButton>
               <HeroButton>Oncology</HeroButton>
               <HeroButton>Otorhinolaryngology</HeroButton>
               <HeroButton>Ophthalmology</HeroButton>
               <HeroButton>Cardiovascular</HeroButton>
               <HeroButton>Pulmonology</HeroButton>
               <HeroButton>Renal Medicine</HeroButton>
               <HeroButton>Gastroenterology</HeroButton>
               <HeroButton>Urology</HeroButton>
               <HeroButton>Dermatology</HeroButton>
               <HeroButton>Gynaecology</HeroButton>
            </div>
         </section>
      </>
   );
};

export default Hero;
