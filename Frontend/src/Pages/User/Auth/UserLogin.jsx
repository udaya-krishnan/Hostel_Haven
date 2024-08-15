import React from "react";
import Header from "../../../Layout/UserLayout/Header";
import Footer from "../../../Layout/Footer";
import Login from "../../../Components/User/Login";

function UserLogin() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Login />
        <Footer />
      </div>
    </>
  );
}

export default UserLogin;
