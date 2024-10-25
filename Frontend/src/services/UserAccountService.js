import axios from 'axios'
import { CHANGE_PASS, EDIT_PROFILE, FETCH_NOTIFICATIONS, PROFILE_UPLOAD } from '../features/User/auth/authTypes';

const API_URL='http://localhost:3000';

const editProfile = async (values) => {
    try {
      const response = await axios.put(API_URL + EDIT_PROFILE, { values }, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error in editProfile:", error.message);
      throw error;  
    }
  };
  

  const uploadPhoto = async (file, email) => {
    try {
      console.log(file, email, "from service");
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', email);
  
      const response = await axios.patch(API_URL + PROFILE_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
        
      });
  
      return response.data;
    } catch (error) {
      console.error("Error in uploadPhoto:", error.message);
      throw error;  
    }
  };
  
  
  const changePassword = async (password, email) => {
    try {
      const response = await axios.patch(API_URL + CHANGE_PASS, { password, email }, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error in changePassword:", error.message);
      throw error;  
    }
  };


    
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL + FETCH_NOTIFICATIONS, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error in changePassword:", error.message);
      throw error;  
    }
  };





  

const AccountService={
    editProfile,
    uploadPhoto,
    changePassword,
    fetchNotifications
}

export default AccountService