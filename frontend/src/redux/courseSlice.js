import {createSlice} from '@reduxjs/toolkit'

const courseSlice = createSlice({
    name:"course",
    initialState:{
        creatorCourseData:null,

        //to store the data of published courses
        courseData:[],

        selectedCourse:null
    },
    reducers:{
        setCreatorCourseData:(state,action)=>{
            if (!state.creatorCourseData) {
                state.creatorCourseData = [];
            }

            state.creatorCourseData = action.payload
        },
        addCourse: (state, action) => {
            state.creatorCourseData.push(action.payload);
        },

        setCourseData: (state,action) => {
            state.courseData = action.payload;
        },
        setSelectedCourse: (state,action)=>{
            state.selectedCourse = action.payload
        }
    }
})

export const {setCreatorCourseData,addCourse,setCourseData,setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer