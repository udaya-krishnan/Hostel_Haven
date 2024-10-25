import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/User/auth/authSelectors'
import { useNavigate } from 'react-router-dom'

function IsBlocked({children}) {
    const user=useSelector(selectUser)
    const navigate=useNavigate()

    
    useEffect(()=>{
        if(user){
            if(user.is_blocked===true){
                navigate('/login')
            }
        }
    },[user])
    
  return children
}

export default IsBlocked
