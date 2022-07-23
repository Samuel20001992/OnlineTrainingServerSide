import express from 'express';
import mongoose from 'mongoose';

import CourseModel from '../models/course.model.js';

const router = express.Router();

export const getCourses = async (req, res) => { 
    try {
        const courseModels = await CourseModel.find();
                
       return res.status(200).json(courseModels);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getCourse = async (req, res) => { 
    const { id } = req.params;

    try {
        const course = await CourseModel.findById(id);
        
       return res.status(200).json(course);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const createCourse = async (req, res) => {
    
    const { name, image,courseCategory} = req.body;
 
    const newCourseModel = new CourseModel({ name, image,courseCategory})
     
    try {
        await newCourseModel.save();

       return res.status(201).json(newCourseModel );
    } catch (error) {
       return  res.status(409).json({ message: error.message });
    }
}

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, image,courseCategory } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    const updatedCourse = {name, image,courseCategory, _id: id };

    await CourseModel.findByIdAndUpdate(id, updatedCourse, { new: true });

    return res.json(updatedCourse);
}

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No course with id: ${id}`);

    await CourseModel.findByIdAndRemove(id);

    return res.json({ message: "Course deleted successfully." });
}



export default router;