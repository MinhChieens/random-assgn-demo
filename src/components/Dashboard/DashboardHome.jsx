import React from "react";

const DashboardHome = ({ title, homeContent }) => {
   return (
      <div className="w-4/5 mx-auto my-2">
         <h1 className="text-2xl font-semibold text-darkblue">{title}</h1>
         <div className="grid grid-cols-3 gap-4 mt-4">
            {homeContent.map((item, index) => {
               return (
                  <div className="bg-lightblue rounded-md" key={index}>
                     <div className="p-4 rounded-md hover:bg-darkblue/30 hover:cursor-pointer">
                        <a
                           className="text-xl font-semibold text-darkblue"
                           href={item.path}
                        >
                           {item.title}
                        </a>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default DashboardHome;
