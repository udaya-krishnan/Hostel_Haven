import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import Swal
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { addingAmount, fetchPayment } from "../../features/Host/auth/authAction";
import { selectHost } from "../../features/Host/auth/authSelectors";
import { AddAmount } from "../../config/Razorpay/Razorpay";
import { toast, Toaster } from "sonner";
import 'sweetalert2/src/sweetalert2.scss'; // Optional for default Swal styles
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const dispatch = useDispatch();
  const hostData = useSelector(selectHost);
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [todayAmount, setTodayAmount] = useState(0);
  const navigate=useNavigate()
  const [monthlyPayments, setMonthlyPayments] = useState(Array(12).fill(0)); // Array to store monthly payment totals (Jan to Dec)

  const xLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const isToday = (dateString) => {
    const today = new Date();
    const paymentDate = new Date(dateString);
    return (
      paymentDate.getDate() === today.getDate() &&
      paymentDate.getMonth() === today.getMonth() &&
      paymentDate.getFullYear() === today.getFullYear()
    );
  };

  const groupPaymentsByMonth = (payments) => {
    const monthlyTotals = Array(12).fill(0); 
    payments.forEach((payment) => {
      const paymentDate = new Date(payment.createdAt); 
      const monthIndex = paymentDate.getMonth(); 
      monthlyTotals[monthIndex] += parseFloat(payment.amount); 
    });
    return monthlyTotals;
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await dispatch(fetchPayment(hostData._id));
      if (response.message === "payment history success") {
        const wallet = response.findWallet;
        const transactions = response.allTransactions;

        setAllTransactions(transactions);
        setTotalBalance(wallet.balance);

        const todayTotal = transactions
          .filter((transaction) => isToday(transaction.createdAt))
          .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
        setTodayAmount(todayTotal);

        const monthlyTotals = groupPaymentsByMonth(transactions);
        setMonthlyPayments(monthlyTotals);
      }
    };
    fetch();
  }, [dispatch, hostData._id]);

  const handleAddAmount = async () => {
    const { value: add } = await Swal.fire({
      title: "Add Amount",
      input: "number",
      inputLabel: "Enter amount to add",
      inputPlaceholder: "Enter amount",
      showCancelButton: true,
      confirmButtonText: "Add",
    });

    if (add) {

      const response=await dispatch(addingAmount(add))
      console.log(response);

      const {amount,currency,id}=response.order

      const rzp1 = new window.Razorpay(
        AddAmount(
          amount,
          currency,
          id,
          dispatch,
          toast,
          hostData._id,
          add,
          totalBalance,
          setTotalBalance,
          setAllTransactions,
          todayAmount,
          setTodayAmount

        )
      );
      rzp1.open();


      // Swal.fire({
      //   title: "Amount Added",
      //   text: `₹${amount} has been added to your wallet.`,
      //   icon: "success",
      //   toast: true,
      //   position: "top-end",
      //   timer: 3000,
      //   timerProgressBar: true,
      //   showConfirmButton: false,
      // });
    }
  };

  return (
    <div className="h-auto bg-white p-5 max-w-7xl mx-auto">
      <Toaster/>
      {/* Header */}
      <header className="flex justify-between items-center mb-6 bg-white shadow p-6 rounded-lg">
        <div className="flex flex-col">
          <h1 className="text-xl text-btncolor font-bold">Total Balance</h1>
          <h2 className="text-3xl text-btncolor font-semibold">
            ₹{totalBalance}
          </h2>
          <p className="text-green-500">+ ₹{todayAmount} (Today)</p>
        </div>

        {/* Add amount button */}
        <button
          onClick={handleAddAmount} // Open Swal on click
          className="bg-btncolor text-white py-2 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 hover:bg-btncolor focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 mr-3"
            fill="currentColor"
          >
            <path
              fill="#ffffff"
              d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
            />
          </svg>
          Add Amount
        </button>
      </header>

      <section className="mt-6 bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg text-btncolor font-semibold mb-4">Statistics</h2>

        {/* Transaction History */}
        <div className="mb-6 max-h-48 overflow-y-auto">
          <h3 className="text-md font-semibold mb-3">Transaction History</h3>
          <ul className="space-y-2">
            {allTransactions.map((transaction, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <span>
                  {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                  {new Date(transaction.createdAt).toLocaleTimeString()}
                </span>
                <span
                  className={`font-semibold ${
                    transaction.transaction_type === "Credited"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.transaction_type === "Credited"
                    ? `+ ₹${transaction.amount}`
                    : `- ₹${transaction.amount}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chart */}
        <div className="h-auto flex justify-center items-center">
          <BarChart
            width={700}
            height={300}
            series={[{ data: monthlyPayments, color: "#3C3633" }]} // Use monthlyPayments for the chart data
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </div>
      </section>
    </div>
  );
};

export default Wallet;
