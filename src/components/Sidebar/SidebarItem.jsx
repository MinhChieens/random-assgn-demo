import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  const click = (i) => {
    if (i && i.path) {
      navigate(i.path);
    }
  };
  return (
    <div
      onClick={() => click(item)}
      className={`sidebar-title flex h-10 text-[#EFF2F4] font-[poppins] font-bold items-center justify-between hover:bg-[#EFF2F4] hover:cursor-pointer hover:text-darkblue py-1 px-2 rounded-sm }`}
    >
      {item ? (
        <div>
          <FontAwesomeIcon icon={item.icon} className="w-4" />
          <span className="pl-4">{item.title}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SidebarItem;
