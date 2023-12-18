import { userRepository } from "../repository/index.js";
import otpGenerator from 'otp-generator';
import User from "../models/user-model.js";
import { mailSender } from "../utils/nodemailer.js";
class userService {
    constructor() {
        this.userRepository = new userRepository();
    }
    async userPresence(email) {
        const userPresence = await this.userRepository.isAlreadyPresnt(email);
        return userPresence;
    }
    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
            console.log("Error in sign up service", error);
        }
    }
    async login(data) {
        const user = await this.userPresence(data.email);
        if (!user) {
            return {
                success: false,
                message: "There is No Account with this Email"
            }
        }
        if (!(await user.comparePasswords(data.password))) {
            return {
                success: false,
                message: "Incorrect Password"
            }
        }
        return user;

    }
    async sendOTP(email) {
        try {
            const otp = otpGenerator.generate(6, { specialChars: false });
            const user = await User.findOneAndUpdate({ email: email }, { OTP: otp });
            if (!user) {
                return {
                    message: "There is No Account with this Email"
                }
            }
            await mailSender(
                email,
                "Your OTP is Here",
                `Hi!<br> <h1>Your OTP is ${otp}</h1>`
            )
            return otp;
        } catch (error) {
            console.log("error in user-service(send-otp)", error);
        }
    }
    async passChange(otp, email, password, confirmPassword) {
        try {
            const user = await User.findOne({ email: email });
            if (user.OTP[0] !== otp) {
                return {
                    success: false,
                    message: "Invalid OTP"
                }
            }
            if (password !== confirmPassword) {
                return {
                    success: false,
                    message: "Password and Confirm Password Must Be Same"
                }
            }
            user.password = password;
            await user.save();
            return {
                success: false,
                message: "Password Changed Successfullys"
            }
        } catch (error) {
            console.log("error in user-service(passChange)", error);
        }
    }
}
export default userService;