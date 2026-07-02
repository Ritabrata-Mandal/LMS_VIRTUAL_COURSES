import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import goole from '../assets/google.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from 'react-spinners'
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { auth, provider } from '../utils/firebase';
import {signInWithPopup} from 'firebase/auth'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Login = () => {

  //usestate
    const [show,setShow]=useState(false);
    const [name,setName] = useState("");  
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const login=async ()=>{
      try{
        setLoading(true);

        const result=await axios.post(serverUrl + '/api/auth/login' , {email,password}, {withCredentials:true});

        console.log(result.data);
        dispatch(setUserData(result.data.user));
        setLoading(false);
        navigate('/');

        //login success toast
        toast.success("Login successful");
      }
      catch(error){
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message)
      }

    }

    //GOOGLE Log In
    const googleLogin = async()=>{
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

            const result = await axios.post(serverUrl + '/api/auth/googlelogin' , {email,name}, {withCredentials: true});

            dispatch(setUserData(result.data.user));

            navigate('/');

            //show notification
            toast.success("Logged in successfully")
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


  return (
  <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form action="" className='w-[90%] md:w-200 h-150  bg-white shadow-xl rounded-2xl flex relative' onSubmit={(e)=>e.preventDefault()}>
              <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
              {/*Left Div*/}
              <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
  
                  <div>
                      <h1 className='text-2xl text-black'>Welcome back</h1>
  
                      <h2 className='text-[#999797] text-[18px]'>Login in your account</h2>
                  </div>
  
                  {/* email */}
                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                      <label htmlFor="email" className='font-semibold'>Email</label>
                      <input id='email' type="text"  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                  </div>


                  {/* password */}
                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                      <label htmlFor="password" className='font-semibold'>Password</label>
                      <input id='password' type={ show ?  "text" : "password"}  className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
  
                      {/* Password eye logic */}
                      {!show ? <FaRegEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'
                       onClick={()=>setShow(prev=>!prev)} /> :
                      <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)} 
                      />}
  
                  </div>
                  
                  {/* Login button */}
                  <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-2' onClick={login}> 
                    { loading ? <ClipLoader size={27} color='white'/> : "Login"}
                  </button>

                  <span className='text-[13px] cursor-pointer text-[#585757]' onClick={()=>navigate("/forget")}>Forget your password ?</span>
  
                  {/* or continue part */}
                  <div className='w-[80%] flex items-center gap-2'>
                      <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                      <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
                      <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                  </div>
  
                  {/*Google login*/}
                  <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleLogin}>
                      <img src={goole} className='w-[25px]' alt="" />
                      <span className='text-gray-500 text-[18px]'>oogle</span>
                  </div>

                  <div className='text-[#6f6f6f]'>Create new account?
                    <span className='underline underline-offset-1 text-[black] ml-1 cursor-pointer'  onClick={()=>navigate("/signup")}>SignUp</span>
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

export default Login