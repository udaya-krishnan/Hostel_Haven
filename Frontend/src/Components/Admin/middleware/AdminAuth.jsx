import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import { selectAdminToken } from '../../../features/Admin/auth/authSelection'

function AdminAuth({children}) {
  const token=useSelector(selectAdminToken)
  const navigate=useNavigate()

  useEffect(()=>{
    if(token===null){
        navigate('/admin')
    }
  },[token])

  return children

}

export default AdminAuth
