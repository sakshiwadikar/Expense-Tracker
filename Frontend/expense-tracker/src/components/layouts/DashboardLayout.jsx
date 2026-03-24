// import React from 'react';
// import { Navbar} from "../../components/layouts/Navbar";
// import {SideMenu} from "../../components/layouts/SideMenu";

// const DashboardLayout =({children ,acitveMenu})=> {

//     const {user} = useContext(UserContext)
//     return (
//         <div className="">
//             <Navbar acitveMenu={acitveMenu} />


//             {user && (
//                 <div className ="flex"> 
//                     <div className="max-[1800px]: hidden" >
//                         <SideMenu acitveMenu={acitveMenu} />
//                     </div>

//                     <div className= "grow mx-5"> {children} </div>

//                 </div>
//             )}
//         </div>
//     )
// }

// export default DashboardLayout;
import React, { useContext } from "react";
import Navbar from "../../components/layouts/Navbar";
import SideMenu from "../../components/layouts/SideMenu";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;