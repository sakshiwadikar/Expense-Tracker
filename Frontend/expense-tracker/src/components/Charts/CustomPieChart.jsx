import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const COLORS = ["#875CF5", "#FF6B6B", "#4CAF50", "#FFC107", "#00BCD4"];

const CustomPieChart = ({
  data = [],
  label = "",
  totalAmount = 0,
  showTextAnchor = true,
}) => {

  // ✅ Ensure valid array + numeric values
  const chartData = Array.isArray(data)
    ? data
        .map((item, index) => ({
          name: item?.name || "Unknown",
          amount: Number(item?.amount) || 0,
          fill: COLORS[index % COLORS.length],
        }))
        .filter((item) => item.amount > 0)
    : [];

  // ✅ Prevent LegendSizeDispatcher crash
  if (chartData.length === 0) {
    return (
      <div className="h-95 flex items-center justify-center text-gray-400">
        No income data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>

        {/* ✅ Safe tooltip */}
        <Tooltip content={<CustomTooltip />} />

        {/* ✅ Safe legend */}
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              ₹{totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;