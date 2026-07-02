import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from "../App.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice.js'

const getCreatorCourse = () => {

    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user);

    useEffect(()=>{
        const creatorCourses=async()=>{
            try{
                const result = await axios.get(serverUrl + "/api/course/getcreator",{withCredentials:true});

                dispatch(setCreatorCourseData(result.data));
                console.log("creatorCourseData:", result.data);
            }
            catch(error){
                console.log(error);
                dispatch(setCreatorCourseData(null));
            }
        }

        creatorCourses();
    },[userData]);
}

export default getCreatorCourse