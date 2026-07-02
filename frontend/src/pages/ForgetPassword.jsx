import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";


const ForgetPassword = () => {

  //for eye logic for password
  const [show1,setShow1]=useState(false);
  const [show2,setShow2]=useState(false);

  const [step,setStep] = useState(1);
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [OTP,setOTP] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confPassword,setConfPassword] = useState("");
  const [loading,setLoading] = useState(false);

  //step 1
  const sendOTP = async () =>{
    setLoading(true);
    try {
      const result = await axios.post(
            serverUrl + "/api/auth/sendotp",
            { email },
            { withCredentials: true }
        );
        console.log(result.data);
        setLoading(false);
        setStep(2);
        toast.success(result.data.message);
    } 
    
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }


  //step 2
  const verifyOTP = async()=>{
    setLoading(true);
    try {
      const result = await axios.post(
            serverUrl + "/api/auth/verifyotp",
            { email,otp:OTP },
            { withCredentials: true }
        );
        console.log(result.data);
        setLoading(false);
        setStep(3);
        toast.success(result.data.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setLoading(false);
    }
  }

  //step 3
  const resetPassword = async()=>{
    if( newPassword !== confPassword){
      return toast.error("Confirmed password does not match with new password");
    }

    setLoading(true);
    try {
      const result = await axios.post(
            serverUrl + "/api/auth/resetpassword",
            { email, password:newPassword },
            { withCredentials: true }
        );
        console.log(result.data);
        setLoading(false);
        navigate("/login");
        toast.success(result.data.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setLoading(false);
    }
  }
  
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {/* step 1 */}
      { step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>

        <form action="" className='space-y-4' onSubmit={(e)=>{e.preventDefault()}}>
          <div>
            {/* display: block; */}
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter your email address</label>
            
            <input id="email" type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='you@example.com' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>

          <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={sendOTP}
          >{loading ? <ClipLoader size={27} color='white'/> :"Send OTP"}</button>
        </form>


        <div className=' text-center mt-4 text-sm cursor-pointer' onClick={()=>{navigate('/login')}}>Back to Login</div>

      </div>}

      {/* step 2 */}
      { step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>

        <form action="" className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
          <div>
            {/* display: block; */}
            <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please enter the 4 digit code sent to your email</label>

            <input id="otp" type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='* * * *' required onChange={(e)=>setOTP(e.target.value)} value={OTP}/>
          </div>

          <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={verifyOTP}
          >{loading ? <ClipLoader size={27} color='white'/> :"Verify OTP"}</button>
        </form>


        <div className=' text-center mt-4 text-sm cursor-pointer' onClick={()=>{navigate('/login')}}>Back to Login</div>

      </div>}

      {/* step 3 */}
      { step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>

        <p className='text-sm text-gray-500 text-center mb-6'>Enter a new password to regain acess to your account</p>

        <form action="" className='space-y-4' onSubmit={(e)=>e.preventDefault()}>
          {/* New Password */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative left-[9%]'>
            {/* display: block; */}
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>New Password</label>

            <input id="password" type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='**********' required onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}  type={ show1 ?  "text" : "password"}/>

            {!show1 ? <FaRegEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[9%] bottom-[14%]'
            onClick={()=>setShow1(prev=>!prev)} /> :
            <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow1(prev=>!prev)} 
            />}
          </div>


          {/* Confirm Password */}
          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative left-[10%]'>
            {/* display: block; */}
            <label htmlFor="confpassword" className='block text-sm font-medium text-gray-700'>Confirm Password</label>

            <input id="confpassword" type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder='**********' required onChange={(e)=>setConfPassword(e.target.value)} value={confPassword}  type={ show2 ?  "text" : "password"}/>

            {/* Password eye logic */}
            {!show2 ? <FaRegEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[9%] bottom-[14%]'
            onClick={()=>setShow2(prev=>!prev)} /> :
            <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow2(prev=>!prev)} 
            />}
          </div>

          <button className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={resetPassword}
          >{loading ? <ClipLoader size={27} color='white'/> :"Reset Password"}</button>
        </form>


        <div className=' text-center mt-4 text-sm cursor-pointer' onClick={()=>{navigate('/login')}}>Back to Login</div>

      </div>}

    </div>
  )
}

export default ForgetPassword