import React from 'react'
import Header from "../../../Layout/UserLayout/Header";
import Footer from "../../../Layout/Footer";
import ForgotPassword from '../../../Components/User/ForgotPassword';

function UserForgotPass() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ForgotPassword/>
        <Footer />
      </div>
    </>
  )
}

export default UserForgotPass
