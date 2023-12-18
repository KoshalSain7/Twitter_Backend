import User from '../models/user-model.js';
import crudRepository from './crud-repo.js';

class userRepository extends crudRepository {
    constructor() {
        super(User);
    }


}
export default userRepository;