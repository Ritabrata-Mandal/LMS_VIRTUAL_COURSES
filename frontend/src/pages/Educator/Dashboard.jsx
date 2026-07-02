import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const Dashboard = () => {
    const {userData} = useSelector(state=>state.user);
    const navigate = useNavigate();
    const{creatorCourseData} = useSelector(state=>state.course);


    const CourseProgressData = creatorCourseData?.map((course)=>({
        name: course.title?.slice(0,10) + "...",
        fullName: course.title,
        lectures: course.lectures?.length || 0,
    })) || [];

    const EnrollData = creatorCourseData?.map((course)=>({
        name: course.title?.slice(0,10) + "...",
        fullName: course.title,
        enrolled: course.enrolledStudents?.length || 0,
    })) || [];

    const totalEarning = creatorCourseData?.reduce((sum,course)=>{
        const StudentCount = course.enrolledStudents?.length || 0;
        const courseRevenue = course.price ? course.price * StudentCount : 0;

        return sum + courseRevenue
    },0) || 0; 

    const CustomTooltip1 = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white border rounded-md shadow-md p-3">
                <p className="font-semibold">{data.fullName}</p>
                <p>Lectures: {data.lectures}</p>
            </div>
        );
    }

        return null;
    };


    const CustomTooltip2 = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white border rounded-md shadow-md p-3">
                <p className="font-semibold">{data.fullName}</p>
                <p>Enrolled Students: {data.enrolled}</p>
            </div>
        );
    }

        return null;
    };

  return (
    <div className='flex min-h-screen bg-gray-100'>
        <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>

            {/* main section */}
            <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 relative'>

                <FaArrowLeftLong className='w-[22px] h-[22px] top-3 left-5 absolute cursor-pointer z-50' onClick={()=>navigate('/')}/>

                {/* Profile image */}
                {  
                    userData?.photoUrl ?  <img src={userData?.photoUrl} alt="" className='w-28 h-28 object-cover rounded-full border-4 border-black shadow-md ml-7'/> : <div className='h-28 w-28 text-white text-[30px] rounded-full flex justify-center items-center border-2 bg-black border-white ml-7'>
                    {userData?.name.slice(0,1).toUpperCase()}
                    </div>
                }

                {/* Educator realted info */}
                <div className='text-center md:text-left space-y-1'>
                    <h1 className='text-2xl font-bold text-gray-800'>Welcome , {userData?.name || "Educator"} 👋</h1>

                    <h1 className='text-xl font-semibold text-gray-800'>Total Earning : ₹{totalEarning.toLocaleString()}</h1>

                    <p className='text-gray-600 text-sm'>{userData?.description || "Start Creating Courses for Your Students"}</p>

                    <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center cursor-pointer' onClick={()=>navigate("/courses")}>Create Courses</h1>
                </div>
            </div>

            {/* graph section */}
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>

                {/* for course progress graph */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <h2 className='text-lg font-semibold mb-4'>Course Stats (Number of Lectures)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={CourseProgressData}>
                            <CartesianGrid  strokeDasharray="3 3"/>
                            <XAxis dataKey="name" interval={0} angle={-45}
                            textAnchor="end"
                            height={80}/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip1 />}/>
                            <Bar dataKey="lectures" fill='black' radius={[5,5,0,0]}/>
                        </BarChart>

                    </ResponsiveContainer>
                </div>

                {/* enrolled data */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <h2 className='text-lg font-semibold mb-4'>Enrolled Student Stats (Number of Students Enrolled in a Course)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={EnrollData}>
                            <CartesianGrid  strokeDasharray="3 3"/>
                            <XAxis dataKey="name" interval={0} angle={-45}
                            textAnchor="end"
                            height={80}/>
                            <YAxis/>
                            <Tooltip content={<CustomTooltip2 />}/>
                            <Bar dataKey="enrolled" fill='black' radius={[5,5,0,0]}/>
                        </BarChart>

                    </ResponsiveContainer>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Dashboard