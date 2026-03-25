import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-semibold mb-5">Home</h2>

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

// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import useUserAuth from "../../hooks/useUserAuth";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";


// const Home = () => {
//   useUserAuth();


//   const navigate = useNavigate();

//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchDashboardData = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(
//         `${API_PATHS.DASHBOARD.GET_DATA}`
//       );

//       if (response.data) {
//         setDashboardData(response.data);
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     return () => {};
//   } , []);


//   return (
//     <DashboardLayout activeMenu="Dashboard">
//       <div className="my-5 mx-auto">

//         <h2 className="text-xl font-semibold mb-5">
//           Home
//         </h2>
        

//         <div className="grid grid-cols-3 gap-5">

//           <div className="bg-white shadow rounded-xl p-5">
//             Total Balance
//           </div>

//           <div className="bg-white shadow rounded-xl p-5">
//             Total Income
//           </div>

//           <div className="bg-white shadow rounded-xl p-5">
//             Total Expense
//           </div>

//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }; 


// export default Home;