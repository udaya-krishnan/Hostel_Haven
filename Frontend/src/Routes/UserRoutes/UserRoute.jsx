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
import Hostels from "../../Pages/User/Hostels";
import Details from "../../Pages/User/Details";
import ReservationPage from "../../Pages/User/ReservationPage";
import WishlistPage from "../../Pages/User/WishlistPage";
import ReservationList from "../../Pages/User/ReservationList";
import ReservationDetails from "../../Pages/User/ReservationDetails";
import IsLogged from "../../Components/User/middlewares/isLogged";
import Chat from "../../Pages/User/Chat";
import Notification from "../../Pages/User/Notification";
import Wallet from "../../Pages/User/Wallet";

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
        <Route path={'/profile'} element={<IsLogged><Profile/></IsLogged>}/>
        <Route path={'/hostelroom'} element={<Hostels/>}/>
        <Route path={'/propertydetails'} element={<Details/>}/>
        <Route path={'/reservation'} element={<IsLogged><ReservationPage/></IsLogged>}/>
        <Route path={'/wishlist'} element={<IsLogged><WishlistPage/></IsLogged>}/>
        <Route path={'/reservationlist'} element={<IsLogged><ReservationList/></IsLogged>}/>
        <Route path={'/reservationdetails'} element={<IsLogged><ReservationDetails/></IsLogged>}/>
        <Route path={'/chat'} element={<IsLogged><Chat/></IsLogged>}/>
        <Route path={'/notifications'} element={<IsLogged><Notification/></IsLogged>}/>
        <Route path={'/wallet'} element={<IsLogged><Wallet/></IsLogged>}/>
      </Routes>
    </>
  );
}

export default UserRoute;
