// import React from 'react';
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import { useUserAuth } from '../../hooks/useUserAuth';


// const Home=()=>{
//   useUserAuth();
//   return (
//     <DashboardLayout activeMenu="Dashboard">
//       <div className="my-5 mx-auto">
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Home;

import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">

        <h2 className="text-xl font-semibold mb-5">
          Home
        </h2>

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-white shadow rounded-xl p-5">
            Total Balance
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            Total Income
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            Total Expense
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Home;