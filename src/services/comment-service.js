import CommentRepository from "../repository/comment-repo.js";
import { postRepository } from "../repository/index.js";

class commentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.postRepository = new postRepository();
    }
    async create(data) {
        const response = this.commentRepository.create(data);
        return response;
    }
}
export default commentService;