import axios from "axios";
import { FETCH_AMENITIES ,FETCH_SAFETY} from "../features/Host/auth/authTypes";
const API_URL='http://localhost:3000';


const fetchamenities=async()=>{
    const response =await axios.get(API_URL+FETCH_AMENITIES)
    return response.data
}

const fetchsafety=async()=>{
    const response=await axios.get(API_URL+FETCH_SAFETY)
    return response.data
}



const AddPropertyService={
    fetchamenities,
    fetchsafety
}

export default AddPropertyService
