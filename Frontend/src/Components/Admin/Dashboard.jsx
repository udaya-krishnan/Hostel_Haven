import React, { useEffect, useState } from "react";
import Sidebar from "../../Layout/AdminLayout/Sidebar";
import Header from "../../Layout/AdminLayout/Header";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { fetchAllData } from "../../features/Admin/auth/authAction";
ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

function Dashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalHost, setTotalHost] = useState(0);
  const [totalProperty, setTotalProperty] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [reservations, setReservations] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchAllData());
      setTotalUser(res.totalUser);
      setTotalHost(res.totalHost);
      setTotalProperty(res.totalProperty);
      setWallet(res.Wallet);
      setReservations(res.reservations);
    })();
  }, [dispatch]);

  // Filter reservations for the current year and count by month
  const currentYear = new Date().getFullYear();
  const monthlyReservations = Array(12).fill(0);

  reservations.forEach((reservation) => {
    const createdAt = new Date(reservation.createdAt);
    if (createdAt.getFullYear() === currentYear) {
      const month = createdAt.getMonth(); // Get the month (0 for Jan, 11 for Dec)
      monthlyReservations[month] += 1; // Increment reservation count for the month
    }
  });

  const lineData = {
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
        label: "Reservations",
        data: monthlyReservations, // Use calculated data from the reservations
        borderColor: "#3C3633",
        backgroundColor: "rgba(60, 54, 51, 0.5)",
        fill: true,
        tension: 0.3, // To make the line smooth
      },
    ],
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-4 rounded-xl w-94 shadow mt-4">
            {/* Chart */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 justify-between">
                <div className="flex gap-4">
                  <WalletCard color="bg-btncolor" value={wallet.balance} content="Revenue" />
                  <WalletCard color="bg-btncolor" value={totalUser} content="Users" />
                  <WalletCard color="bg-btncolor" value={totalHost} content="Hosts" />
                  <WalletCard color="bg-btncolor" value={totalProperty} content="Property" />
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-white p-4 rounded-xl shadow-md flex-1">
                <Line data={lineData} />
              </div>

              {/* Wallet Activity Section */}
              {/* <div className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-4">Wallet Activity</h3>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wallet Card Component
const WalletCard = ({ color, value, content }) => (
  <div className={`p-4 ${color} text-white rounded-xl w-60`}>
    <p className="text-sm">{content}</p>
    <h3 className="text-xl font-semibold">{value}</h3>
  </div>
);

export default Dashboard;
