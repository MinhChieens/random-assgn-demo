import { navigation } from "../constants/index";
import Button from "../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 w-full flex flex-col text-white/80 text-sm bg-darkblue">
      <div className="flex m-auto pt-8 pb-4 px-28 w-full">
        <div className="mx-auto px-4 align-top">
          <p className="text-lightblue text-3xl font-bold font-serif pb-2">
            MEDDICAL
          </p>
          <div className="text-wrap">
            Leading the Way in Medical <br /> Execellence, Trusted Care.
          </div>
        </div>
        <div className="mx-auto px-4 align-top">
          <span className="font-bold pb-6">Important Links</span>
          <nav className="static flex-col pt-6">
            {navigation.slice(0, 4).map((item) => (
              <a
                key={item.id < 2}
                href={item.url}
                className="block relative font-sans transition-colors hover:text-white text-sm"
              >
                {item.title}
              </a>
            ))}
            <a
              href="appointment"
              className="block relative font-sans transition-colors hover:text-white text-sm"
            >
              Appointment
            </a>
          </nav>
        </div>
        <div className="mx-auto px-4 align-top">
          <span className="block font-bold pb-6">Contact Us</span>
          <li className="static flex-col items-center list-none">
            <ul>Call: (237) 681-812-255</ul>
            <ul>Email: fildineesoe@gmail.com</ul>
            <ul>Address: 0123 Some place</ul>
            <ul>Some country</ul>
          </li>
        </div>
        <div className="mx-auto px-4 align-top">
          <span className="block font-bold pb-6">Newsletter</span>
          <Button
            className="rounded-md px-2 py-2 bg-lightblue"
            href="#newsletter"
          >
            <span>Enter your email address</span>
            <FontAwesomeIcon
              className="pl-4 pr-2"
              icon={faTelegram}
              size="2x"
            />
          </Button>
        </div>
      </div>
      <hr className="w-full h-1px my-4 px-auto bg-white/50" />
      <div className="flex flex-row my-4 justify-between px-36">
        <span>© 2021 Hospitals name All Rights Reserved by PNTEC-LTD</span>
        <div className="flex">
          <Button className=" mx-4" href="#linkedin">
            <FontAwesomeIcon
              className="text-lightblue"
              size="2x"
              icon={faLinkedin}
            />
          </Button>
          <Button className=" mx-4" href="#facebook">
            <FontAwesomeIcon
              className="text-lightblue"
              size="2x"
              icon={faFacebook}
            />
          </Button>
          <Button className=" mx-4" href="#instagram">
            <FontAwesomeIcon
              className="text-lightblue"
              size="2x"
              icon={faInstagram}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
