// import React, { useState, useEffect } from 'react';
// import { LuPlus } from 'react-icons/lu';
// import CustomBarChart from '../Charts/CustomBarChart';
// import { prepareIncomeBarChartData } from '../../utils/helper';

// const IncomeOverview = ({ transactions, onAddIncome }) => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const result = prepareIncomeBarChartData(transactions);
//     console.log(result);
//     setChartData(result);
//   }, [transactions]);

//   return (
//     <div className="card">
//       <div className="flex items-start justify-between">
//         <div>
//           <h5 className="text-lg">Income Overview</h5>
//           <p className="text-xs text-gray-400 mt-0.5">
//             Track your income sources and amounts over time.
//           </p>
//         </div>

//         <button className="add-btn" onClick={onAddIncome}>
//           <LuPlus className="text-lg" />
//           Add Income
//         </button>
//       </div>

//       <div className="mt-10 h-80">
//         <CustomBarChart data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default IncomeOverview;
import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const result = prepareIncomeBarChartData(transactions);
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your income sources and amounts over time.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10 h-80">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;