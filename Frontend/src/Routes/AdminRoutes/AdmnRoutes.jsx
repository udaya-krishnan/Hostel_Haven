import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../../Pages/Admin/auth/AdminLogin';
import AdminDashboard from '../../Pages/Admin/AdminDashboard';
import Usermenagement from '../../Pages/Admin/Usermenagement';
import Hostmenagement from '../../Pages/Admin/Hostmenagement';
import AdminUserDetails from '../../Pages/Admin/AdminUserDetails';
import AdminHostDetails from '../../Pages/Admin/AdminHostDetails';
import Amenitiesmenagement from '../../Pages/Admin/Amenitiesmenagement';
import AdminAuth from '../../Components/Admin/middleware/AdminAuth';
import Safetymenagement from '../../Pages/Admin/Safetymenagement';
import AdminHostProperty from '../../Pages/Admin/AdminHostProperty';
import AdminPropertyDetails from '../../Pages/Admin/AdminPropertyDetails';
import AdminCoupon from '../../Pages/Admin/AdminCoupon';
import AdminBanner from '../../Pages/Admin/AdminBanner';

function AdmnRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<AdminLogin/>} />
        <Route path={"/dashboard"} element={<AdminAuth><AdminDashboard/></AdminAuth>} />
        <Route path={'/user'} element={<AdminAuth><Usermenagement/></AdminAuth>}/>
        <Route path={'/host'} element={<AdminAuth><Hostmenagement/></AdminAuth>}/>
        <Route path={'/userdetails'} element={<AdminAuth><AdminUserDetails/></AdminAuth>}/>
        <Route path={'/hostdetails'} element={<AdminAuth><AdminHostDetails/></AdminAuth>}/>
        <Route path={'/amenities'} element={<AdminAuth><Amenitiesmenagement/></AdminAuth>}/>
        <Route path={'/safety'} element={<AdminAuth><Safetymenagement/></AdminAuth>}/>
        <Route path={'/hostproperty'} element={<AdminAuth><AdminHostProperty/></AdminAuth>}/>
        <Route path={'/propertydetails'} element={<AdminAuth><AdminPropertyDetails/></AdminAuth>}/>
        <Route path={'/coupon'} element={<AdminAuth><AdminCoupon/></AdminAuth>}/>
        <Route path={'/banner'} element={<AdminAuth><AdminBanner/></AdminAuth>}/>
      </Routes>
    </>
  )
}

export default AdmnRoutes
