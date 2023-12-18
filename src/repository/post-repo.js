import User from "../models/user-model.js";
import Post from "../models/post-model.js";
import crudRepository from "./crud-repo.js";

class postRepository extends crudRepository {
    constructor() {
        super(Post)
    }
    async create(data) {
        try {
            const post = await Post.create(data);
            return post;
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
    async getWithComments(id) {
        try {
            const post = await Post.findById(id).populate({
                path: 'comments',
            });
            return post;
        } catch (error) {
            console.log("error in post-repo(getwithcomment)", error);
        }
    }
    async addLike(postId, userId) {
        try {
            const post = await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: userId } }, { new: true });
            return {
                message: "Liked!",
                post
            }
        } catch (error) {
            console.log("error in post-repo(addLike)", error);
        }
    }
    async removeLike(postId, userId) {
        try {
            const post = await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true });
            return {
                message: "Unliked!",
                post
            }
        } catch (error) {
            console.log("error in post-repo(Unlike)", error);
        }
    }
}
export default postRepository;