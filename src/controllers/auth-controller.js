import userService from "../services/user-service.js";

const UserService = new userService();

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const isAlready = await UserService.userPresence(email);

        if (isAlready) {
            return res.json({
                email,
                message: "This Email is Already in Use! Use Another Email.",
            })
        }
        const response = await UserService.signUp(
            {
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                name: req.body.name
            }
        );
        const token = await response.gToken();
        const payload = {
            token,
            id: response._id,
        }
        res.cookie("JWT_token", payload, {

            maxAge: Date.now() + 300 * 1000
        })
        return res.status(201).json({
            message: 'User created successfully',
            data: response,
            token
        });
    } catch (error) {
        console.log("error in auth-controller, sign up", error);
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserService.login({
            email: req.body.email,
            password: req.body.password,
        });
        const token = user.gToken();
        const payload = {
            token,
            id: user._id,
        }
        res.cookie("JWT_token", payload, {

            maxAge: Date.now() + 300 * 1000
        })
        user.password = undefined;
        res.json({
            user,
            token,
        })
    } catch (error) {
        console.log("error in auth-controller(login)", error);
    }
}
