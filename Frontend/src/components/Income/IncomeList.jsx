import React from "react";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold text-white">Income Sources</h5>

          <p className="mt-1 text-xs text-slate-400">
            View and manage all your income transactions
          </p>
        </div>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      {/* Income List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
