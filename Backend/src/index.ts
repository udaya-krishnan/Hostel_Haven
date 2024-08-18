import express from 'express'
import { connectDatabase } from './infrastructure/database/Database'
import userRouter from './presentation/routes/AuthRoute'
import cors from 'cors'
import cookieSession from 'cookie-session';
import { Session } from './utils/session'
import dotenv from "dotenv"
dotenv.config()

const app=express()


app.use(express.json())
app.use(cors())
app.use(Session())

app.use('/',userRouter)

connectDatabase()
app.listen(3000,()=>{
    console.log('server is running on port 3000')
}) 