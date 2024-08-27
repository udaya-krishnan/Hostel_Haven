import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Hostjoin from '../../Pages/Host/Auth/Hostjoin'
import HostLogin from '../../Pages/Host/Auth/HostLogin'
import HostOtp from '../../Pages/Host/Auth/HostOtp'
import HostHome from '../../Pages/Host/HostHome'
import HostProfile from '../../Pages/Host/Account/HostProfile'

function HostRoutes() {
  return (
    <>
    <Routes>
        <Route path={'/join'} element={<Hostjoin/>} />
        <Route path={'/login'} element={<HostLogin/>} />
        <Route path={'/otp'} element={<HostOtp/>}/>
        <Route path={'/home'} element={<HostHome/>}/>
        <Route path={'/profile'} element={<HostProfile/>}/>
    </Routes>
    </>
  )
}

export default HostRoutes
