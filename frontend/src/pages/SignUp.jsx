import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import goole from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import {signInWithPopup} from 'firebase/auth'
import { auth, provider } from '../utils/firebase';




const SignUp = () => {

    //usestate
    const [show,setShow]=useState(false);
    const navigate=useNavigate();

    const [name,setName] = useState("");

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [role,setRole]=useState("student");

    const [loading,setLoading]=useState(false);

    const dispatch=useDispatch();


    const handleSignUp=async()=>{
    setLoading(true);
    try{
        const result=await axios.post(serverUrl + "/api/auth/signup",{name,password,email,role},{withCredentials:true});//token is stored in cookie

        console.log(result.data);
        setLoading(false);
        dispatch(setUserData(result.data.user));

        navigate('/');

        //show notification
        toast.success("Signed up successfully")
    }
    catch(error){
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message);
    }
}

//GOOGLE Sign Up
const googleSignUp = async()=>{
    try{
        const response = await signInWithPopup(auth,provider);
        console.log(response);

        // inside 'user' object returned by google auth(firebase)
        // displayName
        // : 
        // "World Cup"
        // email
        // : 
        // "cupworld258@gmail.com"

        let user=response.user;
        let name=user.displayName;
        let email=user.email;

        const result = await axios.post(serverUrl + '/api/auth/googlesignup' , {email,name,role}, {withCredentials: true});

        dispatch(setUserData(result.data.user));

        navigate('/');

        //show notification
        toast.success("Signed up successfully")
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
}

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form action="" className='w-[90%] md:w-200 h-150  bg-white shadow-xl rounded-2xl flex' onSubmit={(e)=>e.preventDefault()}>
            {/*Left Div*/}
            <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>

                <div>
                    <h1 className='text-2xl text-black'>Let's get started</h1>

                    <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
                </div>

                {/* Name */}
                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input id='name' type="text"  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name' onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>

                {/* Email */}
                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input id='email' type="text"  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>

                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input id='password' type={ show ?  "text" : "password"}  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

                    {/* Password eye logic */}
                    {!show ? <FaRegEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'
                     onClick={()=>setShow(prev=>!prev)} /> :
                    <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} 
                    />}

                </div>
                

                <div className='flex md:w-[50%] w-[70%] items-center justify-between'>

                    {/* student */}
                    <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer ${role === "student" ? "border-black border-[2.5px]" : "border-gray-300"} 
                    hover:border-black`} onClick={()=>setRole("student")}>Student</span>

                    {/* educator */}
                    <span className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer ${role === "educator" ? "border-black border-[2.5px]" : "border-gray-300"} 
                    hover:border-black`} onClick={()=>setRole("educator")}>Educator</span>
                </div>

                {/* Sign Up button */}
                {/* disable the button when it is true */}
                <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' disabled={loading} onClick={handleSignUp}>
                    {loading ? <ClipLoader size={27} color='white'/> : "Sign Up"}
                </button>


                {/* or continue section */}
                <div className='w-[80%] flex items-center gap-2'>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                    <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
                    <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                </div>

                {/*Google login*/}
                <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleSignUp}>
                    <img src={goole} className='w-[25px]' alt="" />
                    <span className='text-gray-500 text-[18px]'>oogle</span>
                </div>

                <div className='text-[#6f6f6f]'>already have an account?
                    <span className='underline underline-offset-1 text-[black] ml-1 cursor-pointer'  onClick={()=>navigate("/login")}>Login</span>
                </div>

            </div>

            {/*Right Div*/}
            <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
                <img src={logo} alt="logo" className='w-30 shadow-2xl' />
                <span className='text-2xl text-white'> VIRTUAL COURSES</span>
            </div>
        </form>
    </div>
  )
}

export default SignUp