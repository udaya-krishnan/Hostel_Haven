import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../Pages/Admin/auth/AdminLogin';

function AdmnRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AdminLogin/>} />
       
      </Routes>
    </>
  )
}

export default AdmnRoutes
