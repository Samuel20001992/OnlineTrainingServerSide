import express from 'express';
import mongoose from 'mongoose';

import UserModel from '../models/user.model.js';

const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const userModels = await UserModel.find();
                
       return res.status(200).json(userModels);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        
       return res.status(200).json(user);
    } catch (error) {
       return res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    
    const { first_name, middle_name, last_name, email, password  } = req.body;
 
    const newUserModel = new UserModel({ first_name, middle_name, last_name, email, password})
     
    try {
        await newUserModel.save();

       return res.status(201).json(newUserModel );
    } catch (error) {
       return  res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {first_name, middle_name, last_name, email, password  } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = {first_name, middle_name, last_name, email, password , _id: id };

    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });

    return res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await UserModel.findByIdAndRemove(id);

    return res.json({ message: "User deleted successfully." });
}



export default router;