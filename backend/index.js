import express from 'express'

import dotenv from 'dotenv'

import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors'
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import paymentRouter from './route/paymentRoute.js';
import  reviewRouter  from './route/reviewRoute.js';

dotenv.config();

const PORT=process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(cookieParser());

//Cross-Origin Resource Sharing
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// 'credentials: true' tells the browser:
// "This cross-origin request is allowed to send and receive credentials."
// Credentials include:
// Cookies 
// Authorization headers
// TLS client certificates (rare)

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/course',courseRouter);
app.use('/api/order',paymentRouter);
app.use('/api/review',reviewRouter);

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

app.listen(PORT,()=>{
    console.log('SERVER STARTED')
    connectDB();
})