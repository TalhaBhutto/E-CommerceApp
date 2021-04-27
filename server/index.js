// added "type":"module", in package.json to use the react type syntax of importing files
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'; 
import userRoutes from './routes/users.js'; 


const app=express();
dotenv.config();
//Using express middleware to connect my app to the post routes

//set up express and added body paret to limit the image size
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT=process.env.PORT||5000;

//=>> .then run the app =>> .catch print the error
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=>console.log(`Server running on ${PORT}`)))
.catch((error)=>console.log(error.message))

// just there to avoid warnings in console
mongoose.set('useFindAndModify',false)
