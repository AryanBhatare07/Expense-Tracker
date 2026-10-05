import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-rose-500/10 text-rose-400";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-slate-800/50 transition">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-slate-200 bg-[#162238] rounded-full">
        {icon ? <span className="text-2xl">{icon}</span> : <LuUtensils />}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-white font-medium">{title}</p>

          <p className="text-sm text-slate-500 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ₹{amount}
            </h6>

            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
