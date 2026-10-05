import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions = [], onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-semibold text-white">
            Expense Overview
          </h5>

          <p className="text-xs text-slate-400 mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-8">
        <CustomLineChart
          data={chartData}
          xAxisKey="category"
        />
      </div>
    </div>
  );
};

export default ExpenseOverview;