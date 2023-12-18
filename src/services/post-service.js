import Post from "../models/post-model.js";
import comments from "../models/comment-model.js";
import { postRepository, hashtagRepository } from "../repository/index.js";

class postService {
    constructor() {
        this.postRepository = new postRepository();
        this.hashtagRepository = new hashtagRepository();
    }
    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g);

        const post = await this.postRepository.create(data);
        if (tags) {
            const hastags = tags.map((tag) => tag.substring(1).toLowerCase());
            let alreadyPresentTags = await this.hashtagRepository.findByName(hastags);
            let titleOfPresentTag = alreadyPresentTags.map(tags => tags.title);
            let newTags = hastags.filter(tag => !titleOfPresentTag.includes(tag));
            newTags = newTags.map(tag => {
                return { title: tag, tweets: [post.id] }
            });
            await this.hashtagRepository.bulkCreate(newTags);
            alreadyPresentTags.forEach((tag) => {
                tag.tweets.push(post.id);
                tag.save();
            });
        }
        return post;
    }

    async getPost(postId) {
        const post = await this.postRepository.getWithComments(postId);
        return post;
    }
    async deletePost(id) {
        const response = await this.postRepository.delete(id);
        const cmt = await comments.deleteMany({ post: id })
        return response;
    }
    async addLike(postId, userId) {
        const post = await Post.findOne({ _id: postId });
        if (post.likes.includes(userId)) {
            const response = await this.postRepository.removeLike(postId, userId);
            return response
        }
        const response = await this.postRepository.addLike(postId, userId);
        return response;
    }
}
export default postService;