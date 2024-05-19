import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Leaderboard = ({ name, number, icon }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-2 w-60 h-20 font-[poppins]">
      <div className="flex items-center justify-center bg-indigo-100 rounded-full w-10 h-10 mr-3 ml-2">
        <span className="text-indigo-500 ">
          <FontAwesomeIcon icon={icon} size="1x" />
        </span>
      </div>
      <div className="flex flex-col justify-center gap-1 pl-4">
        <span className="text-xl font-bold text-black">{name}</span>
        <span className="text-lg text-gray-500 ">{number}</span>
      </div>
    </div>
  );
};

export default Leaderboard;
