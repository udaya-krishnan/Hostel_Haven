import React from 'react'
import HomeHost from '../../Components/Host/HomeHost'
import Header from '../../Layout/HostLayout/Header'

function HostHome() {
  return (
    <>
    <div className="h-screen flex flex-col">
    <Header/>
    <HomeHost/>
    </div>
    </>
  )
}

export default HostHome
