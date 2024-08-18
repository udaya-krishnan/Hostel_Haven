import cookieSession from 'cookie-session';
import dotenv from "dotenv"

dotenv.config()

export const Session=()=>{
    return  cookieSession({
        name: 'session',
        keys: [process.env.SESSION_SECRET!], // Use your secret key here
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })
}


