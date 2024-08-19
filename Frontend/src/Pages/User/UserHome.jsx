import React from 'react'
import Header from '../../Layout/UserLayout/Header'
import Home from '../../Components/User/Home'
import NearbyHostels from '../../Components/User/NearbyHostels'

function UserHome() {
  return (
    <div>
      <Header/>
      <Home/>
      <NearbyHostels/>
    </div>
  )
}

export default UserHome
