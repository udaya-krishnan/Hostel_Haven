import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../../Pages/User/Auth/UserRegister";
import UserLogin from "../../Pages/User/Auth/UserLogin";
import UserOtp from "../../Pages/User/Auth/UserOtp";
import UserForgotPass from "../../Pages/User/Auth/UserForgotPass";
import UserHome from "../../Pages/User/UserHome";
import UserAuth from "../../Components/User/middlewares/userAuth";
import UserEmail from "../../Pages/User/Auth/UserEmail";
import Profile from "../../Pages/User/Account/Profile";
import IsBlocked from "../../Components/User/middlewares/IsBlocked";

function UserRoute() {
  return (
    <>
      <Routes>
        <Route path={"/register"} element={<UserAuth><UserRegister /></UserAuth>} />
        <Route path={"/login"} element={<UserAuth><UserLogin/></UserAuth>} />
        <Route path={"/otp"}  element={<UserAuth><UserOtp/></UserAuth>} />
        <Route path={'/emailverify'} element={<UserAuth><UserEmail/></UserAuth>}/>
        <Route path={'/forgot'} element={<UserForgotPass/>} />
        <Route path={'/'} element={<IsBlocked><UserHome/></IsBlocked>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default UserRoute;
