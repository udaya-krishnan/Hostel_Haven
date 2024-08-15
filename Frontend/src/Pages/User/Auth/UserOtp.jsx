import React from "react";
import Header from "../../../Layout/UserLayout/Header";
import Footer from "../../../Layout/Footer";
import Otp from "../../../Components/User/Otp";

function UserOtp() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Otp/>
        {/* <Register /> */}
        <Footer />
      </div>
    </>
  );
}

export default UserOtp;
