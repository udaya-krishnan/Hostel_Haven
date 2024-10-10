import axios from "axios";
import { CONNECT_HOST, FETCH_CONNECT, FETCH_HOST } from "../features/User/auth/authTypes";

const API_URL = "http://localhost:3000";

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

const fetchHost = async (hostId) => {
  try {
    const response = await axios.get(
      `${API_URL}${FETCH_HOST}?hostId=${hostId}`,
      { withCredentials: true }
    );
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

const ChatService = {
  connectHost,
  fetchHost,
  fetchConnection
};

export default ChatService;
