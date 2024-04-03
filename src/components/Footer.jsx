import { navigation } from "../constants/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col text-white/80 text-sm bg-darkblue">
      <div className="flex m-auto pt-8 pb-4 px-28 w-full">
        <div className="flex-col items-center mx-auto px-4 align-top">
          <p className="text-lightblue text-3xl font-bold font-serif pb-2">
            MEDDICAL
          </p>
          <div className="text-wrap">
            Leading the Way in Medical <br /> Execellence, Trusted Care.
          </div>
        </div>
        <div className="flex-col items-center mx-auto px-4 align-top">
          <span className="font-bold pb-6">Important Links</span>
          <nav className="static flex-col pt-6">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-sans transition-colors hover:text-white text-sm leading-5`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-col items-center mx-auto px-4 align-top">
          <span className="block font-bold pb-6">Contact Us</span>
          <li className="static flex-col items-center list-none">
            <ul>Call: (237) 681-812-255</ul>
            <ul>Email: fildineesoe@gmail.com</ul>
            <ul>Address: 0123 Some place</ul>
            <ul>Some country</ul>
          </li>
        </div>
        <div className="flex-col items-center mx-auto px-4 align-top">
          <span className="block font-bold pb-6">Newsletter</span>
          <a
            className="flex bg-lightblue rounded-md px-2 py-2 text-darkblue items-center"
            href="#newsletter"
          >
            <span>Enter your email address</span>
            <FontAwesomeIcon
              className="pl-4 pr-2"
              icon={faTelegram}
              size="2x"
            />
          </a>
        </div>
      </div>
      <hr className="w-full h-1px my-4 px-auto bg-white/50" />
      <div className="flex flex-row my-4 justify-between px-36">
        <span>© 2021 Hospitals name All Rights Reserved by PNTEC-LTD</span>
        <div className="flex">
          <FontAwesomeIcon
            className="bg-lightblue rounded-full px-1 py-1 text-darkblue"
            icon={faLinkedinIn}
          />
          <FontAwesomeIcon
            className="bg-lightblue rounded-full px-1 py-1 text-darkblue"
            icon={faFacebookF}
          />
          <FontAwesomeIcon
            className="bg-lightblue rounded-full px-1 py-1 text-darkblue"
            icon={faInstagram}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
