import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Hostjoin from '../../Pages/Host/Auth/Hostjoin'
import HostLogin from '../../Pages/Host/Auth/HostLogin'

function HostRoutes() {
  return (
    <>
    <Routes>
        <Route path={'/join'} element={<Hostjoin/>} />
        <Route path={'/login'} element={<HostLogin/>} />
    </Routes>
    </>
  )
}

export default HostRoutes
