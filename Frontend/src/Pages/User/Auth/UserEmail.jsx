import React from 'react'
import Header from "../../../Layout/UserLayout/Header";
import Footer from "../../../Layout/Footer";
import EmailVerify from '../../../Components/User/VerifyEmail';

function UserEmail() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <EmailVerify />
      <Footer />
    </div>
  </>
  )
}

export default UserEmail
