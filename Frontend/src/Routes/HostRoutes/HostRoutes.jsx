import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Hostjoin from '../../Pages/Host/Auth/Hostjoin'
import HostLogin from '../../Pages/Host/Auth/HostLogin'
import HostOtp from '../../Pages/Host/Auth/HostOtp'
import HostHome from '../../Pages/Host/HostHome'
import HostProfile from '../../Pages/Host/Account/HostProfile'
import PropertList from '../../Pages/Host/Property/PropertList'
import Reservstion from '../../Pages/Host/Reservstion'
import HostWallet from '../../Pages/Host/Account/HostWallet'
import HostChatPage from '../../Pages/Host/HostChatPage'
import HostRating from '../../Pages/Host/Property/HostRating'
import HostNotifications from '../../Pages/Host/HostNotifications'

function HostRoutes() {
  return (
    <>
    <Routes>
        <Route path={'/join'} element={<Hostjoin/>} />
        <Route path={'/login'} element={<HostLogin/>} />
        <Route path={'/otp'} element={<HostOtp/>}/>
        <Route path={'/home'} element={<HostHome/>}/>
        <Route path={'/profile'} element={<HostProfile/>}/>
        <Route path={'/property'} element={<PropertList/>}/>
        <Route path={'/reservation'} element={<Reservstion/>}/>
        <Route path={'/wallet'} element={<HostWallet/>}/>
        <Route path={'/chat'} element={<HostChatPage/>}/>
        <Route path={'/rate'} element={<HostRating/>}/>
        <Route path={'/notifications'} element={<HostNotifications/>}/>
    </Routes>
    </>
  )
}

export default HostRoutes
