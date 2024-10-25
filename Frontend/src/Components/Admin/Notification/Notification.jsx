import React, { useState } from "react";
import Sidebar from "../../../Layout/AdminLayout/Sidebar";
import Header from "../../../Layout/AdminLayout/Header";
import { useDispatch } from "react-redux";
import { sendNotification } from "../../../features/Admin/auth/authAction";

function Notification() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("all");
  const [messageType, setMessageType] = useState("info"); // New state for message type
  const dispatch=useDispatch()

  const handleSendNotification = async(e) => {
    e.preventDefault();
    // Handle sending the notification (API call here)
    const data={
        message:message,
        recipient:recipient,
        messageType:messageType
    }
    console.log({ message, recipient, messageType });

    await dispatch(sendNotification(data))
    setMessage("")
    setMessageType("all")
    setRecipient("info")
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6 mt-20">
          <div className="bg-white ml-64 p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Send Notification</h2>
            <form onSubmit={handleSendNotification}>
              {/* Message input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Enter your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Recipient selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Send to
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                >
                  <option value="all">All Users and Hosts</option>
                  <option value="users">Users</option>
                  <option value="hosts">Hosts</option>
                </select>
              </div>

              {/* Message type selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Notification Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value)}
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
