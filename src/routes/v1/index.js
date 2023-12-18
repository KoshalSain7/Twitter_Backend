import express from 'express'
import { login, signup } from "../../controllers/auth-controller.js";
import { passChange, sendOTP } from "../../controllers/user-controller.js";
import { createPost, deletePost, getPost, likePost } from '../../controllers/post-controller.js';
import { comment } from '../../controllers/comment-controller.js';
import { isAuthenticated, youCannot } from '../../middlewares/authenticate.js';


const route = express.Router();

// Auth
route.post('/signup', signup);
route.get('/login', login);

//recovery
route.post('/sendotp', sendOTP);
route.post('/passchange', passChange);
//Operations
route.post('/post', isAuthenticated, createPost);
route.get('/logout', (req, res) => {
    const isCookie = req.cookies.JWT_token;
    if (!isCookie) {
        return res.status(401).json({ message: "You're not logged in" })
    }
    res.clearCookie('JWT_token');
    res.clearCookie('Ctoken');
    return res.json({
        success: true,
        message: "Logged Out"
    })
})
route.post('/comment/:id', isAuthenticated, comment);
route.post('/like/:id', isAuthenticated, likePost)
route.get('/getpost/:id', isAuthenticated, getPost);
route.get('/deletepost/:id', isAuthenticated, youCannot, deletePost);
export default route;