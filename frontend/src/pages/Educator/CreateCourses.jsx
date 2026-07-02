import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { addCourse, setCreatorCourseData } from '../../redux/courseSlice';

const CreateCourses = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [loading,setLoading] = useState(false);
  const [level,setLevel] = useState("");
  const dispatch = useDispatch();


  const handleCreateCourse = async()=>{
    setLoading(true);
    try {
      const result = await axios.post( serverUrl + '/api/course/create' , {title,category,level} , {withCredentials:true});

      console.log(result.data);

      dispatch(addCourse(result.data));

      setLoading(false);
      navigate('/courses');
      toast.success("Course created");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>

        <FaArrowLeftLong className='top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate('/courses')}/>

        <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>

        <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
            <input type="text" id='title' placeholder='Enter Course title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black' onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>

          {/* for level */}
            <div>

              <label type="text" htmlFor='level' className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select id="level" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black' onChange={(e)=>setLevel(e.target.value)} value={level}>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>

            <select id="category" className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black' onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>

            <button className='w-full mt-5 bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' disabled={loading} onClick={handleCreateCourse}>{ loading ? <ClipLoader size={27} color='white'/> : "Create"}</button>
          </div>
        </form>

      </div>
   
    </div>
  )
}

export default CreateCourses