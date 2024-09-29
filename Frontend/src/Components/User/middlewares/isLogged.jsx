import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  selectUser } from '../../../features/User/auth/authSelectors'

function IsLogged({children}) {
    const navigate =useNavigate()
    const user=useSelector(selectUser)
    console.log(user,'token');

    useEffect(()=>{
        if(user==null){
            navigate('/')
        }
    },[user])

    return children
}

export default IsLogged
