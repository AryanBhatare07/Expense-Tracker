import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CustomXAxisTick from "./CustomXAxisTick";

const CustomLineChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) {
      return null;
    }

    const item = payload[0];

    return (
      <div className="rounded-xl border border-slate-700 bg-[#0b1525] px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-indigo-300">
          {item?.payload?.category}
        </p>

        <p className="mt-1 text-xs text-slate-400">Amount</p>

        <p className="mt-1 text-sm font-bold text-white">₹{item?.value}</p>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-[#0e192a] p-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875CF5" stopOpacity={0.35} />

              <stop offset="95%" stopColor="#875CF5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />

          <XAxis
            dataKey="category"
            tick={(props) => <CustomXAxisTick {...props} data={data} />}
            axisLine={false}
            tickLine={false}
            height={55}
          />

          <YAxis
            tick={{
              fontSize: 13,
              fill: "#cbd5e1",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={(props) => <CustomTooltip {...props} />}
            cursor={false}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875CF5"
            strokeWidth={3}
            fill="url(#incomeGradient)"
            activeDot={{
              r: 6,
              fill: "#A78BFA",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
