import postService from "../services/post-service.js";
import Post from "../models/post-model.js";
import cloudinary from 'cloudinary';
import path from 'path';

const PostService = new postService();

function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality) {
    const option = { folder };
    if (quality) {
        option.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, option);
}

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const file = req.files.image;
        const supportedType = ['jpeg', 'png', 'jpg', 'webp', 'heic'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }
        const result = await uploadFileToCloudinary(file, "Indust-Level");
        const userId = req.cookies.JWT_token.id;
        const payload = {
            content,
            image: result.secure_url,
            author: userId
        }
        const response = await PostService.create(payload);
        res.json({
            success: true,
            data: response,
            message: "Done"
        })
    } catch (error) {
        console.log(error);
    }
}
export const getPost = async (req, res) => {
    try {
        const response = await PostService.getPost(req.params.id);
        return res.json({
            success: true,
            response
        })
    } catch (error) {
        console.log("error in post-controller(getPost)", error);
    }
}
export const deletePost = async (req, res) => {
    try {
        const response = await PostService.deletePost(req.params.id);
        return res.json({
            success: true,
            message: "Deleted Sucessfully",
            response
        })
    } catch (error) {
        console.log("error in post-controller(deletePost)", error);
    }
}
export const likePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.cookies.JWT_token.id;
    const response = await PostService.addLike(postId, userId);
    res.json({
        response
    })
}