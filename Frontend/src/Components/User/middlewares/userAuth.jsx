import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  selectUser } from '../../../features/User/auth/authSelectors'

function UserAuth({children}) {
    const navigate =useNavigate()
    const user=useSelector(selectUser)
    console.log(user,'token');
    
    useEffect(()=>{
        if(user!==null){
            console.log("loged");
            
            navigate('/')
        }else{
            console.log("else");
            
        }

    },[user])

    return children
  
}

export default UserAuth
