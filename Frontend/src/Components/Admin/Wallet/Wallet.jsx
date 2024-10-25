import React, { useEffect, useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { fetchWalletHistory } from "../../../features/Admin/auth/authAction";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Wallet() {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Process transaction data for the chart
  const processTransactionsByMonth = (transactions) => {
    const monthTotals = new Array(12).fill(0); // Initialize an array with 12 months

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const month = date.getMonth(); // Get the month (0 = Jan, 11 = Dec)
      monthTotals[month] += transaction.amount; // Sum the amounts by month
    });

    return monthTotals;
  };

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchWalletHistory());
      console.log(res);

      setBalance(res.wallet.balance);
      setTransactions(res.transaction);
    })();
  }, [dispatch]);

  const monthData = processTransactionsByMonth(transactions);

  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Transaction Amount",
        data: monthData, // Use calculated data from the transactions
        backgroundColor: "#3C3633",
      },
    ],
  };



  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1  bg-gray-100">
        <Header />
        <div className="p-6 mt-16 ">
          {/* Adjusted padding to avoid overlapping with header and sidebar */}
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            <div className="flex gap-4 justify-between">
              {/* Wallet Cards */}
              <div className="flex gap-4">
                <WalletCard color="bg-btncolor" balance={balance} />
              </div>
            </div>

            <div className="flex gap-6">
              {/* Card Details Section */}
              <div className="bg-white p-4 rounded-xl shadow-md flex-1">
                <Bar data={barData} />
              </div>

              {/* Analytics Section */}
              {/* <div className="bg-white p-4 rounded-xl shadow-md w-1/3">
                <h3 className="text-lg font-bold">Monthly Limits</h3>
                <Doughnut data={pieData} />
              </div> */}
            </div>

            {/* Wallet Activity Section */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-4">Wallet Activity</h3>
              <WalletActivity transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wallet Card Component
const WalletCard = ({ color, balance }) => (
  <div className={`p-4 ${color} text-white rounded-xl w-60`}>
    <p className="text-sm">Balance</p>
    <h3 className="text-xl font-semibold">{balance}</h3>
  </div>
);

// Wallet Activity Component
const WalletActivity = ({ transactions }) => (
  <div className="overflow-y-auto h-48">
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Transaction</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
            <td>{transaction.amount}</td>
            <td className="text-green-500">{transaction.transaction_type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Wallet;
