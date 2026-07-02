import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";

export const createCourse = async (req,res) =>{
    try {
        const {title,category,level} = req.body;
        if( !title || !category || !level){
            return res.status(400).json({message: "Title, Level and Category is required"});
        }
        const course = await Course.create({
            title,
            category,
            level,
            creator: req.userId
        });
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({message:`createCourse error ${error}`});
    }
}

export const getPublishedCourses = async(req,res) =>{
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews");

        return res.status(201).json(courses);
    } catch (error) {
        return res.status(500).json({message:`failed to get isPublished Courses ${error}`});
    }
}

export const getCreatorCourses = async(req,res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({creator:userId}).populate("lectures");


        return res.status(201).json(courses);
    } catch (error) {
        return res.status(500).json({message:`failed to get Creator Courses ${error}`});
    }
}

export const editCourse = async(req,res) => {
    try {
        const {courseId} = req.params;
        const {title,subTitle,description,category,level,price,isPublished} = req.body;

        
        if(category==="")
        {
            return res.status(500).json({message:"Category is not set"});
        }
            
        if(level==="")
            {
            return res.status(500).json({message:"Course level is not set"});
        }

        let thumbnail;
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path);
        }

        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message: "Courses are not found"});
        }

        const updateData = {title,subTitle,description,category,level,price,isPublished};

        if(thumbnail){
            updateData.thumbnail = thumbnail;
        }

        course = await Course.findByIdAndUpdate(courseId, updateData ,{new:true}).populate("lectures");

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:`failed to edit Course ${error}`});
    }
}

export const getCourseById = async(req,res)=>{
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId).populate("lectures");
        if(!course){
            return res.status(400).json({message:"Course is not found"});
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:`failed to get Course by id ${error}`});
    }
}

export const removeCourse = async (req,res) =>{
    try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId);

        if(!course){
            return res.status(400).json({message:"Course is not found"});
        }

        course = await Course.findByIdAndDelete(courseId,{new:true});

        return res.status(200).json({message:"Course removed"});
    } catch (error) {
        return res.status(500).json({message:`failed to delete Course by id ${error}`});
    }
}


// lecture logic

export const createLecture = async(req,res)=>{
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId)
        {
            return res.status(400).json({message:"lectureTitle and courseId is required"});
        }

        
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"Course not found"});
        }
        
        const lecture = await Lecture.create({lectureTitle});

        course.lectures.push(lecture._id);

        await course.save();
        await course.populate("lectures");

        return res.status(201).json({lecture,course});

    } catch (error) {
        console.log("CREATE LECTURE ERROR:");
        console.log(error);

        return res.status(500).json({
            message:error.message
        });
    }
}

export const getCourseLecture = async(req,res) =>{
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(400).json({message:"Course is not found"});
        }

        await course.populate("lectures");
        // await course.save();

        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({message:`failed to getCourseLecture ${error}`});
    }
}

export const editLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        const {lectureTitle, isPreviewFree} = req.body;

        const lecture = await Lecture.findById(lectureId);

        if(!lecture){
            return res.status(400).json({message:"Lecture is not found"});
        }

        let videoUrl;
        //upload video on Clodinary
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl=videoUrl;
        }

        if(lectureTitle){
            lecture.lectureTitle = lectureTitle;
        }

        // since isPreviewFree may have false value then the if condition will not be executed
        if(isPreviewFree !== undefined){
            lecture.isPreviewFree = isPreviewFree;
        }

        await lecture.save();

        return res.status(201).json(lecture);
    } catch (error) {
        return res.status(500).json({message:`failed to editLecture ${error}`});
    }
}

export const removeLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({message:"Lecture is not found"});
        }

        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        );

        return res.status(200).json({message:"Lecture Removed"});
    } catch (error) {
        return res.status(500).json({message:`failed to removeLecture ${error}`});
    }
}

// get Creator

export const getCreatorById = async(req,res)=>{
    try {
        const {userId} = req.body;

        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User is not Found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:`failed to getCreatorById ${error}`});
    }
}