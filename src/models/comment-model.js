import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' }
});

const comments = mongoose.model('Comments', commentSchema);
export default comments;