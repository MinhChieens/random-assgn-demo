import Button from "../components/Button";

const Hero = () => {
   return (
      <>
         <section className="relative min-w-full aspect-[1125/512] bg-[url('../src/assets/bg-doctor.png')] bg-no-repeat bg-cover flex flex-col justify-center">
            <div className="px-36">
               <h3 className="text-skyblue uppercase font-bold  my-2">
                  Caring for life
               </h3>
               <h1 className="text-darkblue font-bold  text-5xl my-2">
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
               <div className="book w-[20rem] rounded h-[6rem] bg-[#1F2B6C] flex items-center justify-center text-white">
                  <p>Book an Appointment</p>
               </div>
               <div className="book w-[20rem] rounded h-[6rem] bg-[#BFD2F8] flex items-center justify-center text-darkblue">
                  <p>Book an Appointment</p>
               </div>
               <div className="book w-[20rem] rounded h-[6rem] bg-[#159EEC] flex items-center justify-center text-white">
                  <p>Book an Appointment</p>
               </div>
            </div>
            <div className="content w-[40rem] flex flex-col justify-center items-center ">
               <h4 className="  font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
                  Welcome To Meddical
               </h4>
               <h3 className="text-center text-blue-950 text-[32px]  font-bold font-['Yeseva One']">
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
      </>
   );
};

export default Hero;
