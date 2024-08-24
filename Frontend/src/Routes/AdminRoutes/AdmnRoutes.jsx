import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../Pages/Admin/auth/AdminLogin';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';

function AdmnRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AdminLogin/>} />
        <Route path={"/dashboard"} element={<AdminDashboard/>} />
       
      </Routes>
    </>
  )
}

export default AdmnRoutes
