import React, { useEffect } from 'react'
import Header from '../../Layout/AdminLayout/Header'
import Sidebar from '../../Layout/AdminLayout/Sidebar'
import { useSelector } from 'react-redux'
import { selectAdminToken } from '../../features/Admin/auth/authSelection'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const token =useSelector(selectAdminToken)
    const navigate=useNavigate()

    useEffect(()=>{
        if(token==null){
            navigate('/admin/')
        }
    },[token])
    
  return (
    <div>
     <Header/>
     <Sidebar/>
    </div>
  )
}

export default Dashboard
