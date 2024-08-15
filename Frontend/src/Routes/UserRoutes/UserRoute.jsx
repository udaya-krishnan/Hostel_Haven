import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../../Pages/User/Auth/UserRegister";
import UserLogin from "../../Pages/User/Auth/UserLogin";
import UserOtp from "../../Pages/User/Auth/UserOtp";
import UserForgotPass from "../../Pages/User/Auth/UserForgotPass";

function UserRoute() {
  return (
    <>
      <Routes>
        <Route path={"/register"} element={<UserRegister />} />
        <Route path={"/login"} element={<UserLogin/>} />
        <Route path={"/otp"}  element={<UserOtp/>} />
        <Route path={'/forgot'} element={<UserForgotPass/>} />
      </Routes>
    </>
  );
}

export default UserRoute;
