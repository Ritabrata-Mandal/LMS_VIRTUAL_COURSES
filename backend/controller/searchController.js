import Course from "../model/courseModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();



export const searchWithAi = async(req,res)=>{
    try {
       const {input} = req.body;
       if(!input){
            return res.status.json({message:"Search query is required"});
       }

       const ai = new GoogleGenAI({
         apiKey:process.env.GEMINI_API_KEY
       });

       

       let courses = await Course.find({
        isPublished:true,
        $or : [
            {title : {$regex : input , $options : 'i'}},
            {subTitle : {$regex : input , $options : 'i'}},
            {description : {$regex : input , $options : 'i'}},
            {category : {$regex : input , $options : 'i'}},
            {level : {$regex : input , $options : 'i'}}
        ]
       });


       if(courses.length > 0){
            return res.status(200).json(courses);
       }

       else{
            const prompt = `Return ONLY one suitable  keyword from after reading the query:

            App Development
            AI/ML
            AI Tools
            Data Science
            Data Analytics
            Ethical Hacking
            UI UX Designing
            Web Development
            Others
            Beginner
            Intermediate
            Advanced

            AWS belongs to AI Tools.

            Query:
            ${input}`

        const response = await ai.models.generateContent({
                model: "gemini-3.5-flash",
                contents: prompt,
            });

            console.log(response);

            const keyword = response.text.trim();

            console.log("Keyword:", keyword);

            courses = await Course.find({
            isPublished:true,
            $or : [
                {title : {$regex : keyword, $options : 'i'}},
                {subTitle : {$regex : keyword, $options : 'i'}},
                {description : {$regex : keyword, $options : 'i'}},
                {category : {$regex : keyword, $options : 'i'}},
                {level : {$regex : keyword, $options : 'i'}}
            ]
        });

        return res.status(200).json(courses);
       }

    } catch (error) {
        if (error.status === 429) {
        return res.status(429).json({
            message: "AI search quota exceeded. Please try again in a minute."
        });
    }

        return res.status(500).json({
            message: error.message
        });
    }
}