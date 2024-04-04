import { useLocation } from "react-router-dom";
import HeadInfo from "./HeadInfo";
import { navigation } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const pathname = useLocation();

  return (
    <div className="header relative top-0 left-0 w-full">
      <HeadInfo></HeadInfo>
      <div className={`static w-full flex items-center bg-darkblue`}>
        <nav className="static flex mx-auto">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={`block relative font-sans text-white/50 transition-colors hover:text-white px-4 py-6 text-base leading-5 ${
                item.url === pathname.hash
                  ? "z-2 lg:text-white"
                  : "lg:text-white/50"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
        <nav className="static flex m-auto items-center ">
          <a href="#search">
            <FontAwesomeIcon
              style={{ color: "#ffffff" }}
              icon={faMagnifyingGlass}
              alt="search"
            />
          </a>
          <a
            className="mx-4 font-sans text-sm font-bold text-darkblue/80 transition-colors hover:text-darkblue block px-6 py-3 bg-solid rounded-full bg-lightblue"
            href="#appointment"
          >
            Appointment
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
