import { navigation } from "../constants/index";

const Footer = () => {
  return (
    <div className="static bottom-0 left-0 w-full flex items-center text-white/80 text-sm bg-darkblue">
      <div className="flex m-auto py-8">
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
          <button className="">Enter your email address</button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
