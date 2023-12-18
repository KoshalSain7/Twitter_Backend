import commentService from "../services/comment-service.js";
import Post from "../models/post-model.js";

const CommentService = new commentService();
export const comment = async (req, res) => {
    try {
        const author = req.cookies.JWT_token.id;
        const post = req.params.id;
        const { text } = req.body;
        const obj = {
            author,
            text,
            post
        }
        const response = await CommentService.create(obj);
        const addToCommentArray = await Post.findByIdAndUpdate(post, { $push: { comments: response._id } });
        return res.json({
            success: true,
            message: "Commented",
            response
        })
    } catch (error) {
        console.log("error in cmt-controller(comment)", error);
    }
}