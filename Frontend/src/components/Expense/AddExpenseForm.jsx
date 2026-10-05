import React, { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({
      ...expense,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    onAddExpense(expense);
  };

  return (
    <div className="space-y-5">
      {/* Expense Category */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Expense Category
        </label>

        <div className="pb-5">
          <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
          />
        </div>

        <input
          type="text"
          value={expense.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="Food, Rent, Shopping, Travel, etc."
          className="w-full rounded-xl border border-slate-700 bg-[#0b1525] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Amount
        </label>

        <input
          type="number"
          value={expense.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-xl border border-slate-700 bg-[#0b1525] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Date
        </label>

        <input
          type="date"
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1525] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 cursor-pointer"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
