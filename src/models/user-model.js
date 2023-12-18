import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    OTP: {
        type: Array
    }
}, { timestamps: true });


// Password Hashing
userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

// JWT token Generating
userSchema.methods.gToken = function generate() {
    const payload = { id: this._id, email: this.email }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '120h'
    });
}

// Password Comparison For Login
userSchema.methods.comparePasswords = async function compare(password) {
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema);

export default User;