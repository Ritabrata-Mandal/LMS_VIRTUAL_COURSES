import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";


const Nav = () => {

    const {userData} = useSelector(state=>state.user);
    console.log("userData =", userData);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [show,setShow]=useState(false);
    const [showHam,setShowHam]=useState(false);

    const handleLogOut = async()=>{
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true});
            dispatch(setUserData(null));
            console.log(result.data);
            toast.success("Logout successful");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div>
        <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>

            {/* conatins logo */}
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                <img src={logo} alt="" className='w-[60px] rouneded-[5px] border-2 border-white cursor-pointer' />
            </div>

            <p className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-400 hidden lg:block">
                Developed by Ritabrata Mandal (CSE, NIT Durgapur)
            </p>

            {/* user buttons */}
            <div className='w-[30%] lg:flex items-center justify-center gap-4 relative hidden'>

                {/* user icon when not logged in*/}
                { !userData  && <IoPersonCircle   className='w-[60px] h-[60px] fill-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}/>}

                {/* user icon when logged in*/}
                { userData && (userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}/> :  <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}>
                    {userData?.name?.slice(0,1).toUpperCase()}
                </div>)}


                {/* Dashboad */}
                {  userData?.role === "educator"   && <div className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate('/dashboard')}>Dashboard</div>}


                {/* Login option */}
                {/* LogOut option */}
                {!userData ? <span className='px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={()=>navigate('/login')}>Login</span>
                    :
                <span className='px-[20px] py-[10px] border-2 text-black bg-white rounded-[10px] shadow-sm shadow-black text-[18px] font-light cursor-pointer' onClick={handleLogOut}>LogOut</span>}

                { show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white hover:bg-black'>
                    {/* My profile part - large screen */}
                    <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer' onClick={()=>navigate('/profile')}>My Profile</span>

                    <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 cursor-pointer' onClick={()=>navigate("/mycourses")}>My Courses</span>
                </div>}

            </div>

            <RxHamburgerMenu color='white' className='w-[35px] h-[35px] lg:hidden fill-black cursor-pointer' onClick={()=>setShowHam(prev=>!prev)}/>

            {/* Black tinted screen */}
            <div className={`fixed left-0 top-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}>

                    {/* Cross icon to remove the black tinted part */}
                    <RxCross1 color="white" className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%] cursor-pointer' onClick={()=>setShowHam(prev=>!prev)}/>

                    {/* user icon when not logged in*/}
                    { !userData  && <IoPersonCircle className='w-[80px] h-[80px] cursor-pointer fill-white'/>}

                    {/* user icon when logged in*/}
                    { userData && (userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[75px] h-[75px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer object-cover'/>: <div className='w-[70px] h-[70px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' >
                        {userData?.name?.slice(0,1).toUpperCase()}
                    </div>)}

                    {/* My profile */}
                    <div className='w-[200px] h-[65px]  border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer flex items-center justify-center' onClick={()=>navigate('/profile')}>My Profile</div>

                    {/* My courses */}
                    <div className='w-[200px] h-[65px]  border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer flex items-center justify-center' onClick={()=>navigate("/mycourses")}>My Courses</div>

                    {/* Dashboard */}
                    <div className='w-[200px] h-[65px]  border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer flex items-center justify-center' onClick={()=>navigate('/dashboard')}>Dashboard</div>

                    {/* Login and Logout part of black tinted screen */}
                    {!userData ? <span className='w-[200px] h-[65px]  border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer flex items-center justify-center' onClick={()=>navigate('/login')}>Login</span>
                            :
                    <span className='w-[200px] h-[65px]  border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer flex items-center justify-center' onClick={handleLogOut}>LogOut</span>}

            </div>

        </div>
    </div>
  )
}

export default Nav