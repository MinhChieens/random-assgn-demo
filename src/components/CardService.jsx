import React from "react";
import ImgService from "../assets/service.png";
import Sample from "../assets/sample_1.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CardService = () => {
   return (
      <div className="card bg-slate-300 w-80 h-[32rem] flex flex-col rounded">
         <img src={ImgService} alt="service" className="rounded-t" />
         <div className="relative content pl-4 pt-7">
            <div className="w-20 h-20 left-[217px] top-[-40px] absolute">
               <img src={Sample} alt="" className="rounded-full" />
            </div>
            <h3 className="font-bold text-2xl text-[#1F2B6C]">Free CheckUp</h3>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing Quisque
               placerat Convallis felis vitae tortor augue. Velit nascetur massa
               in.
            </p>

            <a
               href=""
               className=" text-[#159EEC] pt-4 line-clamp-4 hover:underline"
            >
               Learn More
               <FontAwesomeIcon
                  className="pt-1 pl-2"
                  color="#159EEC"
                  size="1x"
                  icon={faArrowRight}
               />
            </a>
         </div>
      </div>
   );
};

export default CardService;
