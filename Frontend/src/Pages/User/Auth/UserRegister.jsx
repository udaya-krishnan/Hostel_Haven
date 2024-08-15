import React from "react";
import Register from "../../../Components/User/Register";
import Header from "../../../Layout/UserLayout/Header";
import Footer from "../../../Layout/Footer";

function UserRegister() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Register />
        <Footer />
      </div>
    </>
  );
}

export default UserRegister;
