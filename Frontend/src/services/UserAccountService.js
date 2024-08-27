import axios from 'axios'
import { EDIT_PROFILE, PROFILE_UPLOAD } from '../features/User/auth/authTypes';

const API_URL='http://localhost:3000';

const editProfile=async(values)=>{
    const response=await axios.post(API_URL+EDIT_PROFILE,{values},{withCredentials:true})
    return response.data
}

const uploadPhoto=async(file,email)=>{
    console.log(file,email,"from service");
    
    const formData=new FormData()
    formData.append('file',file)
    formData.append('email',email)

    const response=await axios.post(API_URL+PROFILE_UPLOAD,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

    return response.data
}

const AccountService={
    editProfile,
    uploadPhoto
}

export default AccountService