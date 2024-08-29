import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../Pages/Admin/auth/AdminLogin';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
import Usermenagement from '../../Pages/Admin/Usermenagement';
import Hostmenagement from '../../Pages/Admin/Hostmenagement';
import AdminUserDetails from '../../Pages/Admin/AdminUserDetails';
import AdminHostDetails from '../../Pages/Admin/AdminHostDetails';
import Amenitiesmenagement from '../../Pages/Admin/Amenitiesmenagement';

function AdmnRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AdminLogin/>} />
        <Route path={"/dashboard"} element={<AdminDashboard/>} />
        <Route path={'/user'} element={<Usermenagement/>}/>
        <Route path={'/host'} element={<Hostmenagement/>}/>
        <Route path={'/userdetails'} element={<AdminUserDetails/>}/>
        <Route path={'/hostdetails'} element={<AdminHostDetails/>}/>
        <Route path={'amenities'} element={<Amenitiesmenagement/>}/>
      </Routes>
    </>
  )
}

export default AdmnRoutes
