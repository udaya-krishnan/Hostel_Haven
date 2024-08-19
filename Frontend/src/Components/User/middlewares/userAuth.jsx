import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectToken } from '../../../features/auth/authSelectors'

function UserAuth({childern}) {
    const navigate =useNavigate()
    const token=useSelector(selectToken)

    useEffect(()=>{
        if(token!==""){
            navigate('/login')
        }

    },[token])

    if(token){
        return childern
    }
  
}

export default UserAuth
