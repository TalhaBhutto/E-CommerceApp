import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    selectedFile: {
        type:[String],
        required:true
    },
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('postadds', postSchema);

export default PostMessage;