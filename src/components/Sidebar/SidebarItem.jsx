import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  const [pick, setPick] = useState(false);
  const click = (i) => {
    setPick(!pick);
    if (i && i.path) {
      navigate(i.path);
    }
  };
  return (
    <div className="sidebar_Item px-4 py-1 text-[#EFF2F4] font-[poppins] font-bold">
      <div
        onClick={() => click(item)}
        className={`sidebar-title flex h-10 items-center justify-between hover:bg-[#EFF2F4] hover:cursor-pointer hover:text-darkblue py-1 px-2 rounded-sm ${pick ? "bg-[#EFF2F4] text-darkblue" : ""}`}
      >
        {item ? (
          <div>
            <FontAwesomeIcon icon={item.icon} />
            <span className="pl-4">{item.title}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* {open && item ? (
        <div className="content pl-2">
          {item.childrens.map((child, index) => {
            return <SidebarItem key={index} item={child} />;
          })}
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default SidebarItem;
