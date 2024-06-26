import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Appointment from "./Appointment";
import FrameDoctor from "../FrameDoctor";
import {
  faCalendar,
  faUser,
  faMoneyBill1,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faSyringe,
  faTablet,
  faTablets,
} from "@fortawesome/free-solid-svg-icons";

const HeroButton = ({ children, className }) => {
  return (
    <div
      className={`group flex flex-col justify-center items-center gap-3 bg-white text-black hover:bg-darkblue hover:text-white py-3 px-6 rounded-sm border-slate-100 border-2  ${className || ""}`}
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
            href="login"
            className="book w-[20rem] rounded h-[6rem] bg-[#1F2B6C] flex items-center justify-around text-white/80 hover:text-white"
          >
            <p>Book an Appointment</p>
            <FontAwesomeIcon icon={faCalendar} size="2x" />
          </Button>
          <Button
            href="appointment"
            className="book w-[20rem] rounded h-[6rem] bg-[#BFD2F8] flex items-center justify-around text-darkblue/80 hover:text-darkblue"
          >
            <p>Medicine Order</p>
            <FontAwesomeIcon icon={faTablets} size="2x" />
          </Button>
          <Button
            href="order-medicine"
            className="book w-[20rem] rounded h-[6rem] bg-[#159EEC] flex items-center justify-around text-white/80 hover:text-white"
          >
            <p>Medical Equipment Order</p>
            <FontAwesomeIcon icon={faSyringe} size="2x" />
          </Button>
        </div>
        <div className="content w-[40rem] flex flex-col justify-center items-center ">
          <h4 className="  font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
            Welcome To X Hospital
          </h4>
          <h3 className="text-center text-blue-950 text-[32px]  font-bold font-yeseva">
            A Great Place to Receive Care
          </h3>
          <p className="text-center line-clamp-3">
          Welcome to X Hospital, where exceptional care meets compassion. Our state-of-the-art facilities and dedicated team of professionals ensure you receive the highest quality medical services. At X Hospital, your health and well-being are our top priorities. Experience personalized, comprehensive care in a supportive and welcoming environment. Your journey to better health starts here.
          </p>
          <a
            href=""
            className="text-sky-500 text-base font-normal font-['Work Sans'] leading-snug p-8"
          >
            Learn More
          </a>
        </div>
        <img
          src="./hospital-home.jpg"
          alt="image"
          className="w-[40rem] "
        />
      </div>
      <section
        href="#ourservice"
        className="w-3/4 mx-auto flex flex-col items-center justify-stretch my-16 gap-4"
      >
        <div className="">
          <h4 className="  font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
            Care you can believe in
          </h4>
          <h3 className="text-center text-blue-950 text-[32px]  font-bold font-yeseva">
            Our Services
          </h3>
        </div>
        <div className="flex flex-row items-center justify-center">
        <div className="flex border-darkblue border-2 rounded-sm">
              <div className="flex flex-col justify-between">
                <HeroButton>Free Checkup</HeroButton>
                <HeroButton>Cardiogram</HeroButton>
                <HeroButton>DNA Testing</HeroButton>
                <HeroButton>Blood Bank</HeroButton>
              </div>
      </div>
          <article className="flex flex-col gap-3 my-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl mx-auto px-4">
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
          <p className="text-sm text-justify mb-4">
  Putting patients first is more than a motto, it's our guiding principle in everything we do. We strive to provide compassionate care and exceptional service to every individual who walks through our doors.
        </p>
          <p className="text-sm text-justify mb-4">
            We strive to deliver our best each day, drawing from a rich legacy of excellence in healthcare. Our team is dedicated to providing nothing short of 5-star care, ensuring that every patient receives the highest quality treatment and attention.
          </p>
          <p className="text-sm text-justify mb-4">
            When you choose our hospital, you're not just placing your trust in our expertise; you're believing in our unwavering commitment to your well-being. From the moment you walk through our doors, you'll experience the warmth and compassion that define our approach to healthcare.
          </p>
    </article> 
    <div className="flex flex-col space-y-4">
  <img src="./ART-Doctors-Patient.png" alt="Hospital Image" className="w-full max-w-lg h-auto" />
  <img src="./ART-Patient-doctor-Medicare-1024x683.png" alt="Hospital Image" className="w-full max-w-lg h-auto" />
</div>

        </div>
      </section>

      <section
        href="ourDoctor"
        className="w-3/4 mx-auto flex flex-col items-stretch justify-center gap-4"
      >
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
      <Appointment href="Contact"></Appointment>

            <div className="ourDoctor w-3/4 mx-auto my-4 gap-16">
        <h4 className="font-bold text-lg text-center text-sky-500 uppercase tracking-[2.88px]">
          Trust Care
        </h4>
        <h3 className="text-center text-blue-950 text-[32px] font-bold font-yeseva my-4">
          Our Doctors
        </h3>
        <div className="my-24"> {/* Added margin to provide spacing */}
          <FrameDoctor />
        </div>
      </div>
  
    </>
  );
};

export default Hero;
