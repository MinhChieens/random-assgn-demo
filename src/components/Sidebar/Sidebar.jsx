import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ items }) => {
  const [pickIndex, setPickIndex] = useState(-1);
  const handleClick = (id) => {
    setPickIndex(id);
  };
  return (
    <div className="sidebar">
      {items &&
        items.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={` ${index === pickIndex ? "bg-[#2f83bb] px-4 py-1" : "px-4 py-1"}  `}
            >
              <SidebarItem key={index} item={item} />
            </div>
          );
        })}
    </div>
  );
};

export default Sidebar;
