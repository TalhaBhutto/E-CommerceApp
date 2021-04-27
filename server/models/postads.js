import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    price: String,
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('postadds', postSchema);

export default PostMessage;