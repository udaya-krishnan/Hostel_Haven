import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectToken } from '../../../features/User/auth/authSelectors'

function UserAuth({children}) {
    const navigate =useNavigate()
    const token=useSelector(selectToken)
    console.log(token,'token');
    

    useEffect(()=>{
        if(token!==null){
            navigate('/')
        }

    },[token])

    return children
  
}

export default UserAuth
