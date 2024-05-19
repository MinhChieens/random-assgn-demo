
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Leaderboard = ({name,number,icon}) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-2 w-60 h-40">
      <div className="flex items-center justify-center bg-indigo-100 rounded-full w-20 h-20 mr-3">
         <span className="text-indigo-500">
            <FontAwesomeIcon icon={icon} size='2x' />
         </span>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <span className="text-xl font-bold text-black">{name}</span>
        <span className="text-sm-4 text-gray-500 ">{number}</span>
      </div>
    </div>
  );
};

export default Leaderboard;
