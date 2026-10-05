import React from "react";
import { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get all Expense Details
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE,
      );

      setExpenseData(response.data);
    } catch (error) {
      console.log("Error fetching expense:", error);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
        icon,
      });

      toast.success("Expense added successfully.");

      // Expense list refresh
      fetchExpenseDetails();

      // Modal close
      setOpenAddExpenseModal(false);
    } catch (error) {
      console.log("Error adding expense:", error);

      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  //Delete Expense
  const deleteExpense = async (id) => {
    console.log("DELETING EXPENSE ID:", id);
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({show: false, data: null})
      toast.success('Expense details deleted successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error deleting Expense: ", error.response?.data?.message || error.message);
      
    }
  };

  //Handle download Expense details
  const handleDownloadExpenseDetails = async () => {};

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => {
            setOpenAddExpenseModal(false);
          }}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Expense Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => {
            setOpenDeleteAlert({
              show: false,
              data: null,
            });
          }}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
