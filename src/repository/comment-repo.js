import crudRepository from "./crud-repo.js";
import Comment from '../models/comment-model.js';
class CommentRepository extends crudRepository {
    constructor() {
        super(Comment);
    }
}

export default CommentRepository;