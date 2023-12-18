import userService from "../services/user-service.js";
const UserService = new userService();

export const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = await UserService.sendOTP(email);
    res.json({
        data: otp
    })
}
export const passChange = async (req, res) => {
    const { email, otp, password, confirmPassword } = req.body;
    const response = await UserService.passChange(otp, email, password, confirmPassword);
    res.json({
        response
    })
}