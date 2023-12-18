import User from '../models/user-model.js';
import Post from '../models/post-model.js';
class crudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log("error in crud repo(create)", error);
            throw error;
        }
    }
    async isAlreadyPresnt(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            console.log("error In crud-repo(isAlreadyUse)", error);
        }
    }
    async delete(id) {
        const response = await Post.findByIdAndDelete(id);
        return response
    }
}
export default crudRepository;