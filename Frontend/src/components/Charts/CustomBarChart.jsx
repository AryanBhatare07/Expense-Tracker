import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [], xAxisKey = "category" }) => {
  const BAR_COLORS = ["#8B5CF6", "#6366F1", "#A855F7"];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) {
      return null;
    }

    const item = payload[0];

    return (
      <div className="rounded-xl border border-slate-700 bg-[#0b1525] px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-indigo-300">
          {item?.payload?.[xAxisKey]}
        </p>

        <p className="mt-1 text-xs text-slate-400">Amount</p>

        <p className="mt-1 text-sm font-bold text-white">₹{item?.value}</p>
      </div>
    );
  };

  return (
    <div className="mt-6 w-full rounded-2xl bg-[#0e192a] p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="20%"
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />

          <XAxis
            dataKey={xAxisKey}
            tick={{
              fontSize: 14,
              fill: "#cbd5e1",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 14,
              fill: "#cbd5e1",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={(props) => <CustomTooltip {...props} />}
            cursor={false}
          />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
