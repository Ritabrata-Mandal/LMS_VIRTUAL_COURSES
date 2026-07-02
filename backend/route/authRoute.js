import express from 'express'
import { googleLogin, googleSignUp, logIn, logOut, resetPassword, sendOTP, signUp, verifyOTP } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup',signUp);
authRouter.post('/login',logIn); // since data is being post to server
authRouter.get('/logout',logOut);
authRouter.post('/sendotp',sendOTP);
authRouter.post('/verifyotp',verifyOTP);
authRouter.post('/resetpassword',resetPassword);
authRouter.post('/googlesignup',googleSignUp);
authRouter.post('/googlelogin',googleLogin);


export default authRouter