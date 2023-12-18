import jwt from "jsonwebtoken";
import Post from "../models/post-model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const isCookie = req.cookies.JWT_token;
        if (!isCookie) {
            return res.json({
                success: false,
                message: "Create An Account or Login to Perform Any Task"
            })
        }
        const veri = jwt.verify(isCookie.token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log("Error In Authentication Middleware", error);
    }
}
export const youCannot = async (req, res, next) => {
    const postToDelete = req.params.id;
    const post = await Post.findById(postToDelete);
    const isCookie = req.cookies.JWT_token.id;
    if (isCookie !== post.author) {
        return res.json({
            success: false,
            message: "You Can't Perform This Action"
        })
    }
    next();
}