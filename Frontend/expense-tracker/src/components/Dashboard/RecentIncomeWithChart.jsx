import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"];

const RecentIncomeWithChart = ({ transactions = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(transactions)) {
      setChartData([]);
      return;
    }

    const dataArr = transactions.map((item) => ({
      name: item?.source || "Unknown",
      amount: Number(item?.amount) || 0,
    }));

    setChartData(dataArr);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;

