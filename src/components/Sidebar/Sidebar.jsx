import React from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ items }) => {
  return (
    <div className="sidebar">
      {items &&
        items.map((item, index) => {
          return <SidebarItem key={index} item={item} />;
        })}
    </div>
  );
};

export default Sidebar;
