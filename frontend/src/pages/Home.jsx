import React from 'react'
import Nav from '../component/Nav'
import home from '../assets/home1.jpg'
import student1 from '../assets/student1.png'
import student2 from '../assets/student2.png'
import student3 from '../assets/newbg.png'
import { SiViaplay } from "react-icons/si";
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About'
import Footer from '../component/Footer'
import ReviewPage from '../component/ReviewPage'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
        <img src={home} alt=""  className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'/>

        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow Your Skills to Advance</span>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Your Career path</span>
        
        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex justify-center items-center gap-3 flex-wrap'>
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate('/allcourses')}><p className='mt-[2px]'>View All Courses</p>
          </button>

          <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] txet-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate('/search')}><p className='mt-1  font-semibold ai-text'>Search with AI ✨</p>
          </button>


          {/* <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate('/allcourses')}><p className='mt-[2px]'>View All Courses</p> <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black'/>
          </button>

          <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] txet-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate('/search')}><p className='mt-1'>Search with AI</p> <img src={ai} alt=""  className='h-[30px] h-[30px] rounded-full rounded-full hidden lg:block'/>
          <img src={ai1} alt=""  className='h-[35px] h-[35px] rounded-full rounded-full lg:hidden'/>
          </button> */}

        </div>
      </div>
      <Logos/>
      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
    </div>
  )
}

export default Home