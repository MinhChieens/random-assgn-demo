import React, { useState, useRef } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ items }) => {
  const ref = useRef([]);
  const [pickIndex, setPickIndex] = useState(-1);
  const handleClick = (id) => {
    if (ref.current[id]) {
      ref.current[id].focus();
    }
    setPickIndex(id);
  };
  return (
    <div className="sidebar">
      {items &&
        items.map((item, index) => {
          return (
            <div
              ref={(element) => (ref.current[index] = element)}
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
