import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectToken } from '../../../features/User/auth/authSelectors'

function UserAuth({childern}) {
    const navigate =useNavigate()
    const token=useSelector(selectToken)

    useEffect(()=>{
        if(token!==""){
            navigate('/')
        }

    },[token])

    if(token===""){
        return childern
    }
  
}

export default UserAuth
