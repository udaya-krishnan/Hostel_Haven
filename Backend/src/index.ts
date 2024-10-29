import express from 'express'
import { Request,Response,NextFunction } from 'express'
import { connectDatabase } from './infrastructure/database/Database'
import userRouter from './presentation/routes/User/AuthRoute'
import cors from 'cors'
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { Session } from './utils/session'
import dotenv from "dotenv"
// import './types/express';
import http, { createServer } from 'http'
import { configSocketIo } from './config/Socket'
import hostRouter from './presentation/routes/Host/HostAuthRoutes';
import adminRoute from './presentation/routes/Admin/AdminAuthRoutes';
dotenv.config()

const app=express()

const server = createServer(app);
configSocketIo(server);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cors({
    origin:'https://hostel-haven.vercel.app',
    credentials:true
}))
app.use(cookieSession({
    name: "session",
    keys: ["your-secret-key"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))


app.use('/',userRouter)
app.use('/host',hostRouter)
app.use('/admin',adminRoute)

connectDatabase()
server.listen(3000,()=>{
    console.log('server is running on port 3000')
}) 