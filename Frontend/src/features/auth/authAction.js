import AuthService from "../../services/AuthService";

export const register=(name,email,password)=>async()=>{
    const data=await AuthService.register(name,email,password)
    return data
    
}