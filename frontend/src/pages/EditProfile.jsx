import React from 'react'
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {
    const navigate = useNavigate();
    const {userData} = useSelector(state=>state.user);
    const [name,setName] = useState(userData.name || "");
    const [description,setDescription] = useState(userData.description || "");
    const [photoUrl,setPhotoUrl] = useState(null);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    
    const handleEditProfile = async ()=>{

        console.log("DESCRIPTION BEFORE SEND =", description);

        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("photoUrl",photoUrl);
        
        setLoading(true);

        try {
            const result = await axios.post( serverUrl + "/api/user/profile" , formData , {withCredentials:true} );

            console.log("RESULT =", result.data);

            
            dispatch(setUserData(result.data));

            setLoading(false);
            navigate("/");
            toast.success("Profile Updated");

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>

        {/* Profile section */}
        <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>

            {/* Return arrow */}
            <FaArrowLeft className='absolute top-[5%] left-[5%] h-[22px] w-[22px] cursor-pointer' onClick={()=>{navigate('/profile')}}/>

            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>

            <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                <div className='flex flex-col items-center text-center'>
                    {  
                        userData?.photoUrl ?  <img src={userData?.photoUrl} alt="" className='w-24 h-24 object-cover rounded-full border-4 border-black'/> : <div className='h-24 w-24 text-white text-[30px] rounded-full flex justify-center items-center border-2 bg-black border-white'>
                        {userData?.name.slice(0,1).toUpperCase()}
                        </div>
                    }
                </div>


                {/* Profile image selection */}
                <div>
                    {/* accept='image/* -> means only images can be selecte from file explorer */}
                    <label htmlFor="image" className='text-sm font-medium text-gray-700'>Select Avatar</label>

                    <input id='image' type="file" name="photoUrl" placeholder='photoUrl' accept='image/*'  className='w-full px-4 py-2 border rounded-md text-sm' onChange={(e)=>setPhotoUrl(e.target.files[0])}/>
                </div>

                {/* User name */}
                <div>
                    <label htmlFor="name" className='text-sm font-medium text-gray-700'>User Name</label>

                    <input id='name' type="text" placeholder={userData?.name}  className='w-full px-4 py-2 border rounded-md text-sm' onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>

                {/* Email */}
                <div>
                    <label className='text-sm font-medium text-gray-700'>User Name</label>

                    <input readOnly type="text" placeholder={userData?.email}  className='w-full px-4 py-2 border rounded-md text-sm'/>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor='description' className='text-sm font-medium text-gray-700'>Bio</label>

                    <textarea name='description' placeholder="Tell us about yourself"
                    rows={3} 
                    className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black' onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>

                <button className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer' onClick={handleEditProfile} disabled={loading}>{  loading ? <ClipLoader size={27} color='white'/>  : "Save changes"}</button>

            </form>
        </div>
    </div>
  )
}

export default EditProfile