import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { serverUrl } from '../../App';
import { FaEdit } from "react-icons/fa";
import { setCreatorCourseData,setCourseData } from "../../redux/courseSlice";

const CreateLecture = () => {

    const navigate = useNavigate();
    const {courseId} = useParams(); 
    const [lectureTitle,setLectureTitle] = useState("");
    const[loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {lectureData} = useSelector(state=>state.lecture);

    const handleCreateLecture = async()=>{
        setLoading(true);
        try {
            console.log("Data.....")
            const result = await axios.post(serverUrl+`/api/course/createlecture/${courseId}`,{lectureTitle},{withCredentials:true});

            
            console.log("RETRIEVED")
            console.log(result.data);
            console.log("SHOWN");
            
            dispatch(setLectureData([...lectureData,result.data.lecture]));

            const res = await axios.get(
                serverUrl + "/api/course/getcreator",
                { withCredentials: true }
            );
            
            dispatch(setCreatorCourseData(res.data));

            const published = await axios.get(
                serverUrl + "/api/course/getpublished",
                { withCredentials: true }
            );

            dispatch(setCourseData(published.data));

            setLoading(false);
            toast.success("Lecture Added");
            setLectureTitle("");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }


    //fetch all the lectures corresponding to the course
    useEffect(()=>{
        const getCourseLecture = async()=>{
            try {
                const result = await axios.get(serverUrl+`/api/course/courselecture/${courseId}`,{withCredentials:true});
                console.log(result.data);

                // console.log("lectureData =", lectureData);
                // console.log("isArray =", Array.isArray(lectureData));

                dispatch(setLectureData(result.data.lectures));
            } catch (error) {
                console.log(error);
            }
        }

        getCourseLecture();
    },[])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
            {/* header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
                    Let's add a lecture
                </h1>
                <p className='text-sm text-gray-500'>Enter the title and add your video lectures to enhance your course content.</p>
            </div>

            {/* Input Area */}
            <input type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g. Introduction MERN Stack' onChange={(e)=>setLectureTitle(e.target.value)} value={lectureTitle}/>

            {/* Button */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium' onClick={()=>navigate(`/editcourse/${courseId}`)}><FaArrowLeftLong/>Back to Course</button>
                <button className='px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-medium shadow' onClick={handleCreateLecture} disabled={loading}>{loading ? <ClipLoader size={27} color='white'/> :"+ Create Lecture"}</button>
            </div>

            {/* lecrure list */}
            <div className='space-y-2'>
                {
                    lectureData?.map((lecture,idx)=>{
                        return(<div key={idx} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>

                            <span>{idx+1} : {lecture.lectureTitle}</span>

                            <FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>    

                        </div>)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default CreateLecture