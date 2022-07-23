import express from 'express';
import mongoose from 'mongoose';

import CourseCategorieModel from '../models/courseCategorie.model.js';

const router = express.Router();

export const getCourseCategories = async (req, res) => { 
    try {
        const courseCategorieModels = await CourseCategorieModel.find();
                
       return res.status(200).json(courseCategorieModels);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getCourseCategorie = async (req, res) => { 
    const { id } = req.params;

    try {
        const courseCategorie = await CourseCategorieModel.findById(id);
        
       return res.status(200).json(courseCategorie);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const createCourseCategorie = async (req, res) => {
    
    const { name, image } = req.body;
 
    const newCourseCategorieModel = new CourseCategorieModel({ name, image})
     
    try {
        await newCourseCategorieModel.save();

       return res.status(201).json(newCourseCategorieModel );
    } catch (error) {
       return  res.status(409).json({ message: error.message });
    }
}

export const updateCourseCategorie = async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No courseCategorie with id: ${id}`);

    const updatedCourseCategorie = {name,image  , _id: id };

    await CourseCategorieModel.findByIdAndUpdate(id, updatedCourseCategorie, { new: true });

    return res.json(updatedCourseCategorie);
}

export const deleteCourseCategorie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No courseCategorie with id: ${id}`);

    await CourseCategorieModel.findByIdAndRemove(id);

    return res.json({ message: "CourseCategorie deleted successfully." });
}



export default router;