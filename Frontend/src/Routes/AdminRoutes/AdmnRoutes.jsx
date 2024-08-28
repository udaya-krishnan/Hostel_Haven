import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../Pages/Admin/auth/AdminLogin';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
import Usermenagement from '../../Pages/Admin/Usermenagement';

function AdmnRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AdminLogin/>} />
        <Route path={"/dashboard"} element={<AdminDashboard/>} />
        <Route path={'/user'} element={<Usermenagement/>}/>
      </Routes>
    </>
  )
}

export default AdmnRoutes
