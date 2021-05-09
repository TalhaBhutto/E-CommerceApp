import express from 'express';
import mongoose from 'mongoose';

import postads from '../models/postads.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postadss = await postads.find();
                
        res.status(200).json(postadss);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postads.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newpostads = new postads({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newpostads.save();

        res.status(201).json(newpostads );
    } catch (error) {
        res.status(409).json(error );
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator,year,contact,price,category, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title,year, description, contact,price,category, selectedFile, _id: id };

    await postads.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postads.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postads.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postads.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}
export const searchPost=async (req,res,next)=>{
    const { id } = req.params;
    const val=id.split("th3");
    try {
        //postads.ensureIndex({"title":"text","category":"text"})
        //const post=postads.runCommand("text",{search:`${val[0]} ${val[1]}`})
        //const post = await postads.find({title:{$regex:val[0],$options:'$i'}});
        const post = await postads.find(
            {$and:[
                {title:{$regex:val[0],$options:'$i'}},
                {category:{$regex:val[1],$options:'$i'}}
            ]}
        )
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default router;
