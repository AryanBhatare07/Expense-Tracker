import React from "react";
import ChartTooltip from "./ChartTooltip";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor,
}) => {
  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors.length ? colors[index % colors.length] : "#875CF5"}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              <div>
                <div className="text-xl font-semibold">{name}</div>
                <div className="text-lg mt-1 flex items-center justify-center">
                  ₹{value}
                </div>
              </div>,
              null,
            ]}
            contentStyle={{
              backgroundColor: "#0e192a",
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "10px 14px",
            }}
            labelStyle={{
              display: "none",
            }}
            separator=""
            cursor={false}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: "18px",
            }}
            formatter={(value) => (
              <span
                style={{
                  marginRight: "25px",
                }}
              >
                {value}
              </span>
            )}
          />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="42%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize={14}
              >
                {label}
              </text>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize={20}
                fontWeight="600"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
