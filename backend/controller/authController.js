import User from '../model/userModel.js'

import genToken from '../config/token.js'

import validator from 'validator'

// import cookie from 'cookie-parser'

import bcrypt from 'bcryptjs'
import sendMail from '../config/sendMail.js'


export const signUp=async(req,res)=>{
    try{
        const { name,password,email,role }= req.body;

        if(!name || !password || !email || !role)
        {
            return res.status(400).json({
                message:"Enter all the necessary fields"
            })
        }

        if(!validator.isEmail(email))
        {
            return res.status(400).json({
                message:"Invalid Email Format"
            })
        }

        let existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        if(password.length<8)
        {
            return res.status(400).json({
                message:"Enter strong password of at least 8 length"
            })
        }

        //encrypt password
        let hashPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashPassword,
            role,
        })

        let token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        // res.cookie() is an Express method used to send a cookie from the server to the client's browser.

        // Syntax
        // res.cookie(name, value, options);

        //Store a cookie named "token" with value = token


        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message: `SignUp Error: ${error}`
        });
    }
}

export const logIn = async (req,res)=>{
    try{
        const {email,password} = req.body;

        let user=await User.findOne({email}).populate("enrolledCourses");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        let isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res.status(400).json({message:"password incorrect"});
        }

        let token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User Logged in successfully",
            user
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message: `LogIn Error: ${error}`
        });
    }
}

export const logOut = async(req,res)=>{
    try{
        await res.clearCookie("token");
        return res.status(201).json({
            message: "User Logged out successfully",
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message: `LogOut Error: ${error}`
        });
    }
}

export const sendOTP = async(req,res)=>{
    try{
        const {email}=req.body;
        const user= await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const otp= Math.floor(1000 + Math.random()*9000).toString();

        user.resetOtp=otp;
        user.otpExpires=Date.now() + 5*60*1000;
        user.isOtpVerified=false;

        await user.save();
        await sendMail(email,otp);
        return res.status(200).json({message:"OTP sent successfully"});
    }
    catch(error){
        return res.status(500).json({
            message: `sendOTP Error: ${error}`
        });
    }
}

export const verifyOTP = async (req,res)=>{
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({email});

        if(!user || user.resetOtp != otp  || user.otpExpires < Date.now()){
            return res.status(404).json({message:"Invalid OTP"})
        }


        user.resetOtp = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified=true;

        await user.save();
        return res.status(200).json({message:"OTP verified successfully"});

    } catch (error) {
        return res.status(500).json({
            message: `verifyOTP Error: ${error}`
        });
    }
}

export const resetPassword = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(404).json({message:"OTP verification is required"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        user.password=hashPassword;
        user.isOtpVerified=false;

        await user.save();
        return res.status(200).json({message:"Reset password successfully"})
    } catch (error) {
        return res.status(500).json({
            message: `resetPassword Error: ${error}`
        });
    }
}

export const googleSignUp = async(req,res)=>{
    try {
        const { name, email, role} = req.body;
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                role,
            })
        }

        else{
            return res.status(400).json({
                message:"User already exists ---- Go to Login"
            })
        }

        let token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        

        return res.status(201).json({
            message: "User Logged in successfully",
            user
        });
    } 
    catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `googleAuth Error: ${error}`
        });
    }
}

export const googleLogin = async(req,res)=>{
    try {
        const { name, email, role} =req.body;
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Sign Up first"
            })
        }

        let token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        

        return res.status(201).json({
            message: "User Logged in successfully",
            user
        });
    } 
    catch (error) {
        console.log(error);

        return res.status(500).json({
            message: `googleAuth Error: ${error}`
        });
    }
}