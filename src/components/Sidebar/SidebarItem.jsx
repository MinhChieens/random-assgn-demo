import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SidebarItem = ({ item }) => {
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [pick, setPick] = useState(false);
   const click = (i) => {
      if (i && i.path) {
         navigate(i.path);
      } else setOpen(!open);
   };
   return (
      <div className="sidebar_Item px-2 py-1 text-darkblue/80 block">
         <div
            onClick={() => click(item)}
            className="sidebar-title flex justify-between hover:bg-darkblue/30 hover:cursor-pointer hover:text-darkblue p-1 rounded-md"
         >
            {item ? <span>{item.title}</span> : ""}
         </div>
         {open && item ? (
            <div className="content pl-2">
               {item.childrens.map((child, index) => {
                  return <SidebarItem key={index} item={child} />;
               })}
            </div>
         ) : (
            ""
         )}
      </div>
   );
};

export default SidebarItem;
