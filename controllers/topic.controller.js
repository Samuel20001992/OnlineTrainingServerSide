import express from 'express';
import mongoose from 'mongoose';

import TopicModel from '../models/topic.model.js';

const router = express.Router();

export const getTopics = async (req, res) => { 
    try {
        const topicModels = await TopicModel.find();
                
       return res.status(200).json(topicModels);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getTopic = async (req, res) => { 
    const { id } = req.params;

    try {
        const topic = await TopicModel.findById(id);
        
       return res.status(200).json(topic);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getTopicByLanguage = async (req, res) => { 
    const { language } = req.params;

    try {
        const topic = await TopicModel.findOne({language: language});
        
       return res.status(200).json(topic);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getTopicByStatus = async (req, res) => { 
    const { status } = req.params;

    try {
        const topic = await TopicModel.findOne({status: status});
        
       return res.status(200).json(topic);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}


export const createTopic = async (req, res) => {
    
    const { title, content, image, status, language} = req.body;
 
    const newTopicModel = new TopicModel({ title, content, image, status, language})
     
    try {
        await newTopicModel.save();

       return res.status(201).json(newTopicModel );
    } catch (error) {
       return  res.status(409).json({ message: error.message });
    }
}

export const updateTopic = async (req, res) => {
    const { id } = req.params;
    const { title, content,image,status, language } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No topic with id: ${id}`);

    const updatedTopic = {title, content, image, status,language, _id: id };

    await TopicModel.findByIdAndUpdate(id, updatedTopic, { new: true });

    return res.json(updatedTopic);
}

export const deleteTopic = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No topic with id: ${id}`);

    await TopicModel.findByIdAndRemove(id);

    return res.json({ message: "Topic deleted successfully." });
}



export default router;