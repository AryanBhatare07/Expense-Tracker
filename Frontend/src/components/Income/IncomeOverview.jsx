import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);
  //   console.log("INCOME TRANSACTIONS:", transactions);
  //   console.log("INCOME CHART DATA:", chartData);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-semibold text-white">Income Overview</h5>

          <p className="text-xs text-slate-400 mt-1">
            Track your earnings over time and analyze your income trends
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-8">
        <CustomBarChart
          data={chartData}
          xAxisKey="month"
        />
      </div>
    </div>
  );
};

export default IncomeOverview;
