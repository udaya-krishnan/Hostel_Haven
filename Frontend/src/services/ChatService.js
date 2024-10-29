import axios from "axios";
import { CONNECT_HOST, FETCH_CONNECT, FETCH_HOST, FETCH_USER_MESSAGE } from "../features/User/auth/authTypes";
import { CONNECT_USER, FETCH_HOST_MESSAGE, FETCH_HOSTCONNECTION } from "../features/Host/auth/authTypes";

const API_URL = 'https://hostelhaven.site';

const connectHost = async (userId, hostId, data) => {
  try {
    const response = await axios.post(
      API_URL + CONNECT_HOST,
      { userId, hostId, data },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchHost = async (hostId,userId) => {
  try {
    const response = await axios.get(
      `${API_URL}${FETCH_HOST}?hostId=${hostId}&&userId=${userId}`,
      { withCredentials: true }
    );

    console.log(response.data,"it from the service");
    
    return response.data;
  } catch (error) {
    throw error;
  }
};


const fetchConnection = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}${FETCH_CONNECT}?userId=${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  const fetchHostConnection = async (hostId) => {
    try {
      const response = await axios.get(
        `${API_URL}${FETCH_HOSTCONNECTION}?hostId=${hostId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  const connectUser = async (userId, hostId, data) => {
    try {
      const response = await axios.post(
        API_URL + CONNECT_USER,
        { userId, hostId, data },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserMessages=async(hostId,userId)=>{
    try {
      const response=await axios.get(`${API_URL}${FETCH_USER_MESSAGE}?hostId=${hostId}&&userId=${userId}`,{withCredentials:true})
      return response.data
    } catch (error) {
      throw error
    }
  }

  const fetchHostMessages=async(hostId,userId)=>{
    try {
      const response=await axios.get(`${API_URL}${FETCH_HOST_MESSAGE}?hostId=${hostId}&&userId=${userId}`,{withCredentials:true})
      return response.data
    } catch (error) {
      throw error
    }
  }

const ChatService = {
  connectHost,
  fetchHost,
  fetchConnection,
  fetchHostConnection,
  connectUser,
  fetchUserMessages,
  fetchHostMessages
};

export default ChatService;
